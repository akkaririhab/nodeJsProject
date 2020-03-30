const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const promotionCtrl = require('./promotion.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of  */
  .get(promotionCtrl.list)
  /** POST /api/projects - Create new project */
  .post(promotionCtrl.create);

router.route('/:promotionId')
 /* Get Restaurant */
  .get(expressJwt({ secret: config.jwtSecret }), promotionCtrl.get)

  /** PUT /api/projects/:projectId - Update project */
  .put( promotionCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(promotionCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('promotionId', promotionCtrl.load);

module.exports = router;
