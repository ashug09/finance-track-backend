import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  amount: {
    type: [Number],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

categorySchema.virtual("categoryAllExpenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "category",
});
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
export const Category = mongoose.model("Category", categorySchema);
