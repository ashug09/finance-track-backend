import { expense } from "../controllers/expense.controller.js";
import { Router } from "express";
const expenseRouter = Router();
expenseRouter.route("/expense").post(expense);
export { expenseRouter };
