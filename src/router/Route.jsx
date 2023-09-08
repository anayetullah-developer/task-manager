import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import TaskManager from "../pages/TaskManager/TaskManager";
import TeamManager from "../pages/TeamManager/TeamManager";
import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <h1>Error Page</h1>,
      children: [
        {
          path: "/",
          element: <TaskManager/>,
        },
          {
            path: "/login",
            element: <Login/>,
          },
          {
            path: "/register",
            element: <Register/>,
          },
          {
            path: "/team-manager",
            element: <TeamManager/>,
          },
      
          {
            path: "/profile",
            element: <Profile/>
          }
      ]
    },
  
  ]);