import { Outlet } from "react-router-dom";
import AppSidebar from "../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div>
        <AppSidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: "#f9fafb" }}>
        {/* Top bar với nút toggle */}

        {/* Nội dung chính */}
        <main style={{ padding: "24px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
