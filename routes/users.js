/*
    route api/users
*/
const {Router} = require('express');
const { getUser } = require('../controllers/users');
const validatorJWT = require('../middlewares/validator-jwt');

const router = Router();


router.get('/', validatorJWT ,getUser);

module.exports = router;