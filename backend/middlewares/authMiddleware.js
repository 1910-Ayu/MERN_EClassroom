const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.protect = async(req,res,next)=>{
let token;
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          token = req.headers.authorization.split(" ")[1];
    
          //decodes token id
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
          req.user = await User.findById(decoded.id);
    
          next();
        } catch (error) {
          res.status(401);
          throw new Error("Not authorized, token failed");
        }
      }
    
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
};
    

    