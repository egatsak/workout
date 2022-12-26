import { Router } from "express";
import { createNewWorkoutLog } from "../controllers/workout/logController.js";
import {
  createNewWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout
} from "../controllers/workout/workoutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(protect, getWorkouts)
  .post(protect, createNewWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);
router.route("/log").post(protect, createNewWorkoutLog);
router.route("/:id").get(protect, getWorkout);

export default router;
