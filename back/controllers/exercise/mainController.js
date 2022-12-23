import asyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";

//@desc   Create new exercise
//@route  POST /api/exercises
//@access Private

export const createNewExercise = asyncHandler(async (req, res) => {
  const { name, times, imageId } = req.body;

  const exercise = await Exercise.create({ name, times, imageId });

  res.json(exercise);
});

//@desc   Update exercise
//@route  PUT /api/exercises
//@access Private

export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, imageId, exerciseId } = req.body;

  const exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    res.status(404);
    throw new Error("Current exercise is not found!");
  }

  exercise.name = name;
  exercise.times = times;
  exercise.imageId = imageId;

  const updatedExercise = await exercise.save();

  res.json(updatedExercise);
});

//@desc   Get exercises
//@route  GET /api/exercises
//@access Private

export const getExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find();
  res.json(exercises);
});

//@desc   Delete exercise
//@route  DELETE /api/exercises
//@access Private

export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body;

  const exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    res.status(404);
    throw new Error("Current exercise is not found!");
  }

  await exercise.remove();

  res.json({ message: "The exercise has been removed successfully" });
});