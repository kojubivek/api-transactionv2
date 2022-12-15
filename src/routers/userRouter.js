import express from "express";
import { findUser, insertUser } from "../model/user/userModel.js";
const router = express.Router();

//create User
router.post("/", async (req, res, next) => {
  try {
    const user = await insertUser(req.body);
    if (user?._id) {
      return res.json({
        status: "success",
        message: "User created successfull. You may log in now",
      });
    }
    res.json({
      status: "error",
      message: "Unable to create the user. Please try again!",
    });
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.code = 200;
      error.message =
        "User already exits with the same email, please use different email";
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await findUser(req.body);

    if (user?._id) {
      return res.json({
        status: "success",
        message: "Login Successfull",
        user: {
          name: user.name,
          _id: user._id,
        },
      });
    }
    res.json({ status: "error", message: "Error! invalid login details" });
  } catch (error) {
    next(error);
  }
});

export default router;
