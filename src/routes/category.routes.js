import { category } from "../controllers/category.controller.js";
import { allExpenses } from "../controllers/category.controller.js";
import { Router } from "express";
const categoryRouter = Router();
const categoryAllExpenseRouter = Router();
categoryRouter.route("/category").post(category);
categoryAllExpenseRouter.route("/all_expenses").post(allExpenses);
export { categoryRouter, categoryAllExpenseRouter };
