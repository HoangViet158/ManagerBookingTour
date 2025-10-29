import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaChartBar,
} from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";

import { useState } from "react";

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <Sidebar
      collapsed={isCollapsed} // <-- Dòng quan trọng
      width="250px"
      backgroundColor="#ffffff"
      style={{ height: "100vh", borderRight: "1px solid #ddd" }}
    >
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            background: "#4F46E5",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {"☰"}
        </button>
        {!isCollapsed && (
          <h4 style={{ fontWeight: "bold", color: "#4F46E5" }}>Admin Panel</h4>
        )}
      </div>

      <Menu iconShape="circle">
        <MenuItem
          icon={<FaTachometerAlt />}
          component={<NavLink to="/admin" />}
        >
          Dashboard
        </MenuItem>

        <MenuItem icon={<FaMapMarkedAlt />} component={<NavLink to="tours" />}>
          Quản lý Tour
        </MenuItem>

        <MenuItem icon={<FaUsers />} component={<NavLink to="users" />}>
          Quản lý User
        </MenuItem>
        <MenuItem icon={<FaUsersGear />} component={<NavLink to="employees" />}>
          Quản lý Nhân viên
        </MenuItem>
        <MenuItem icon={<FaUsersLine />} component={<NavLink to="customers" />}>
          Quản lý Khách hàng
        </MenuItem>
        <MenuItem
          icon={<MdMiscellaneousServices />}
          component={<NavLink to="services" />}
        >
          Quản lý dịch vụ
        </MenuItem>
        <MenuItem
          icon={<FaFileInvoiceDollar />}
          component={<NavLink to="invoices" />}
        >
          Quản lý Hóa đơn
        </MenuItem>

        <SubMenu icon={<FaCalendarAlt />} label="Quản lý Lịch trình">
          <MenuItem component={<NavLink to="schedules/employees" />}>
            Lịch trình nhân viên
          </MenuItem>
          <MenuItem component={<NavLink to="schedules/tour" />}>
            Lịch trình tour
          </MenuItem>
        </SubMenu>

        <SubMenu icon={<FaChartBar />} label="Thống kê / Tài liệu">
          <MenuItem component={<NavLink to="stats/sales" />}>
            Doanh thu
          </MenuItem>
          <MenuItem component={<NavLink to="docs" />}>Tài liệu</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
