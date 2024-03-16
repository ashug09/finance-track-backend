import { Category } from "../models/category.model.js";
import { Expense } from "../models/expense.model.js";
const expense = async (req, res) => {
  try {
    const body = req.body;
    const createdExpense = await Expense.create(body);
    //ye jo "data" constant liya hai isme saari details save hogi, kiski deatils ? jiski ham dhundhna cha rahe hain jaise jahan pe ek category ki jo ki "travel" category hai
    //or issi data vale variable pe saari operations follow honge jaise agar kisi field ko update karna hai, to .push() karenge (agar array me objects add karne hain to), then .save() method se db me document save kardena hai or validateBeforeSave: false use karengya, isse ye fayeda hota hai ki ye baki filed ko nahi chedta hai
    const data = await Category.findOne({
      _id: body.category,
    })
    data.amount.push(body.amount)
    data.save({validateBeforeSave: false})
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
