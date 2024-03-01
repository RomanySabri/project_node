import express from "express";
import multer from "multer";
import { users } from "../controllers/users.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { error } from "console";

const router = express.Router();
const diskstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType == "image") {
    return cb(null, true);
  } else {
    cb(error("file must be an image"), false);
  }
};

const upload = multer({ storage: diskstorage, fileFilter: fileFilter });

router.route("/").get(verifyToken, users.getAllUsers);
router.route("/register").post(upload.single("avatar"), users.register);
router.route("/login").post(users.login);

export const usersRouter = router;
