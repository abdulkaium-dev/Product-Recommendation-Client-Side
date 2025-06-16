import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

import Login from "../component/Login";

import Register from "../component/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
    
      {
        path: "login",
        Component: Login,
        hydrateFallbackElement: (
          <div className="flex justify-center items-center mt-48 ">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          </div>
        ),
      },
    
      {
        path: "register",
        Component: Register,
        hydrateFallbackElement: (
          <div className="flex justify-center items-center mt-48 ">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          </div>
        ),
      },
    ],
  },
]);

export default router;