import express from "express";
import { generalSearch } from "../controller/generalSearchController.js";

const router = express.Router();

// Define la ruta para obtener una especie en general
router.get("/:search", generalSearch);

export default router;