import { Category } from "../models/category.model.js";
const category = async (req, res) => {
  try {
    const body = req.body;
    const ifExist = await Category.findOne({ categoryName: body.categoryName });
    if (ifExist) {
      res.status(401).json({
        message: `already existed category, make some new`,
      });
      return;
    }
    const createdCategory = await Category.create(body);
    console.log(createdCategory);
    res.status(201).json({
      message: `category created`,
    });
  } catch (error) {
    res.status(400).json({
      message: `some error occured at category controller: ${error}`,
    });
  }
};

const allExpenses = async (req, res) => {
  try {
    const body = req.body;
    const data = await Category.findOne({ _id: body._id }).populate({
      path: "categoryAllExpenses",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: `some error occured ${error}`,
    });
  }
};
export { category, allExpenses };
