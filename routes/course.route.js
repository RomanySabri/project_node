import express from "express";
import { courses } from "../controllers/courses.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowedTo } from "../middleware/allowedTo.js";
const router = express.Router();

router
  .route("/")
  .get(verifyToken, courses.getAllCourses)
  .post(verifyToken, courses.addCourse);

router
  .route("/:courseId")
  .get(courses.getCourse)
  .patch(courses.updateCourse)
  .delete(verifyToken, allowedTo("admin", "manger"), courses.deleteCourse);

export const courseRouter = router;
