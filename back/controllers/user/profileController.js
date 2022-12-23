import { concurrently } from "concurrently";
import asyncHandler from "express-async-handler";
import ExerciseLog from "../../models/exerciseLogModel.js";
import User from "../../models/userModel.js";
import WorkoutLog from "../../models/workoutLogModel.js";

//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .lean();
  if (!user) {
    res.status(404);
    throw new Error("Profile not found!");
  }

  const exerciseLogByUser = await ExerciseLog.find({
    user: user._id,
    completed: true
  });

  const countExerciseTimesCompleted = exerciseLogByUser.reduce(
    (sum, curr) => sum + curr.times.length,
    0
  );

  const minutes = Math.ceil(countExerciseTimesCompleted * 2.3);

  const workouts = await WorkoutLog.find({
    user: user._id,
    completed: true
  }).countDocuments();

  const kgs = exerciseLogByUser.reduce(
    (sum, curr) =>
      sum +
      curr.times.reduce((sumint, item) => sumint + item.weight, 0),
    0
  );

  res.json({ ...user, minutes, workouts, kgs });
  // res.json(exerciseLogByUser);                   lesson18 !!!
});
