const User = require("../models/user");
const Message = require("../models/message");


const userConnect = async (uid = '') => {

    const currentUser = await User.findById(uid);
    currentUser.online = true;
    await currentUser.save();

    return currentUser;
};

const userDisconnect = async (uid = '') => {

    const currentUser = await User.findById(uid);
    currentUser.online = false;
    await currentUser.save();

    return currentUser;
};

const saveMessage = async ( payload ) => {
    /*

    payload:{
        from: '',
        to: '',
        message: ''
    }
     
     
     */
    
    try {
        const message = new Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { userConnect, userDisconnect, saveMessage }



