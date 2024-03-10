import mongoose from "mongoose";
// import { Category } from "./category.model.js";
// import { Group } from "./group.model.js";
// import { User } from "./user.model.js";
const expenseSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    //mongoose dada ji apne schema me se types ki objectID nikal ke de dijiye
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Expense = mongoose.model("Expense", expenseSchema)