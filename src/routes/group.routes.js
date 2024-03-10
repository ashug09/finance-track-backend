import { groupAllExpenses } from "../controllers/group.controller.js";
import { group } from "../controllers/group.controller.js";
import { Router } from "express";
const groupRouter = Router();
const allExpenseRouter = Router();
groupRouter.route("/group").post(group);
allExpenseRouter.route("/all_expenses").get(groupAllExpenses);
export { groupRouter, allExpenseRouter };
