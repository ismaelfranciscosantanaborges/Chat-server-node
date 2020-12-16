
const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const generateJWT = require('../helpers/jwt');

const addUser = async (req, res = response) => {

    try {

        const {email, password} = req.body;

    
        const existEmail = await User.findOne({email});

        if(existEmail){
            return res.status(400).json({
                ok:false,
                error: 'Ya este email esta en uso'
            });
        }
        
        const user = new User( req.body );

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        //Generarte JWT
        const token = await generateJWT(user.id);

        await user.save();
    
        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: 'Porfavor comuniquese con el administrador.'
        });
    }
};

const login = async ( req, res = response ) => {
    const {email, password } = req.body;

    try {
        const userDB = await User.findOne({email});
        
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este correo de existe'
            });
        }
        
        if(!bcrypt.compareSync(password, userDB.password)){
            return res.status(400).json({
                ok : true,
                msg: 'La contraseña no coincide con el correo'
            });
        }

        //Generate JWT
        const token = await generateJWT(userDB.id);

        return res.json({
            ok : true,
            userDB,
            token
        })
        

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrado'
        });
    }

    return res.json({
        ok: true,
        login: 'Login'
    })
};

const renewToken = async (req, res = response) =>{

    const uid = req.uid;

    const newToken = await generateJWT(uid);

    const user = await User.findById(uid);
    
        
    return res.json({
        ok:true,
        user,
        newToken
    })
    
};


module.exports = { addUser, login, renewToken };