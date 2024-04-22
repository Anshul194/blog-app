const { Post } = require('../models/postModel');

// Create a new post
const createPost = async (postData, userId) => {
    const { title, body, active, location } = postData;
  
    const newPost = new Post({
      title,
      body,
      active,
      location,
      createdBy: userId,
    });
  
    const savedPost = await newPost.save();
    return savedPost;
  };


  const getPosts = async (page, limit) => {
    const skip = (page - 1) * limit;
  
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order
  
    return posts;
  };

  const updatePost = async (postId, postData) => {
    const updatedPost = await Post.findByIdAndUpdate(postId, postData, { new: true });
  
    if (!updatedPost) {
      throw new Error('Post not found');
    }
  
    return updatedPost;
  };

  const deletePost = async (postId) => {
    const deletedPost = await Post.findByIdAndDelete(postId);
  
    if (!deletedPost) {
      throw new Error('Post not found');
    }
  
    return deletedPost;
  };


  const getPostCounts = async () => {
    const activeCount = await Post.countDocuments({ active: true });
    const inactiveCount = await Post.countDocuments({ active: false });
  
    return {
      activeCount,
      inactiveCount,
    };
  };


  const getPostsByLocation = async (latitude, longitude,maxDistance) => {
  
    const data = await Post.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
    ]);
  
    return data;
  };

  
  module.exports = {
    createPost,getPosts,updatePost,deletePost,getPostCounts,getPostsByLocation
  };