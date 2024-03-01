import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors";
import { courseRouter } from "./routes/course.route.js";
import { usersRouter } from "./routes/user.route.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(console.log("dataBase Starting"))
  .catch((err) => {
    console.log(err);
  });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/courses", courseRouter);
app.use("/api/users", usersRouter);
app.listen(3000, () => {
  console.log("server started");
});
