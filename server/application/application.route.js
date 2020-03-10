const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const applicationCtrl = require('./application.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  //GET /api/applications - Get list of application
  .get(applicationCtrl.list)


  // POST /api/messages - Create new message 
  .post(applicationCtrl.create);

router.route('/:applicationId')
  // GET /api/applications/:applicationsId - Get application 
  .get(applicationCtrl.get)

  // PUT /api/applications/:applicationId- Update application 
  .put( applicationCtrl.update)

  //  Delete application 
  .delete(applicationCtrl.remove);

// Load messages when API with messageId route parameter is hit 
router.param('ApplicationId', applicationCtrl.load);

module.exports = router;
