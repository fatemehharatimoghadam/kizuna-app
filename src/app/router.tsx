import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layout/RootLayout";
import AIPage from "../pages/ai/AIPage";
import HomePage from "../pages/home/HomePage";
import MangaDetailPage from "../pages/manga/MangaDetailPage";
import SearchPage from "../pages/search/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "manga/:id",
        element: <MangaDetailPage />,
      },
      {
        path: "ai",
        element: <AIPage />,
      },
    ],
  },
]);