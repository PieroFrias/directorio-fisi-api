import express from "express";
import facultiesRouter from "./faculties.routes.js";
import officesRouter from "./offices.routes.js";
import staffRouter from "./staff.routes.js";

const router = express.Router();

router.use("/faculties", facultiesRouter);
router.use("/offices", officesRouter);
router.use("/staff", staffRouter);

export default router;
