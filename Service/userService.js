const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const SuccessHandler = require('../SuccessResponse');
const expressAsyncHandler = require('express-async-handler');
const jwt=require('jsonwebtoken')

const registerUser = async (userData,req,res) => {
  const { firstName, lastName, username, email, password } = userData;

  // Check if user with the provided email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("User already registered with this email");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  // Save user to database
  const savedUser = await newUser.save();
  return SuccessHandler.sendSuccessResponse(res, 'User registered successfully', savedUser);
};


const loginUser=async(userData,req,res) => {
    try {
        const { email, password } = userData;

        const existingData = await User.findOne({ email });
    
        if (!existingData) {
          return res.status(400).json({ message: "Email Id does not exist" });
        }
       
        if (await bcrypt.compare(password, existingData.password)) {
          const accessToken = jwt.sign(
            {
              user: {
                id: existingData._id,
                email: existingData.email,
                isUserToken: true,
              },
            },
            process.env.Access_Token_Secret,
            { expiresIn: "30m" }
          );
          console.log(accessToken)
          return SuccessHandler.sendSuccessResponse(res, 'User login successfully', {accessToken});
        } else {
          return res.status(401).json({ message: "Invalid password" });
        }
      } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: "Failed to login", error: error.message });
      }
    };

module.exports = {
  registerUser,loginUser
};
