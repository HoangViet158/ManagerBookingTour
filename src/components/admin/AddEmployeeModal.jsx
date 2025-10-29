import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminApi from "../../services/adminApi";

export default function AddEmployeeModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    type: "",
    role_title: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await adminApi.createEmployee(formData);
      onSuccess(); // Gọi lại danh sách
      onHide();
    } catch (error) {
      console.error(error);
      alert("Thêm nhân viên thất bại!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm nhân viên</Modal.Title>
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
              placeholder="Nhập họ tên nhân viên"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập SĐT"
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Nhóm chức vụ</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="VD: Quản lý, Bán hàng..."
            />
          </Form.Group> */}

          <Form.Group>
            <Form.Label>Chức vụ</Form.Label>
            <Form.Control
              type="text"
              name="role_title"
              value={formData.role_title}
              onChange={handleChange}
              placeholder="VD: Nhân viên bán hàng"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Thêm nhân viên
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
