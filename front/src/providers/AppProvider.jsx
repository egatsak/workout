import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Auth from "../components/pages/Auth/Auth";
import ErrorPage from "../components/pages/ErrorPage/ErrorPage";
import Home from "../components/pages/Home/Home";
import NewWorkout from "../components/pages/NewWorkout/NewWorkout";
import Register from "../components/pages/Register/Register";
import NewExercise from "../components/pages/NewExercise/NewExercise";
import Profile from "../components/pages/Profile/Profile";
import SingleWorkout from "../components/pages/Workouts/SingleWorkout";
import WorkoutsList from "../components/pages/Workouts/WorkoutsList";
import SingleExercise from "../components/pages/Exercises/SingleExercise";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  {
    path: "/new-workout",
    element: <NewWorkout />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/new-exercise",
    element: <NewExercise />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/workout/:id",
    element: <SingleWorkout />
  },
  {
    path: "/workouts",
    element: <WorkoutsList />
  },
  {
    path: "/exercise/:id",
    element: <SingleExercise />
  }
]);

const privateRouter = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  {
    path: "/new-workout",
    element: <NewWorkout />
  },
  {
    path: "/new-exercise",
    element: <NewExercise />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/workout/:id",
    element: <SingleWorkout />
  },
  {
    path: "/workouts",
    element: <WorkoutsList />
  },
  {
    path: "/exercise/:id",
    element: <SingleExercise />
  }
]);

const AppProvider = () => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <RouterProvider router={isAuth ? privateRouter : router} />
    </AuthContext.Provider>
  );
};

export default AppProvider;
