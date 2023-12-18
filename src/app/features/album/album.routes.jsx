import { Album, Albums } from "./components";

const AlbumRoutes = [
  {
    path: "",
    element: <Albums />,
  },
  {
    path: ":albumId",
    element: <Album />,
  },
];

export default AlbumRoutes;
