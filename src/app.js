import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({ origin: true, credentials: true })); //orgin matlab kahan se request ayegi or creditials are related to cookies
app.use(cookieParser());
app.use(express.static("public/temp"));

//router configuration
import { router } from "./routes/user.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { expenseRouter } from "./routes/expense.routes.js";
import { groupRouter } from "./routes/group.routes.js";
import { allgroups } from "./routes/user.routes.js";
import { allExpenseRouter } from "./routes/group.routes.js";
import { categoryAllExpenseRouter } from "./routes/category.routes.js";
//router declaration
app.use("/api/v1/user", router);
app.use("/api/v1/new_category", categoryRouter);
app.use("/api/v1/add_expense", expenseRouter);
app.use("/api/v1/add_group", groupRouter);
app.use("/api/v1/user_groups", allgroups);
app.use("/api/v1/group_all_expenses", allExpenseRouter);
app.use("/api/v1/all_expenses_category", categoryAllExpenseRouter);

export default app;
