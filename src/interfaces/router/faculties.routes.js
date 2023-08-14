import express from "express";
import {
  getAllFaculties,
  getFacultyById,
  getFacultiesGeneral,
} from "../controller/facultyController.js";

const router = express.Router();

router.get("/", getAllFaculties);
router.get("/:id", getFacultyById);
router.get("/search/:search", getFacultiesGeneral);

export default router;
