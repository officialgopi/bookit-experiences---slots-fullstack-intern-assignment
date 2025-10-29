import { Router } from "express";
import { experiencesRouter } from "./experiences.route";
import { bookingsRouter } from "./bookings.route";
import { promoRouter } from "./promo.route";

const router = Router();

router.use("/experiences", experiencesRouter);
router.use("/bookings", bookingsRouter);
router.use("/promo", promoRouter);

export { router as apiRouter };
