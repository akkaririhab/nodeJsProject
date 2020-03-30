const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const categoryCtrl = require('./category.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/Category - Get list of Categorys */
  .get(categoryCtrl.list)
  /** POST /api/Category - Create new Category*/
  .post(categoryCtrl.create);

router.route('/:categoryId')
 /* Get category */
  .get(expressJwt({ secret: config.jwtSecret }), categoryCtrl.get)

  /** PUT /api/categorys/:categoryId - Update category */
  .put( categoryCtrl.update)

  /** DELETE /api/users/:categoryId - Delete category */
  .delete(categoryCtrl.remove);

/** Load user when API with categoryId route parameter is hit */
router.param('categoryId', categoryCtrl.load);

module.exports = router;
