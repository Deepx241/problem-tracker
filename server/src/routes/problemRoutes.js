import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  getAnalytics,
} from "../controllers/problemController.js";

const router = express.Router();

router.use(protect);

router.get("/analytics", getAnalytics);

router
  .route("/")
  .get(getProblems)
  .post(addProblem);

router
  .route("/:id")
  .put(updateProblem)
  .delete(deleteProblem);

export default router;