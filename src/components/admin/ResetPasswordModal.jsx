import { Modal, Button } from "react-bootstrap";
import adminApi from "../../services/adminApi";
import { toast } from "react-toastify";

export default function ResetPasswordModal({
  show,
  onHide,
  userId,
  onSuccess,
}) {
  const handleConfirm = async () => {
    try {
      await adminApi.ResetPassword(userId); // Gọi API reset mật khẩu
      toast.success("Đã đặt lại mật khẩu mặc định (123456)");
      onSuccess && onSuccess(); // refresh danh sách nếu có
      onHide(); // đóng modal
    } catch (err) {
      console.error("❌ Lỗi reset mật khẩu:", err);
      alert(err.response?.data?.message || "Không thể đặt lại mật khẩu.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận cấp lại mật khẩu</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Bạn có chắc chắn muốn đặt lại mật khẩu mặc định (<b>123456</b>) cho
          người dùng này không?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Cấp lại mật khẩu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
