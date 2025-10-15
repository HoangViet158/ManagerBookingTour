import { MdHome } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  const [searchText, userSearchText] = useState("");

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo hoặc Brand */}
        <Navbar.Brand as={Link} to="/">
          <span className="text-white">NOVA TRAVEL</span>
        </Navbar.Brand>

        {/* Toggle hiện khi màn hình nhỏ */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggle"
        />

        {/* Nội dung menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Các icon điều hướng */}
          <div className="d-flex align-items-center me-auto mb-">
            <Link className="me-4 nav-icon" to="/">
              <MdHome />
            </Link>
            <Link className="me-4 nav-icon" to="/profile/schedule">
              <GrSchedules />
            </Link>
            <Link className="me-4 nav-icon" to="/profile/history">
              <FaHistory />
            </Link>
            {/* <Link className="me-4 nav-icon" to="/hotline">
              <RiCustomerService2Line />
            </Link> */}
          </div>

          {/* Form tìm kiếm */}
          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e) => userSearchText(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          {/* Link đăng nhập / đăng ký */}
          <Navbar.Text>
            <Link className="me-2 nav-text" to="/login">
              Đăng nhập
            </Link>
            |
            <Link className="ms-2 nav-text" to="/register">
              Đăng ký
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
