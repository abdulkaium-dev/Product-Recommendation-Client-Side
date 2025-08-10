import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";

import Login from "../component/Login";
import Register from "../component/Register";
import Home from "../Home/Home";
import MyQueriesPage from "../component/MyQueriesPage";
import AddQuery from "../component/AddQuery";
import QueryDetails from "../component/QueryDetails";
import Queries from "../component/Queries";
import UpdateQuery from "../component/Update";
import Recommendation from "../component/Recomendation";
import MyRecommendation from "../component/MyRecomendation";
import ErrorPage from "../component/ErrorPage";
import PrivateRouter from "./PrivateRouter"; // ✅ Protects private routes

const loadingFallback = (
  <div className="flex justify-center items-center mt-48">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
      },
      {
        path: "query/:id",
        Component: QueryDetails,
        hydrateFallbackElement: loadingFallback,
      },

      // ✅ Private Routes below
      {
        path: "my-queries",
        element: (
          <PrivateRouter>
            <MyQueriesPage />
          </PrivateRouter>
        ),
      },
      {
        path: "add-query",
        element: (
          <PrivateRouter>
            <AddQuery />
          </PrivateRouter>
        ),
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "update-query/:id",
        element: (
          <PrivateRouter>
            <UpdateQuery />
          </PrivateRouter>
        ),
        hydrateFallbackElement: loadingFallback,
      },
      {
        path: "my-recommendations",
        element: (
          <PrivateRouter>
            <MyRecommendation />
          </PrivateRouter>
        ),
      },
      {
        path: "recommended",
        element: (
          <PrivateRouter>
            <Recommendation />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
