import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminApi from "../../services/adminApi";
import { toast } from "react-toastify";

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
  const [roles, setRoles] = useState([]);

  const fetchRole = async () => {
    const res = await adminApi.getRoles();
    console.log("Roles:", res);
    setRoles(res);
  };
  useEffect(() => {
    fetchRole();
  }, []);
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
      return toast.error("Email và mật khẩu là bắt buộc");
    const payload = {
      ...formData,
      role_id: type === "customer" ? 2 : formData.role_id, // gán mặc định cho customer
    };

    try {
      // Tạo user
      const created = await adminApi.addUser(payload);
      console.log("crea", formData);
      // Cập nhật user_id cho customer hoặc employee
      if (type === "customer") {
        const updatedCustomer = { ...selected, user_id: created.id }; // dùng selected hiện tại
        await adminApi.updateCustomer(selected.id, updatedCustomer);
        setSelected(updatedCustomer); // cập nhật state sau cùng
        toast.info("Cấp tài khoản cho khách hàng, quyền mặc định là User");
      } else {
        const updatedEmployee = { ...selected, user_id: created.id };
        await adminApi.updateEmployee(selected.id, updatedEmployee);
        setSelected(updatedEmployee);
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
                  {roles
                    .filter((r) => r.id !== 1)
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
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
