const express = require('express');
const router = express.Router();
const projectController = require('../controller/project.controller');

router.get('/', projectController.getAllProjects);

module.exports = router;