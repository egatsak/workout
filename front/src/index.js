import React from "react";
import ReactDOM from "react-dom/client";
/* import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"; */
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./scss/index.scss";

import reportWebVitals from "./reportWebVitals";

/* import Register from "./components/pages/Register/Register";
import Auth from "./components/pages/Auth/Auth";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Home from "./components/pages/Home/Home";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage"; */
import AppProvider from "./providers/AppProvider";

const queryClient = new QueryClient();

/* const router = createBrowserRouter([
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
  }
]);
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/*       <RouterProvider router={router} /> */}
      <AppProvider />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
