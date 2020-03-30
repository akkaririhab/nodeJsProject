const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const ingredientCtrl = require('./ingredient.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /**  Get list of  */
  .get(ingredientCtrl.list)
  /** Create new */
  .post(ingredientCtrl.create);

router.route('/:ingredientId')
 /* Get  */
  .get(expressJwt({ secret: config.jwtSecret }), ingredientCtrl.get)

  /**  - Update  */
  .put( ingredientCtrl.update)

  /** - Delete ingredient */
  .delete(ingredientCtrl.remove);

/** Load  */
router.param('ingredientId', ingredientCtrl.load);

module.exports = router;
