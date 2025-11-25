import React, { useEffect, useState } from "react";
import {
  getRoles,
  getRolePermissions,
  assignPermissions,
  addRole,
} from "../../services/roleApi";
import { getPermissions } from "../../services/permissionApi";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);

  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 5;
  const totalPages = Math.ceil(roles.length / rolesPerPage);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    const res = await getRoles();
    setRoles(res);
    setCurrentPage(1); // reset page khi fetch
  };

  const fetchPermissions = async () => {
    const res = await getPermissions();
    setPermissions(res);
  };

  const handleAssign = async (role) => {
    if (role.id === 1 || role.name.trim().toLowerCase() === "admin") {
      toast.error("Không được sửa quyền của admin");
      return;
    }
    if (role.id === 2 || role.name.trim().toLowerCase() === "customer") {
      toast.error("Không được sửa quyền của khách hàng");
      return;
    }
    setSelectedRole(role);
    const res = await getRolePermissions(role.id);
    setSelectedPerms(res.map((p) => p.id));
    setShowAssignModal(true);
  };

  const handleSaveAssign = async () => {
    await assignPermissions(selectedRole.id, selectedPerms);
    toast.success("Cập nhật quyền thành công!");
    setShowAssignModal(false);
  };

  const handleCheckboxChange = (permId) => {
    if (selectedPerms.includes(permId)) {
      setSelectedPerms(selectedPerms.filter((id) => id !== permId));
    } else {
      setSelectedPerms([...selectedPerms, permId]);
    }
  };

  const handleAddRole = async () => {
    if (!newRoleName.trim()) {
      toast.error("Tên vai trò không được để trống");
      return;
    }
    try {
      await addRole({ name: newRoleName, description: newRoleDesc });
      toast.success("Thêm vai trò thành công!");
      setNewRoleName("");
      setNewRoleDesc("");
      setShowAddRoleModal(false);
      fetchRoles();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm vai trò");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between">
        <h3>Quản lý Vai trò & Phân quyền</h3>
        <Button
          variant="success"
          className="mb-3"
          onClick={() => setShowAddRoleModal(true)}
        >
          Thêm vai trò mới
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên vai trò</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAssign(role)}
                >
                  Gán quyền
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang */}
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

      {/* Modal gán quyền */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Gán quyền cho: {selectedRole?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {permissions.map((p) => (
            <Form.Check
              key={p.id}
              type="checkbox"
              label={p.name}
              checked={selectedPerms.includes(p.id)}
              onChange={() => handleCheckboxChange(p.id)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleSaveAssign}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thêm role */}
      <Modal show={showAddRoleModal} onHide={() => setShowAddRoleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm vai trò mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên vai trò</Form.Label>
            <Form.Control
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddRoleModal(false)}
          >
            Hủy
          </Button>
          <Button variant="success" onClick={handleAddRole}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
