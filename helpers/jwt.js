const jwt = require('jsonwebtoken');

const generaJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                reject('no se pudo guardar el token');
            }else{
                resolve(token);
            }
        });

        

    });


};


module.exports = generaJWT;