import express from "express";
import {
  getAllFaculties,
  getFacultyById,
  getFacultiesGeneral,
  filterFaculties
} from "../controller/facultyController.js";

const router = express.Router();

router.get("/", getAllFaculties);
router.get("/:id", getFacultyById);
router.get("/search/:search", getFacultiesGeneral);

router.post('/filter', filterFaculties);

export default router;
