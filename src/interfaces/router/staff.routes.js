import express from "express";
import {
  getAllStaff,
  getStaffById,
  getStaffGeneral,
  getStaffByPosition,
} from "../controller/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.get("/search/:search", getStaffGeneral);
router.get("/search/position/:id_cargo", getStaffByPosition);

export default router;
