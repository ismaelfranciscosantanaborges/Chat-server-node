const { json, response } = require("express");
const Message = require("../models/message");


const getMessages = async (req, res = response)=>{

    const to = req.uid;
    const from = req.params.from;

    const messages = await Message.find({ $or:[{to: to, from:from}, {to:from, from:to}] }).sort({createdAt: 'desc'}).limit(30);

    return res.json({
        ok: true,
        messages
    });
    
};

module.exports = {getMessages};

