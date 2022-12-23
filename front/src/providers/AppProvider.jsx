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
