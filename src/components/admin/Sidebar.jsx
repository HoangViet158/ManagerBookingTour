import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaChartBar,
} from "react-icons/fa";
import { FaUsersLine, FaUsersGear } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getRolePermissions } from "../../services/roleApi";
import { MdAdminPanelSettings } from "react-icons/md";

import useAuth from "../../hooks/useAuth";

// Menu config chính
const sidebarMenu = [
  {
    key: "MANAGE_TOURS",
    label: "Quản lý Tour",
    icon: <FaMapMarkedAlt />,
    path: "tours",
  },
  {
    key: "MANAGE_USERS",
    label: "Quản lý User",
    icon: <FaUsers />,
    path: "users",
  },
  {
    key: "MANAGE_EMPLOYEES",
    label: "Quản lý Nhân viên",
    icon: <FaUsersGear />,
    path: "employees",
  },
  {
    key: "MANAGE_CUSTOMERS",
    label: "Quản lý Khách hàng",
    icon: <FaUsersLine />,
    path: "customers",
  },
  {
    key: "MANAGE_LOCATIONS",
    label: "Quản lý địa điểm",
    icon: <LiaSearchLocationSolid />,
    path: "locations",
  },
  {
    key: "MANAGE_SERVICES",
    label: "Quản lý dịch vụ",
    icon: <MdMiscellaneousServices />,
    path: "services",
  },
  {
    key: "MANAGE_INVOICES",
    label: "Quản lý Hóa đơn",
    icon: <FaFileInvoiceDollar />,
    path: "invoices",
  },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user?.role_id) return;
      try {
        const res = await getRolePermissions(user.role_id);
        setPermissions(res.map((p) => p.name.toUpperCase())); // chuẩn hóa key
      } catch (err) {
        console.error("❌ Lỗi lấy permissions:", err);
      }
    };
    fetchPermissions();
  }, [user]);

  const can = (key) => permissions.includes(key.toUpperCase());

  return (
    <Sidebar
      collapsed={isCollapsed}
      width="250px"
      backgroundColor="#ffffff"
      style={{ height: "100vh", borderRight: "1px solid #ddd" }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
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
        {/* Dashboard */}
        {can("DASHBOARD") && (
          <MenuItem
            icon={<FaTachometerAlt />}
            component={<NavLink to="/admin" />}
          >
            Dashboard
          </MenuItem>
        )}

        {/* Menu chính */}
        {sidebarMenu.map((menu) =>
          can(menu.key) ? (
            <MenuItem
              key={menu.key}
              icon={menu.icon}
              component={<NavLink to={menu.path} />}
            >
              {menu.label}
            </MenuItem>
          ) : null
        )}

        {/* Quản lý quyền (chỉ admin role_id = 1) */}
        {user?.role_id === 1 && (
          <MenuItem
            icon={<MdAdminPanelSettings />}
            component={<NavLink to="roles" />}
          >
            Quản lý quyền
          </MenuItem>
        )}

        {/* SubMenu Lịch trình */}
        {/* {can("MANAGE_SCHEDULES") && (
          <SubMenu icon={<FaCalendarAlt />} label="Quản lý Lịch trình">
            {can("MANAGE_EMPLOYEE_SCHEDULES") && (
              <MenuItem component={<NavLink to="schedules/employees" />}>
                Lịch trình nhân viên
              </MenuItem>
            )}
            {can("MANAGE_TOUR_SCHEDULES") && (
              <MenuItem component={<NavLink to="schedules/tour" />}>
                Lịch trình tour
              </MenuItem>
            )}
          </SubMenu>
        )} */}

        {/* Thống kê / Doanh thu */}
        {can("VIEW_STATS") && (
          <MenuItem icon={<FaChartBar />} component={<NavLink to="stats" />}>
            Doanh Thu
          </MenuItem>
        )}

        {/* Luôn hiển thị */}
        <MenuItem icon={<IoMdArrowRoundBack />} onClick={() => navigate("/")}>
          Trở về
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
