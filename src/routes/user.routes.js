import {
  registerUser,
  loginUser,
  logOut,
  userAllCategories,
} from "../controllers/user.controller.js";
import { userAllGroups } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();
const allgroups = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOut);
router.route("/allcategories").get(userAllCategories);
allgroups.route("/allgroups").get(userAllGroups);
export { router, allgroups };
