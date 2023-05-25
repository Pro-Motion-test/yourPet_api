const express = require('express');
const controllers = require('../../controllers');
const router = express.Router();

router.get('/', controllers.Friends.getAllFriends);

module.exports = router;
