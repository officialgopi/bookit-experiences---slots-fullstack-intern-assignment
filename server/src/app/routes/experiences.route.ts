import { Router } from "express";
import {
  getExperienceById,
  getExperiences,
} from "../controllers/experiences.controller";

const router = Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);

export { router as experiencesRouter };
