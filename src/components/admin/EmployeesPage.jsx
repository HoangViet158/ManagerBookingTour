import { useState, useEffect } from "react";
import adminApi from "../../services/adminApi";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await adminApi.getEmployees();
    setEmployees(res);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý nhân viên</h1>
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
        >
          Thêm nhân viên
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>SĐT</th>
              {/* <th>Nhóm</th> */}
              <th>Chức vụ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.phone}</td>
                {/* <td>{emp.type}</td> */}
                <td>{emp.role_title}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditEmployee(emp)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleteEmployee(emp)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddEmployeeModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={fetchEmployees}
      />

      {editEmployee && (
        <EditEmployeeModal
          show={!!editEmployee}
          onHide={() => setEditEmployee(null)}
          employee={editEmployee}
          onSuccess={fetchEmployees}
        />
      )}

      {deleteEmployee && (
        <DeleteEmployeeModal
          show={!!deleteEmployee}
          onHide={() => setDeleteEmployee(null)}
          employee={deleteEmployee}
          onSuccess={fetchEmployees}
        />
      )}
    </div>
  );
};

export default EmployeesPage;
