
const {Router} = require('express');
const validatorJWT = require('../middlewares/validator-jwt');
const { getMessages } = require('../controllers/messages');


const router = Router();

router.get('/:from', validatorJWT, getMessages);


module.exports = router;