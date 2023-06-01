const express = require('express');
const controllers = require('../../controllers');
const { paginationValidate } = require('../../middlewares');
const router = express.Router();

// ---GET NEWS---
router.get('/', paginationValidate, controllers.News.getAllNews);

module.exports = router;
