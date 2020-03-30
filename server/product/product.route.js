const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const productCtrl = require('./product.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /**  Get list of  */
  .get(productCtrl.list)
  /** Create new */
  .post(productCtrl.create);

router.route('/:productId')
 /* Get product */
  .get(expressJwt({ secret: config.jwtSecret }), productCtrl.get)

  /**  - Update product */
  .put( productCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(productCtrl.remove);

/** Load product id  */
router.param('productId', productCtrl.load);

module.exports = router;
