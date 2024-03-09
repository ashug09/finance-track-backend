import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //agar password modified nahi hua to next() vala function process kardo
  if (!this.isModified("password")) return next();
  //agar password vali field modified hui hai to bcypt se password hsh kardo with 10 rounds of salt
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  //yahan pe password compare hoga jo user login karte waqt dalega, agar user ka password sahi hoga to true return hojayega nahi to false, that means user log in nahi kar sakta due to wrong password
  //also yahan par jo "password" likha hai vo, vo vala password hai jo user ne input kara, or "this.password" vala vo password hai jo ki database me save hai
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    //yahan par jsonwebtoken that is jwt sign kiye gaye hain jiske ki login session maintain kar payen 
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema); //mongoose mere liye ek model bana do User ke naam se on the basis of userSchema
