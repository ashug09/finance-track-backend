import {
  registerUser,
  loginUser,
  logOut,
} from "../controllers/user.controller.js";
import { userAllGroups } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();
const allgroups = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOut);
allgroups.route("/allgroups").get(userAllGroups);
export { router, allgroups };
