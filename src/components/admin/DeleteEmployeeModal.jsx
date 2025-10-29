import { Modal, Button } from "react-bootstrap";
import adminApi from "../../services/adminApi";

export default function DeleteEmployeeModal({
  show,
  onHide,
  employee,
  onSuccess,
}) {
  const handleDelete = async () => {
    try {
      await adminApi.deleteEmployee(employee.id);
      onSuccess();
      onHide();
    } catch (error) {
      console.error(error);
      alert("Xóa nhân viên thất bại!");
    }
  };

  if (!employee) return null;

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Xóa nhân viên</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Bạn có chắc muốn xóa nhân viên: <strong>{employee.full_name}</strong>{" "}
          ?
        </p>
        {employee.user_email && (
          <p>
            Tài khoản email đi kèm cũng sẽ bị xóa:{" "}
            <strong>{employee.user_email}</strong>
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
