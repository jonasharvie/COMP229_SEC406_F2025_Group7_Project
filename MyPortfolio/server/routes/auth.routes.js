import express from "express";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();
//router.route("/auth/signin").post(authCtrl.signin);
router.route("/auth/signout").get(authCtrl.signout);

// routes to sign up, login, and authenticate
router.route("/users/signup").post(authCtrl.signup);
router.route("/users/login").post(authCtrl.login);
router.route("/me").get(authCtrl.me);
//router.route("/me").get(authCtrl.requireSignin, authCtrl.me);
export default router;
