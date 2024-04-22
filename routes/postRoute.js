const express = require('express');
const postController = require('../Controller/postController');
const authMiddleware = require('../middleware/IsUserAuthenticate');

const Postrouter = express.Router();

Postrouter.post('/posts', authMiddleware, postController.createPosts);
Postrouter.get('/posts', authMiddleware, postController.getPosts);
Postrouter.put('/posts', authMiddleware, postController.updatePost);
Postrouter.delete('/posts', authMiddleware, postController.deletePost);
Postrouter.get('/location', postController.getPostsByLocation);
Postrouter.get('/counts', postController.getPostCounts);

module.exports = Postrouter;
