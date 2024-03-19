import {
  registerUser,
  loginUser,
  logOut,
  userAllCategories,
  verifyToken,
} from "../controllers/user.controller.js";
import { userAllGroups } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();
const allgroups = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOut);
router.route("/allcategories").post(userAllCategories);
router.route("/verifytoken").post(verifyToken); 
allgroups.route("/allgroups").post(userAllGroups);
export { router, allgroups };
