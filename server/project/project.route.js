const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const projectCtrl = require('./project.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of projects */
  .get(projectCtrl.list)
  /** POST /api/projects - Create new project */
  .post(projectCtrl.create);

router.route('/:projectId')
  /** GET /api/users/:userId - Get project */
  .get(expressJwt({ secret: config.jwtSecret }), projectCtrl.get)

  /** PUT /api/projects/:projectId - Update project */
  .put( projectCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(projectCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('projectId', projectCtrl.load);

module.exports = router;
