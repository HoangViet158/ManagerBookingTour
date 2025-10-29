import { Modal, Button } from "react-bootstrap";
import tourApi from "../../services/adminApi";

export default function DeleteTourModal({ show, onHide, tour, onSuccess }) {
  const handleDelete = async () => {
    try {
      await tourApi.deleteTour(tour.id);
      onSuccess();
      onHide();
    } catch (error) {
      console.error(error);
      alert("Xóa tour thất bại!");
    }
  };

  if (!tour) return null;

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Xóa tour</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Bạn có chắc muốn xóa tour: <strong>{tour.title}</strong> ?
        </p>
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
