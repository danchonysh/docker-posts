const express = require('express')
const router = express.Router()
const { newsController, postController } = require('../controllers')

router.get('/news', newsController.getNews)
router.post('/news', newsController.createNews)
router.delete('/news/:id', newsController.removeNews)
router.patch('/news/:id', newsController.editNews)

router.get('/posts', postController.getPosts)
router.post('/posts', postController.createPost)
router.delete('/posts/:id', postController.removePost)
router.patch('/posts/:id', postController.editPost)

module.exports = router