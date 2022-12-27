import { Router } from "express";
import {
  createNewWorkoutLog,
  getWorkoutLog,
  updateCompleteWorkoutLog
} from "../controllers/workout/logController.js";
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
router.route("/log/completed").put(protect, updateCompleteWorkoutLog);
router.route("/:id").get(protect, getWorkout);
router.route("/log/:id").get(protect, getWorkoutLog);

export default router;
