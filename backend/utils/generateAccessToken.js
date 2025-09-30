const jwt = require('jsonwebtoken');
const Token = require("../models/Token");

const generateAccessToken = (user) => {

    return jwt.sign({ id:user._id,name:user.name,email:user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXP || "15m",
    });
    
}

const generateRefreshToken=async (user)=>{
    const refreshToken =jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,     
        {expiresIn: process.env.REFRESH_TOKEN_EXP || "7d"}
    );

      const expiresAt = new Date();

      expiresAt.setDate(expiresAt.getDate() + 7);

      await Token.create({
        userId: user._id,
        token: refreshToken,
        expiresAt,
     });   
    

     return refreshToken
}

module.exports = { generateAccessToken,generateRefreshToken };