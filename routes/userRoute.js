const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/userController');

// Register a new user
userRouter.post('/register',userController.registerUser);
userRouter.post('/login',userController.loginUser);

module.exports = userRouter;
