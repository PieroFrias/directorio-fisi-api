import express from "express";
import {
  getAllOffices,
  getOfficeById,
  getOfficesGeneral,
} from "../controller/officeController.js";

const router = express.Router();

router.get("/", getAllOffices);
router.get("/:id", getOfficeById);
router.get("/search/:search", getOfficesGeneral);

export default router;
