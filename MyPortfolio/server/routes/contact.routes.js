import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/api/contacts").post(contactCtrl.create);
router.route("/api/contacts").get(contactCtrl.list);
router.route("/api/contacts").delete(contactCtrl.removeAll);
router
  .route("/api/contacts/:contactId")
  .get(authCtrl.requireSignin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);
router.route("/api/contacts/:contactId").get(contactCtrl.read);
router.route("/api/contacts/:contactId").put(contactCtrl.update);
router.route("/api/contacts/:contactId").delete(contactCtrl.remove);

export default router;