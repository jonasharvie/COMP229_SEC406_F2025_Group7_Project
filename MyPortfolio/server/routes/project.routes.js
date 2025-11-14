import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/api/projects").post(projectCtrl.create);
router.route("/api/projects").get(projectCtrl.list);
router.route("/api/projects").delete(projectCtrl.removeAll);
router
  .route("/api/projects/:projectId")
  .get(authCtrl.requireSignin, projectCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);
router.route("/api/projects/:projectId").get(projectCtrl.read);
router.route("/api/projects/:projectId").put(projectCtrl.update);
router.route("/api/projects/:projectId").delete(projectCtrl.remove);

export default router;