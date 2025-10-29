import { Router } from "express";
import { acceptBooking } from "../controllers/bookings.controller";

const router = Router();

router.post("/", acceptBooking);

export { router as bookingsRouter };
