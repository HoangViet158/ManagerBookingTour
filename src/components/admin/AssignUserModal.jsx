import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminApi from "../../services/adminApi";

export default function AssignUserModal({
  show,
  onHide,
  customers,
  employees,
  onSuccess,
}) {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState({}); // customer/employee được chọn
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role_id: 2, // 2 = User, 1 = Admin
  });
  // Khi chọn khách hàng/nhân viên
  const handleSelect = (type, item) => {
    setType(type);
    setSelected(item);
    console.log("đối tượng được chọn :", item);
    setFormData((prev) => ({
      ...prev,
      role_id: 2, // mặc định User
    }));
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu user
  const handleSave = async () => {
    if (!selected) return alert("Chọn khách hàng hoặc nhân viên trước");
    if (!formData.email || !formData.password)
      return alert("Email và mật khẩu là bắt buộc");

    try {
      // Tạo user
      const created = await adminApi.addUser(formData);
      // Cập nhật user_id cho customer hoặc employee
      if (type === "customers") {
        setSelected((prev) => ({ ...prev, user_id: created.id }));
        await adminApi.updateCustomer(selected.id, {
          ...selected,
          user_id: created.id,
        });
      } else {
        console.log(created);
        await adminApi.updateEmployee(selected.id, {
          ...selected,
          user_id: created.id,
        });
      }

      onSuccess();
      onHide();
      // reset
      setSelected(null);
      setFormData({ email: "", password: "", role_id: 2 });
    } catch (err) {
      console.error("❌ Lỗi khi cấp tài khoản:", err);
      alert(
        err.response?.data?.message || "Cấp tài khoản thất bại. Xem console."
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cấp tài khoản cho khách hàng/nhân viên</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>Chọn đối tượng</h5>

        <div className="mb-3">
          <strong>Khách hàng:</strong>
          {customers.length === 0 && <div>Không có khách hàng nào</div>}
          {customers.map((c) => (
            <div key={c.id}>
              <input
                type="radio"
                name="assign"
                value={c.id}
                checked={selected?.id === c.id}
                onChange={() => handleSelect("customer", c)}
              />{" "}
              {c.full_name} - {c.phone}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <strong>Nhân viên:</strong>
          {employees.length === 0 && <div>Không có nhân viên nào</div>}
          {employees.map((e) => (
            <div key={e.id}>
              <input
                type="radio"
                name="assign"
                value={e.id}
                checked={selected?.id === e.id}
                onChange={() => handleSelect("staff", e)}
              />{" "}
              {e.full_name} - {e.phone}
            </div>
          ))}
        </div>

        {selected && (
          <>
            <h5 className="mt-3">Thông tin tài khoản</h5>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Quyền</Form.Label>
                <Form.Select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                >
                  <option value={2}>User</option>
                  <option value={1}>Admin</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Cấp tài khoản
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
