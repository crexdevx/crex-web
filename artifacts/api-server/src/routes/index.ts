import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import reviewsRouter from "./reviews.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);

export default router;
