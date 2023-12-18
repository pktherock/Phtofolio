import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function PublicLayout() {
  console.log("I am public layout");
  return (
    <>
      <Header />
      <h1 className="text-2xl text-center">
        Built by using React, context API, firebase, tailwind CSS
      </h1>
      <Outlet />
      <Footer />
    </>
  );
}
export default PublicLayout;
