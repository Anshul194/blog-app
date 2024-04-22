const expressAsyncHandler = require('express-async-handler');
const userService = require('../Service/userService');
const {validateRegistration,validateLogin}=require('../Validators/validateUser')

const registerUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body;

  // Validate user input
  const { error } = validateRegistration(userData);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newUser = await userService.registerUser(userData, req, res);
    res.json({ message: "Successfully created", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const loginUser = expressAsyncHandler(async (req, res) => {
    const userData = req.body;
  
    // Validate user input
    const { error } = validateLogin(userData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    try {
      const logedUser = await userService.loginUser(userData, req, res);
      res.json({ message: "Successfully login", user: logedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = {
  registerUser,loginUser
};
