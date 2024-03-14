import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email }).select(
      "-refreshToken"
    );
    if (!user) return res.status(404).json({ message: `user not found in db` });
    const isCorrectPassword = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isCorrectPassword)
      return res.status(400).json({ message: `password is not correct` });
    const finalUser = await User.findOne({ email: body.email }).select(
      "-password -refreshToken"
    );

    const accessToken = generateAccessToken(user._id);
    // const refreshToken = generateRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        message: `user found: ${finalUser + accessToken}`,
      });
  } catch (error) {
    res.status(400).json({
      message: `some error occured at loginUser: ${error}`,
    });
  }
};

//generating access token is a part of logging in user
const generateAccessToken = (userId) => {
  try {
    const accessToken = jwt.sign(
      {
        _id: userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return accessToken;
  } catch (error) {
    res.status(400).json({
      message: `some error occured while generating access tokens ${error}`,
    });
  }
};

// const generateRefreshToken = async (userId) => {
//   try {
//     const refreshToken = jwt.sign(
//       {
//         _id: userId,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//       }
//     );
//     const user = await User.findById({ _id: userId });
//     user.refreshToken = refreshToken;
//     user.save({ validateBeforeSave: false });
//     return refreshToken;
//   } catch (error) {
//     res.status(400).json({
//       message: `some error occured while generating refresh tokens ${error}`,
//     });
//   }
// };

const logOut = (req, res) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");
    //decoded token contains all the information that is passed into the token while signing it at the beginning
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken)
      return res.status(400).json({ message: `unauthorized token` });

    const options = {
      httpOnly: true,
      secure: true,
    };
    res.status(200).clearCookie("accessToken", token, options).json({
      message: `logged out from website successfully`,
    });
  } catch (error) {
    res.status(400).json({
      message: `some error occured at ${error}`,
    });
  }
};

const userAllGroups = async (req, res) => {
  //all the groups under a specific user
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

const userAllCategories = async (req, res) => {
  //it lists all the categories under a specific user, here body._id would be the id of the user
  try {
    const body = req.body;
    const data = await User.findOne({ _id: body._id }).populate({
      path: "allCategories",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: `error occured: ${error}`,
    });
  }
};
export { registerUser, userAllGroups, userAllCategories, loginUser, logOut };
