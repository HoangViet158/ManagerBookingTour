import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import adminApi from "../../services/adminApi";
import { useEffect, useState } from "react";

function ModalDelete({ show, onHide, onConfirm, customerDelete }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (!customerDelete?.user_id) return;
    try {
      const res = await adminApi.getUserById(customerDelete.user_id);
      setUser(res);
    } catch (err) {
      console.error("Lỗi khi lấy user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [customerDelete]);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      toast.success(`${customerDelete.full_name} đã được xóa!`);
      onHide();
    } catch (err) {
      toast.error(`Xóa ${customerDelete.full_name} thất bại!`);
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customerDelete ? (
          <>
            Bạn có chắc chắn muốn xóa{" "}
            <strong>{customerDelete.full_name}</strong>
            {customerDelete.user_id && (
              <>
                {" "}
                (đồng thời tài khoản người dùng có email{" "}
                <strong>{user?.email || "..."}</strong> cũng sẽ bị xóa)
              </>
            )}{" "}
            không?
          </>
        ) : (
          <p>Đang tải thông tin...</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
