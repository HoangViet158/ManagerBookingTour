import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import "./UserLayout.scss";
import Footer from "../components/footer/Footer";

const UserLayout = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="body-content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
