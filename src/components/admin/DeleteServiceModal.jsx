import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteServiceModal({
  show,
  onHide,
  onDelete,
  service,
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa Dịch vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa dịch vụ "{service?.name}" không?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
