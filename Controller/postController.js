const expressAsyncHandler = require('express-async-handler');
const postService = require('../Service/postService');
const validatePost = require('../Validators/validatePost');
const SuccessHandler = require('../SuccessResponse');

// Create a new post
const createPosts = expressAsyncHandler(async (req, res) => {
  const postData = req.body;
  const { error } = validatePost(postData);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const userId = req.user.user.id;
console.log(userId)
  try {
    const savedPost = await postService.createPost(postData,userId);
    return SuccessHandler.sendSuccessResponse(res, 'Post created successfully', savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getPosts = expressAsyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default page 1 and limit 10
  
    try {
      const posts = await postService.getPosts(page, limit);
      return SuccessHandler.sendSuccessResponse(res, 'Posts retrieved successfully', posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



  const updatePost = expressAsyncHandler(async (req, res) => {
    const postId =req.query.id;
    const postData = req.body;
  
  
    try {
      const updatedPost = await postService.updatePost(postId, postData);
      return SuccessHandler.sendSuccessResponse(res, 'Post updated successfully', updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const deletePost = expressAsyncHandler(async (req, res) => {
    const postId = req.query.id;
  
    try {
      const deletedPost = await postService.deletePost(postId);
      return SuccessHandler.sendSuccessResponse(res, 'Post deleted successfully', deletedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const getPostCounts = expressAsyncHandler(async (req, res) => {
    try {
      const postCounts = await postService.getPostCounts();
      return SuccessHandler.sendSuccessResponse(res, 'Post counts retrieved successfully', postCounts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const getPostsByLocation = expressAsyncHandler(async (req, res) => {
 
    const latitude = req.body;
    const longitude = req.body;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    const maxDistance = (req.query.maxDistance || 2) * 1000;
    try {
      const posts = await postService.getPostsByLocation(latitude, longitude,maxDistance);
      return SuccessHandler.sendSuccessResponse(res, 'Posts retrieved successfully', posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = {
    createPosts,getPosts,updatePost, deletePost ,getPostCounts ,getPostsByLocation
  };