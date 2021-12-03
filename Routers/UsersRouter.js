import { client } from "../index.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  generateHashPassword,
  getUserByUserName,
} from "../helper.js";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  console.log("userdetails", req.body);
  const { userName, password } = req.body;
  const checkUserAlreadyExist = await getUserByUserName(userName);

  if (checkUserAlreadyExist) {
    res.status(401).send({ message: "Username already exists" });
    return;
  }
  const hashedPassword = await generateHashPassword(password);
  const mongoResponse = await createUser({
    ...req.body,
    password: hashedPassword,
  });
  if (mongoResponse.acknowledged) {
    const createdUser = await getUserByUserName(userName);
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_KEY);
    res.send({ message: "SignUp successfull", token: token });
  }
});
router.route("/login").post(async (req, res) => {
  const { userName, password } = req.body;
  const userDetails = await getUserByUserName(userName);
  if (!userDetails) {
    res.send({ message: "Account doesn't exist" });
    return;
  }
  const matchpassword = bcrypt.compare(password, userDetails.password);
  if (matchpassword) {
    const token = jwt.sign({ id: userDetails._id }, process.env.JWT_KEY);
    res.send({ message: "Successfull login", token: token });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

export const usersRouter = router;
