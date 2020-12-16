
const {validationResult} = require('express-validator');

const campValidator = (req, res, next) => {

  const errores = validationResult(req);
  if( !errores.isEmpty()){
      return res.status(400).json({
        ok: false,
        error: errores.mapped()
      });
  }
  next();
};

module.exports = { campValidator };

