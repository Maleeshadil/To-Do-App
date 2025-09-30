const { generateAccessToken,generateRefreshToken } = require("../utils/generateAccessToken");

const User = require("../models/Users");
const Token = require("../models/Token");
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide require fileds" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentails" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const AccessToken = generateAccessToken(user);
    const RefreshToken = await generateRefreshToken(user);


    res.cookie("refreshToken",  RefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path :'api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });   

    res.json({
      userdetails:{
        _id: user._id,
      name: user.name,
      email: user.email,
      },      
      token: AccessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

exports.refresh = async (req,res,next)=>{

  const refreshToken  = req.cookies.refreshToken;
  if(!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  const stored = await Token.findOne({ token: refreshToken });
  if(!stored) return res.status(403).json({ message: 'Invalid refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if(!user) return res.status(404).json({ message: 'User not found' });

    // rotate token: delete old and issue new
    await Token.deleteOne({ token: refreshToken });
    const newRefresh = await generateRefreshToken(user);
    res.cookie('refreshToken', newRefresh, {
      httpOnly: true, secure: false, sameSite: 'lax', path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Refresh token invalid' });
  }
};

exports.logout = async (req, res, next) => {
   const refreshToken  = req.cookies.refreshToken;
  try {    
     if (refreshToken) {
       await Token.deleteOne({ token: refreshToken });
       res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
     }
     res.json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};


