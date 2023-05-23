const express = require('express');
const controllers = require('../../controllers');
const {Authorization} = require('../../middlewares');
const router = express.Router();

router.get('/', Authorization.checkTokenForPublicRoute, controllers.Friends.getAllFriends);

module.exports = router;