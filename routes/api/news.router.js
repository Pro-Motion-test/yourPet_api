const express = require('express');
const controllers = require('../../controllers');
// const { paginationValidate } = require('../../middlewares');
const router = express.Router();

// ---GET PETS---
router.get('/',  controllers.News.getAllNews);

module.exports = router;
