import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import NotFound from "../pages/NotFound.jsx";
import Activities from "../pages/Activities.jsx";
import AddActivity from "../pages/AddActivity.jsx";
import News from "../pages/News.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/add-activity",
        element: <AddActivity />,
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
