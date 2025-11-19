import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js"; 
import bcrypt from "bcrypt";// import bcrypt

const signup = async (req, res) => {
  try {
    let { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "email or password or name is missing" });
    }

    // normalize email by trimming whitespace and converting to lowercase
    email = email.trim().toLowerCase();
    
    // normalize name by trimming whitespace and use regex to remove extra spaces between first and last name
    name = name.trim().replace(/\s+/g, ' ');

    const exists = await User.findOne({ email });
    if (exists) {
      // if email already exists then return the following response
      return res.status(400).json({ "status": "error", "error": { "code": "DUPLICATE_EMAIL", "message": "Email is already registered" } });
    }

    // hash password with bcrypt using 10 salt rounds
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, name, passwordHash });
    if (user) {
      // if user exists then return the following response
      return res.status(201).json({ "status": "ok", "data": { "userId": user._id } });
    } else {
      return res.status(400).json({ error: "model validations failed" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {

  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email or password is missing" });
    }
    
    // normalize email by trimming whitespace and converting to lowercase
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      // updated error response to EMAIL_NOT_FOUND
      return res.status(400).json({ error: "EMAIL_NOT_FOUND" });
    }
    
    console.log("User found");
    console.log(user);
    
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    
    if (isPasswordMatch) {
      console.log("User Authenticated");

      // set expiresIn variable 
      const expiresIn = 1800;

      // issue access token with { sub } and expiresIn = expiresIn in seconds
      const token = jwt.sign({ sub: user._id }, config.jwtSecret, {
        expiresIn: expiresIn
      });
      
      // return the following response
      return res.status(200).json({ 
        "status": "ok", 
        "data": { 
          "accessToken": token,
          "tokenType": "Bearer",
          "expiresIn": expiresIn
        } 
      });
    } else {
      // updated error response to BAD_PASSWORD
      return res.status(401).json({ error: "BAD_PASSWORD" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const signout = (req, res) => {
  res.clearCookie("t", {
    path: "/",
    httpOnly: true,
    sameSite: "Lax", // or 'None' if using cross-origin with HTTPS
    secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
  });
  return res.status(200).json({
    message: "signed out",
  });
};
/*
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
  credentialsRequired: true // set to false for testing to circumvent standard errors, this allows the custom error messages in the "me" function 
});
*/
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
  credentialsRequired: true,
  getToken: function fromHeaderOrCookie(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
});

const me = async (req, res) => {

  try {
    // extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "INVALID_TOKEN" });
    }
    
    // remove 'Bearer ' prefix
    const token = authHeader.substring(7); 
    
    // verify and decode the JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      return res.status(401).json({ error: "INVALID_TOKEN" });
    }
    
    // get user id from JWT token
    const userId = decoded.sub;

    // get the user by its ID from the database
    const user = await User.findById(userId).select('_id email name created');
    
    // if no user then return the following response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // return the following response
    return res.status(200).json({
      "status": "ok",
      "data": {
        "user": {
          "id": user._id,
          "email": user.email,
          "name": user.name,
          "createdAt": user.created
        }
      }
    });
  } catch (error) {
    // return error
    return res.status(500).json({ error });
  }
};

const hasAuthorization = (req, res, next) => {
  console.log("req.profile:", req.profile);
  console.log("req.auth:", req.auth);
  console.log("req.profile._id:", req.profile?._id);
  console.log("req.auth._id:", req.auth?._id);
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth.sub;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

export default { login, signup, signout, requireSignin, hasAuthorization, me };
