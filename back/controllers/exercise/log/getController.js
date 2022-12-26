import asyncHandler from "express-async-handler";
import ExerciseLog from "../../../models/exerciseLogModel.js";

import { reBuildTimes } from "../../../helpers/exerciseLog.js";

//@desc   Get exerciseLog
//@route  GET /api/exercises/log/:id
//@access Private

export const getExerciseLog = asyncHandler(async (req, res) => {
  const exerciseLog = await ExerciseLog.findById(req.params.id)
    .populate("exercise", "name imageName")
    .lean();

  if (!exerciseLog) {
    res.status(404);
    throw new Error("Log is not found!");
  }

  const prevExerciseLogs = await ExerciseLog.find({
    user: req.user.id,
    exercise: exerciseLog._id
  }).sort("desc");

  const prevExLog = prevExerciseLogs[0];

  let newTimes = reBuildTimes(exerciseLog);

  if (prevExLog) {
    newTimes = reBuildTimes(exerciseLog, prevExLog);
  }

  res.json({
    ...exerciseLog,
    times: newTimes
  });
});
