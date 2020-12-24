const { response } = require('express');
const User = require('../models/user');

const getUser = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const users = await User.find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(from)
        .limit(20);

    res.json({
        ok: 200,
        users
    });

};


module.exports = { getUser }

