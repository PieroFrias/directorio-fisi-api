import express from "express";
import {
  getAllStaff,
  getStaffById,
  getStaffGeneral,
  getStaffByPosition,
  filterStaff
} from "../controller/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.get("/search/:search", getStaffGeneral);
router.get("/search/position/:id_cargo", getStaffByPosition);

router.post('/filter', filterStaff);

export default router;
