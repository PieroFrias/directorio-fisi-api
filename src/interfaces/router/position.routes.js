import express from "express";
import {
  getAllPosition,
} from "../controller/positionController.js";

const router = express.Router();

router.get("/", getAllPosition);

export default router;
