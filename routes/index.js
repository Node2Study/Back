const express = require('express');
const router = express.Router();
const authApi = require('./auth.api');
const userApi = require('./user.api');
const teamApi = require('./team.api');
const reviewApi = require('./review.api');
const projectApi = require('./project.api');
const commentApi = require('./comment.api');

router.use('/auth', authApi);
router.use('/user', userApi);
router.use('/team', teamApi);
router.use('/review', reviewApi);
router.use('/project', projectApi);
router.use('/comment', commentApi);

module.exports = router;
