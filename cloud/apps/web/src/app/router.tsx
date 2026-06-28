import { createBrowserRouter } from "react-router-dom";
import { CloudPage } from "@/pages/cloud-page";
import { FavoritesPage } from "@/pages/favorites-page";
import { LoginPage } from "@/pages/login-page";
import { SharePage } from "@/pages/share-page";
import { TrashPage } from "@/pages/trash-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/cloud",
    element: <CloudPage />
  },
  {
    path: "/favorites",
    element: <FavoritesPage />
  },
  {
    path: "/trash",
    element: <TrashPage />
  },
  {
    path: "/share/:token",
    element: <SharePage />
  }
]);
