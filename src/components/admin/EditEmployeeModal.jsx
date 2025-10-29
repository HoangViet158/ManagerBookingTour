import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminApi from "../../services/adminApi";

export default function EditEmployeeModal({
  show,
  onHide,
  employee,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    type: "",
    role_title: "",
    status: "active",
  });

  useEffect(() => {
    if (employee) setFormData({ ...employee });
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await adminApi.updateEmployee(employee.id, formData);
      onSuccess();
      onHide();
    } catch (error) {
      console.error(error);
      alert("Cập nhật nhân viên thất bại!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Sửa nhân viên</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Nhóm chức vụ</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
            />
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Chức vụ</Form.Label>
            <Form.Control
              type="text"
              name="role_title"
              value={formData.role_title || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
