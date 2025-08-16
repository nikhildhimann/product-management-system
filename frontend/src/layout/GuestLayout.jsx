import { Outlet } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "../components/Footer";

function GuestLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default GuestLayout;