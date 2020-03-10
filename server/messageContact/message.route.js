const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const messageCtrl = require('./message.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/messages - Get list of messages */
  .get(messageCtrl.list)


  /** POST /api/messages - Create new message */
  .post(messageCtrl.create);

router.route('/:messageId')
  /** GET /api/messages/:messageId - Get message */
  .get(messageCtrl.get)

  /** PUT /api/messages/:messageId - Update message */
  .put( messageCtrl.update)

  /** DELETE /api/messages/:messageId - Delete message */
  .delete(messageCtrl.remove);

/** Load messages when API with messageId route parameter is hit */
router.param('messageId', messageCtrl.load);

module.exports = router;
