import { Expense } from "../models/expense.model.js";
const expense = async (req, res) => {
  try {
    const body = req.body;
    const createdExpense = await Expense.create(body);
    res.status(201).json({
      message: `expense created ${createdExpense}`,
    });
  } catch (error) {
    res.status(400).json({
      message: `some error occured ${error}`,
    });
  }
};
export { expense };
