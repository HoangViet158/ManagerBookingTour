import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminApi from "../../services/adminApi";

function UserModal({ show, onHide, user, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);

  const fetchRole = async () => {
    const res = await adminApi.getRoles();
    console.log("Roles:", res);
    setRoles(res);
  };
  useEffect(() => {
    fetchRole();
  }, []);
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        password: "",
        role: user.role || "",
      });
    } else {
      setFormData({ email: "", password: "", role: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (user) {
        await adminApi.updateUser(user.id, formData);
      } else {
        await adminApi.addUser(formData);
      }
      onSuccess();
      onHide();
    } catch (err) {
      console.error("❌ Lỗi khi lưu user:", err);
      alert("Lỗi khi lưu user");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Sửa người dùng" : "Thêm người dùng"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              disabled={user}
            />
          </Form.Group>

          {!user && (
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Quyền</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {roles
                .filter((role) => role.id !== 1) // loại bỏ admin
                .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
