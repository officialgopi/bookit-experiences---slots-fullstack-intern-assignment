import { Router } from "express";
import { experienceRouter } from "./experience.route";

const router = Router();

router.use("/experiences", experienceRouter);

export { router as apiRouter };
