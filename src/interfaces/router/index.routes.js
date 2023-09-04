import express from "express";
import facultiesRouter from "./faculties.routes.js";
import officesRouter from "./offices.routes.js";
import staffRouter from "./staff.routes.js";
import positionRouter from "./position.routes.js";
import generalSearchRouter from "./generalSearch.routes.js";

const router = express.Router();

router.use("/faculties", facultiesRouter);
router.use("/offices", officesRouter);
router.use("/staff", staffRouter);
router.use("/position", positionRouter);
router.use("/general-search", generalSearchRouter);

export default router;
