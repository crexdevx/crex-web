import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import reviewsRouter from "./reviews.js";
import portfolioRouter from "./portfolio.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(portfolioRouter);

export default router;
