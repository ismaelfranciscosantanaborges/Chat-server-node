
const {Router, response} = require('express');
const { addUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { campValidator } = require('../middlewares/camp-validator');
const validatorJWT = require('../middlewares/validator-jwt');

const router = Router();


router.post('/new', [
    check('name', 'The camp name is required').not().isEmpty(),
    check('email', 'The camp email is required').not().isEmpty(),
    check('password', 'The camp password is required').not().isEmpty(),
    campValidator
] ,addUser);

router.post('/', [
    check('email', 'The camp email is required').isEmail(),
    check('password', 'The camp password is required').not().isEmpty(),
    campValidator
] ,login);

router.get('/renew', validatorJWT , renewToken);

module.exports = router;