const mongoose=require('mongoose')
const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates:[]
    },
  }, { timestamps: true });

  postSchema.index({ location: "2dsphere" });
  
  const Post = mongoose.model('Post', postSchema);
  
  module.exports = {
    Post
  };