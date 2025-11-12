import { Modal, Button } from "react-bootstrap";
import locationApi from "../../services/adminApi";

export default function DeleteLocationModal({
  show,
  onHide,
  onSuccess,
  locationId,
}) {
  const handleDelete = async () => {
    try {
      await locationApi.deleteLocation(locationId);
      onSuccess();
      onHide();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa location này không?</Modal.Body>
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
