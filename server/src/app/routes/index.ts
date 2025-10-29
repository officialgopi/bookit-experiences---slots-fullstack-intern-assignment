import { Router } from "express";
import { experiencesRouter } from "./experiences.route";

const router = Router();

router.use("/experiences", experiencesRouter);

export { router as apiRouter };
