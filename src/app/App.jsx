import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRoutes from "./app.routes";
import { AlbumContextProvider } from "./features/album";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AlbumContextProvider>
      <ToastContainer newestOnTop />
      <RouterProvider router={appRoutes} />
    </AlbumContextProvider>
  );
}

export default App;
