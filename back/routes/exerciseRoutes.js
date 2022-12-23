import { Router } from "express";
import { createNewExerciseLog } from "../controllers/exercise/log/createController.js";
import { getExerciseLog } from "../controllers/exercise/log/getController.js";
import {
  updateCompletedExerciseLog,
  updateExerciseLog
} from "../controllers/exercise/log/updateController.js";
import {
  createNewExercise,
  deleteExercise,
  getExercises,
  updateExercise
} from "../controllers/exercise/mainController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(protect, getExercises)
  .post(protect, createNewExercise)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);
router
  .route("/log")
  .post(protect, createNewExerciseLog)
  .put(protect, updateExerciseLog);
router
  .route("/log/completed")
  .put(protect, updateCompletedExerciseLog);
router.route("/log/:id").get(protect, getExerciseLog);

export default router;
