import express from "express";
import surveyquestionCtrl from "../controllers/surveyquestion.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

// public routes
router.route("/api/surveyquestions").post(surveyquestionCtrl.create);
router.route("/api/surveyquestions").get(surveyquestionCtrl.list);
router.route("/api/surveyquestions").delete(surveyquestionCtrl.removeAll);

router.param("surveyquestionId", surveyquestionCtrl.surveyquestionByID);

router
  .route("/api/surveyquestions/:surveyquestionId")
  .get(authCtrl.requireSignin, surveyquestionCtrl.read)
  .put(authCtrl.requireSignin, surveyquestionCtrl.update)
  .delete(authCtrl.requireSignin, surveyquestionCtrl.remove);

export default router;