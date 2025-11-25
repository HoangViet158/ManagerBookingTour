import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import adminApi from "../../services/adminApi";
import UserModal from "./UserModal";
import AssignUserModal from "./AssignUserModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [assignModalShow, setAssignModalShow] = useState(false);
  const [customersWithoutUser, setCustomersWithoutUser] = useState([]);
  const [employeesNoUser, setEmployeesNoUser] = useState([]);

  // -------------------- PHÂN TRANG --------------------
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    setCurrentPage(1); // reset về trang 1 sau khi fetch
  };

  const fetchCustomersWithoutUser = async () => {
    try {
      const res = await adminApi.getCustomersWithoutUser();
      setCustomersWithoutUser(res);
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
    setAssignModalShow(true);
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý User</h1>
        <div>
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
            {currentUsers.map((user) => (
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

        {/* PHÂN TRANG */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
            />
          </Pagination>
        )}
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

      {/* MODAL RESET PASSWORD */}
      <ResetPasswordModal
        show={showModalReset}
        onHide={() => setShowModalReset(false)}
        userId={selectedUserId}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
