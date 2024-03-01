import ModelUser from "../models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { generateJWT } from "../utils/generateJWT.js";

const getAllUsers = async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await ModelUser.find({ __v: false }).limit(limit).skip(skip);
  res.status(200).json({ status: "success", data: users });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await ModelUser.findOne({ email: email });
  if (oldUser) {
    res.status(400).json({ status: "fail", message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new ModelUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: "success", data: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await ModelUser.findOne({ email: email });
  if (!user) {
    res
      .status(400)
      .json({ status: "fail", message: "user or password incorrect" });
  }
  const matchpassword = await bcrypt.compare(password, user.password);

  if (user && matchpassword) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    res.status(201).json({ status: "success", data: { token } });
  } else {
    res.status(500).json({ status: "fail", message: "something wrong" });
  }
};

export const users = {
  getAllUsers,
  register,
  login,
};
