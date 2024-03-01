import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "filed must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: { type: String },
  role: {
    type: String,
    enum: ["user", "admin", "manger"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "uploads/profile.jpg",
  },
});
const ModelUser = mongoose.model("user", userSchema);

export default ModelUser;
