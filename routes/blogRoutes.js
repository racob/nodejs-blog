const express = require('express');
const blogController = require('../controller/blogController');
const Blog = require('../models/blog');
const router = express.Router();

// blog routes
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/new-blog', blogController.blog_create_get);
router.get(('/:id'), blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;