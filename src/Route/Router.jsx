import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";

import Login from "../component/Login";
import Register from "../component/Register";
import WhyWeExistSlider from "../component/Slider";
import MyQueriesPage from "../component/MyQueriesPage";
import AddQuery from "../component/AddQuery";
import Home from "../Home/Home";
import QueryDetails from "../component/QueryDetails";
import Queries from "../component/Queries";
import UpdateQuery from "../component/Update";
import Recommendation from "../component/Recomendation";
import MyRecommendation from "../component/MyRecomendation";
import ErrorPage from "../component/ErrorPage";  // Import your error page here

const loadingFallback = (
  <div className="flex justify-center items-center mt-48 ">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />, // This shows on any unmatched routes or loader/action errors
    children: [
      {
        index: true, // This means path: "/" as index route
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "register",
        Component: Register,
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "queries",
        Component: Queries,
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "my-queries",
        Component: MyQueriesPage,
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "query/:id",
        Component: QueryDetails,
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "update-query/:id",
        Component: UpdateQuery,
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "my-recommendations",
        Component: MyRecommendation,
      },
      {
        path: "recommended",
        Component: Recommendation,
      },
      {
        path: "add-query",
        Component: AddQuery,
        hydrateFallbackElement: loadingFallback,
      },
    ],
  },
]);

export default router;
