import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import Workout from "../../models/workoutModel.js";

//@desc   Create new workout
//@route  POST /api/workouts
//@access Private

export const createNewWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body;
  const workout = await Workout.create({
    name,
    exercises: exerciseIds
  });

  res.json(workout);
});

//@desc   Get workout
//@route  GET /api/workout/:id
//@access Private

export const getWorkout = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Current workout is not found!");
  }

  const workout = await Workout.findById(req.params.id)
    .populate("exercises")
    .lean();

  if (!workout) {
    res.status(404);
    throw new Error("Current workout is not found!");
  }

  let minutes = Math.ceil(workout.exercises.length * 3.7);
  res.json({ ...workout, minutes });
});

//@desc   Get workout
//@route  GET /api/workouts
//@access Private

export const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({}).populate("exercises");

  res.json(workouts);
});

//@desc   Update workout
//@route  PUT /api/workouts
//@access Private

export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds, workoutId } = req.body;

  if (!isValidObjectId(workoutId)) {
    res.status(404);
    throw new Error("Current workout is not found!");
  }

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    res.status(404);
    throw new Error("Current workout is not found!");
  }

  workout.name = name;
  workout.exercises = exerciseIds;

  const updatedWorkout = await workout.save();

  res.json(updatedWorkout);
});

//@desc   Delete workout
//@route  DELETE /api/workouts
//@access Private

export const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.body;

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    res.status(404);
    throw new Error("Current workout is not found!");
  }

  await workout.remove();

  res.json({ message: "The workout has been removed successfully" });
});
