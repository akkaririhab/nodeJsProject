const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const restaurantCtrl = require('./restaurant.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of  */
  .get(restaurantCtrl.list)
  /** POST /api/projects - Create new project */
  .post(restaurantCtrl.create);

router.route('/:restaurantId')
 /* Get Restaurant */
  .get(expressJwt({ secret: config.jwtSecret }), restaurantCtrl.get)

  /** PUT /api/projects/:projectId - Update project */
  .put( restaurantCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(restaurantCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('restaurantId', restaurantCtrl.load);

module.exports = router;
