import { Navigate, createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "./components";
import { PrivateLayout } from "./layouts";
import AlbumRoutes from "./features/album/album.routes";

const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/albums" />,
  },
  {
    path: "/albums",
    element: <PrivateLayout />,
    errorElement: <ErrorPage />,
    children: [...AlbumRoutes],
  },
]);

export default appRoutes;
