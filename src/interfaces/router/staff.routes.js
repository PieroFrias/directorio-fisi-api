import express from "express";
import {
  getAllStaff,
  getStaffById,
  getStaffGeneral,
} from "../controller/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.get("/search/:search", getStaffGeneral);

export default router;
