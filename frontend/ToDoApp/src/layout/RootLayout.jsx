import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../pages/footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
