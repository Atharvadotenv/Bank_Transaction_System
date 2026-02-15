const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies["token_jwt"] || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    
    return res.status(401).json({
      message: "Unauthorized Access Token",
    });
  }
  try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      const user = await userModel.findById(decoded.userId)
      
      req.user = user;

      return next(); 

  } catch (err) {
    
    
    return res.status(401).json({
      message: "Unauthorized Access Token is ",
    });
  }
}
module.exports = {
    authMiddleware 
}
