import { Group } from "../models/group.model.js";
const group = async (req, res) => {
  try {
    const body = req.body;
    const existed = await Group.findOne({ groupName: body.groupName });
    if (existed) {
      res.status(401).json({
        message: `group already existed, make new group`,
      });
      return;
    }
    const createdGroup = await Group.create(body);
    res.status(201).json({
      message: `group created ${createdGroup}`,
    });
  } catch (error) {
    res.status(401).json({
      message: `some error occured at group controller ${error}`,
    });
  }
};

const groupAllExpenses = async (req, res) => {
  //here _id is of the user
  try {
    const body = req.body;
    const data = await Group.findOne({ _id: body._id }).populate({
      path: "groupExpenses",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: `some error occured ${error}`,
    });
  }
};
export { group, groupAllExpenses };
