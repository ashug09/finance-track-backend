import mongoose from "mongoose";
const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

groupSchema.virtual("groupExpenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "group",
});

groupSchema.set("toObject", { virtuals: true });
groupSchema.set("toJSON", { virtuals: true });
export const Group = mongoose.model("Group", groupSchema);
