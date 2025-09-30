// const jwt = require("jsonwebtoken");
// const User = require("../models/Users");

// const protect = async (req, res, next) => {
//   const header = req.headers.authorization;
//   console.log(header);
//   if (!header || !header.startsWith("Bearer")) {
//     return res.status(401).json({ message: "Not authorized ,token missing" });
//   }

//   const token = header.split(" ")[1];

//   try {
//    const decoded = jwt.verify(token, process.env.JWT_SECRET);
//    req.user = await User.findById(decoded.id).select("-password");
//     if (!req.user) {
//       res.status(401).json({ message: "User not found" });
//     }
//     return next();
//   } catch (error) {
//       console.log(error);
//        return res.status(401).json({message:'Not authoriztion ,token failed.'})
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded Token:", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      // console.log("Authenticated User:", req.user);
      return next();
    } catch {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
  return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = { protect };

