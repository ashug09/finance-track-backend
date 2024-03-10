import { registerUser } from "../controllers/user.controller.js";
import { userAllGroups } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();
const allgroups = Router();
router.route("/register").post(registerUser);
allgroups.route("/allgroups").get(userAllGroups);
export { router, allgroups };
