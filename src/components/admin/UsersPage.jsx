import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import adminApi from "../../services/adminApi";
import UserModal from "./UserModal";
import AssignUserModal from "./AssignUserModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { toast } from "react-toastify";
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [assignModalShow, setAssignModalShow] = useState(false);
  const [customersWithoutUser, setCustomersWithoutUser] = useState([]);
  const [employeesNoUser, setEmployeesNoUser] = useState([]);

  // -------------------- FETCH --------------------
  const fetchUsers = async () => {
    const res = await adminApi.getUsers();
    const userList = res.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role_name,
      createdAt: new Date(user.created_at).toLocaleDateString("vi-VN"),
      updatedAt: new Date(user.updated_at).toLocaleDateString("vi-VN"),
    }));
    setUsers(userList);
  };

  const fetchCustomersWithoutUser = async () => {
    try {
      const res = await adminApi.getCustomersWithoutUser();
      setCustomersWithoutUser(res);
      console.log("customersWithoutUser:", res);
    } catch (err) {
      console.error("Lỗi khi lấy khách hàng chưa có user:", err);
    }
  };

  const fetchEmployeesWithoutUser = async () => {
    try {
      const res = await adminApi.getEmployeesWithoutUser();
      setEmployeesNoUser(res);
    } catch (err) {
      console.error("Lỗi khi lấy nhân viên chưa có user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCustomersWithoutUser();
    fetchEmployeesWithoutUser();
  }, []);

  // -------------------- HANDLE --------------------
  // const handleAdd = () => {
  //   setSelectedUser(null);
  //   setModalShow(true);
  // };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const handleResetClick = (id) => {
    setSelectedUserId(id);
    setShowModalReset(true);
  };
  const handleDelete = async (user) => {
    if (window.confirm(`Bạn có chắc muốn xóa user ${user.email}?`)) {
      try {
        await adminApi.deleteUser(user.id);
        setUsers(users.filter((u) => u.id !== user.id));
        fetchCustomersWithoutUser();
        fetchEmployeesWithoutUser();
      } catch (err) {
        console.error("❌ Lỗi xóa user:", err);
        alert("Lỗi khi xóa user");
      }
    }
  };

  const handleAssignAccount = () => {
    // Mở modal cấp tài khoản từ danh sách khách hàng/nhân viên chưa user
    setAssignModalShow(true);
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý User</h1>
        <div>
          {/* <button className="btn btn-success me-2" onClick={handleAdd}>
            Thêm user mới
          </button> */}
          <button className="btn btn-primary" onClick={handleAssignAccount}>
            Cấp tài khoản
          </button>
        </div>
      </div>

      {/* DANH SÁCH USER */}
      <div className="table-responsive mb-4">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Cập nhật cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleResetClick(user.id)}
                  >
                    Cấp lại mật khẩu
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL THÊM/SỬA USER */}
      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
        onSuccess={fetchUsers}
      />

      {/* MODAL CẤP TÀI KHOẢN */}
      <AssignUserModal
        show={assignModalShow}
        onHide={() => setAssignModalShow(false)}
        customers={customersWithoutUser}
        employees={employeesNoUser}
        onSuccess={() => {
          fetchUsers();
          fetchCustomersWithoutUser();
          fetchEmployeesWithoutUser();
          toast.success("Cấp tài khoản thành công");
        }}
      />
      {/* Modal xác nhận */}
      <ResetPasswordModal
        show={showModalReset}
        onHide={() => setShowModalReset(false)}
        userId={selectedUserId}
        onSuccess={() => {
          // reload danh sách sau khi reset xong nếu cần
          fetchUsers();
        }}
      />
    </div>
  );
}
