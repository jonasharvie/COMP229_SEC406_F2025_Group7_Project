import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
import bcrypt from "bcrypt";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-passwordHash -__v");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    res.status(200).json({
      status: "ok",
      data: user
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message
    });
  }
};

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const authSub = (req, res, next) => {
  if (req.auth && req.auth._id) { 
    req.auth.sub == req.auth._id.toString();
  }
  next();
}
export const update = async (req, res) => {
  try {
    console.log("Auth Header: ", req.headers.authorization);
    const userId = req.params.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    if (req.body.password) {
      user.passwordHash = await bcrypt.hash(req.body.password, 10);
      user.markModified('passwordHash');
    }
    
    user.updated = Date.now();
    await user.save();

    const { passwordHash, ...userData } = user.toObject();
    res.json(userData);

  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    let usersDeleted = await User.deleteMany({});
    res.json({
      message: `Successfully deleted ${usersDeleted.deletedCount} user(s)`,
      deletedCount: usersDeleted.deletedCount
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default { create, userByID, read, list, remove, update, removeAll };
