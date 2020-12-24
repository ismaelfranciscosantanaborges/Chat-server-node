const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { userConnect, userDisconnect, saveMessage } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', async client => {
    console.log('Cliente conectado');

    console.log(client.handshake.headers['x-token']);

    const [idValid, uid] = checkJWT(client.handshake.headers['x-token']);

    if (!idValid) return client.disconnect();

    //Is valid
    userConnect(uid);

    // console.log(user);

    //CREANDO SALA
    client.join( uid );

    client.on('new-message', async (payload)=>{
        console.log(payload);

        await saveMessage(payload);

        io.to( payload.to ).emit('new-message', payload);
    });

    client.on('disconnect', () => {
        userDisconnect(uid);
        console.log('Cliente desconectado');
    });

});
