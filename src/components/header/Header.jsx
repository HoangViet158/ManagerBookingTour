import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

import "./Header.scss";

const Header = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    const res = logout();
    if (res) {
      toast.success("Đăng xuất thành công");
      nav("/login");
    } else {
      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo hoặc Brand */}
        <Navbar.Brand as={Link} to="/">
          <span className="text-white">NOVA TRAVEL</span>
        </Navbar.Brand>

        {/* Toggle hiển thị khi màn hình nhỏ */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggle"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Các icon điều hướng */}
          <div className="d-flex align-items-center me-auto">
            <Link className="me-4 nav-icon" to="/">
              <MdHome />
            </Link>

            {user && (
              <>
                <Link className="me-4 nav-icon" to="/profile">
                  <CgProfile />
                </Link>
                {/* Chỉ hiện icon Admin nếu role_id = 1 (Admin) */}
                {user.role_id !== 2 && (
                  <Link className="me-4 nav-icon" to="/admin">
                    <IoSettingsSharp />
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Đăng nhập / đăng xuất */}
          <div className="d-flex align-items-center">
            {user ? (
              <Button
                variant="link"
                className="nav-text"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            ) : (
              <>
                <Button
                  variant="link"
                  className="nav-text"
                  onClick={() => nav("/login")}
                >
                  Đăng nhập
                </Button>
                |
                <Button
                  variant="link"
                  className="nav-text"
                  onClick={() => nav("/register")}
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
