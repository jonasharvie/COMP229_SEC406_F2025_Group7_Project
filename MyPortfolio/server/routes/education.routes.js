import express from "express";
import educationCtrl from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/api/educations").post(educationCtrl.create);
router.route("/api/educations").get(educationCtrl.list);
router.route("/api/educations").delete(educationCtrl.removeAll);
router
  .route("/api/educations/:educationId")
  .get(authCtrl.requireSignin, educationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.remove);

router.param("educationId", educationCtrl.educationByID);
router.route("/api/educations/:educationId").get(educationCtrl.read);
router.route("/api/educations/:educationId").put(educationCtrl.update);
router.route("/api/educations/:educationId").delete(educationCtrl.remove);

export default router;