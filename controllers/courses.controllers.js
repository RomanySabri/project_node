import { validationResult } from "express-validator";
import ModelCourse from "../models/course.model.js";

const getAllCourses = async (req, res) => {
  try {
    const courses = await ModelCourse.find();
    res.json({ status: "success", data: { courses } });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await ModelCourse.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", data: { course: "course not found" } });
    }
    res.json({ status: "success", data: { course } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", data: null, message: err.message });
  }
};

const addCourse = async (req, res) => {
  const { title, price } = req.body;
  const course = await ModelCourse.findOne({ title });
  if (course) {
    return res.status(401).json({ message: "course already been taken" });
  }
  const newCourse = new ModelCourse(req.body);
  newCourse.save();
  res.status(201).json({ status: "success", data });
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    let course = await ModelCourse.findByIdAndUpdate(
      { _id: courseId },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json({ status: "success", data: course });
  } catch (err) {
    return res.status(400).json({ status: "error", message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  const course = await ModelCourse.deleteOne({ _id: req.params.courseId });

  res.status(200).json({ status: "success", data: null });
};

export const courses = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
