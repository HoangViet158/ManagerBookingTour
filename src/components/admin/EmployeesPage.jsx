import { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import adminApi from "../../services/adminApi";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EmployeeScheduleModal from "./EmployeeSheduleModal";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmployeeScheduleModal, setShowEmployeeScheduleModal] =
    useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  const fetchEmployees = async () => {
    const res = await adminApi.getEmployees();
    setEmployees(res);
    setCurrentPage(1); // reset page khi fetch
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Phân trang dữ liệu
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý nhân viên</h1>
        <Button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
        >
          Thêm nhân viên
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>SĐT</th>
              <th>Chức vụ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.phone}</td>
                <td>{emp.role_title}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => setShowEmployeeScheduleModal(emp)}
                  >
                    Lịch trình nhân viên
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => setEditEmployee(emp)}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteEmployee(emp)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
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

      <EmployeeScheduleModal
        show={!!showEmployeeScheduleModal}
        onClose={() => setShowEmployeeScheduleModal(null)}
        employee={showEmployeeScheduleModal}
      />
    </div>
  );
};

export default EmployeesPage;
