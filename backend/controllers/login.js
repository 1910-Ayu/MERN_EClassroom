const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

module.exports.loginUser = async(req,res)=>{
   
    const {name,email,picture} = req.body;
try{
    const user = await User.findOne({email:email});

    if(!user){
        const randompassword = crypto.randomBytes(20).toString("hex");
        const newUser = await User.create({
            name:name,
            email:email,
            password:randompassword,
            picture:picture,
        });
       const newToken = generateToken(newUser._id);
       res.status(200).json({
       
            id: newUser._id,
            email,
            name,
            picture,
            token: newToken,
          
       });
        
    }else{
        const newToken = generateToken(user._id);
       res.status(200).json({
       
            id: user._id,
            email,
            name,
            picture,
            token: newToken,
          
       });
    }}catch(err){
        res.status(500).json(err.message);
    }
}


