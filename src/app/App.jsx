import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRoutes from "./app.routes";
import { AlbumContextProvider } from "./features/album";
import { ToastContainer } from "react-toastify";
import "react-image-gallery/styles/css/image-gallery.css"

function App() {
  return (
    <AlbumContextProvider>
      <ToastContainer newestOnTop />
      <RouterProvider router={appRoutes} />
    </AlbumContextProvider>
  );
}

export default App;
