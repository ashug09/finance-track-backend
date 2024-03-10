import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  try {
    const body = req.body;
    const isExist = await User.findOne({ email: body.email });
    if (isExist) {
      res.status(401).json({
        message: "user already exists, try with another email",
      });
      return;
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      email: body.email,
      password: hashPassword,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
    });
    console.log("this is user registered: " + user);
    res.status(201).json({
      messeage: "ok done, user registered",
    });
  } catch (error) {
    res.status(500).json({
      message: `some error occurred in user controller ${error}`,
    });
  }
};

const userAllGroups = async (req, res) => {
  try {
    const body = req.body;
    const data = await User.findOne({ _id: body._id }).populate("allGroups");
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: `error occured at userAllGroup controller ${error}`,
    });
  }
};
export { registerUser, userAllGroups };
