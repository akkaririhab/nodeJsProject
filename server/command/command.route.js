const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const commandCtrl = require('./command.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/') 
  /**  Get list of  */
  .get(commandCtrl.list)
  /** Create new */
  .post(commandCtrl.create);

router.route('/:commandId')
 /* Get product */
  .get(expressJwt({ secret: config.jwtSecret }), commandCtrl.get)

  /**  - Update product */
  .put( commandCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(commandCtrl.remove);

/** Load product id  */
router.param('commandId', commandCtrl.load);

module.exports = router;
