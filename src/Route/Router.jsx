import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

import Login from "../component/Login";

import Register from "../component/Register";
import WhyWeExistSlider from "../component/Slider";
import MyQueriesPage from "../component/MyQueriesPage";
import AddQuery from "../component/AddQuery";
import Home from "../Home/Home";
import QueryDetails from "../component/QueryDetails";
import Queries from "../component/Queries";
import Update from "../component/Update";
import UpdateQuery from "../component/Update";
import Recomendation from "../component/Recomendation";
import MyRecommendation from "../component/MyRecomendation";
import Recommendation from "../component/Recomendation";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path :"/",
        Component : Home
      },
    
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
          {
        path: "queries",
        Component: Queries,
        hydrateFallbackElement: (
          <div className="flex justify-center items-center mt-48 ">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          </div>
        ),
      },
         {
        path: "my-queries",
        Component: MyQueriesPage,
        hydrateFallbackElement: (
          <div className="flex justify-center items-center mt-48 ">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          </div>
        ),
      },
         {
        path :"/query/:id",
        Component: QueryDetails,
        hydrateFallbackElement: (
          <div className="flex justify-center items-center mt-48 ">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          </div>
        ),
      },
        {
         path: "/update-query/:id",
        Component: UpdateQuery,
        hydrateFallbackElement: (
          <div className="flex justify-center items-center mt-48 ">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          </div>
        ),
      },
    {
  path: "/query/:id",
  element: <QueryDetails />
},
    {
  path: "/my-recommendations",
Component : MyRecommendation
},
    {
  path: "/recommended",
Component :Recommendation ,
},
     
           {
        path: "add-query",
        Component: AddQuery,
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