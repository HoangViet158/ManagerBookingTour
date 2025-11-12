import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import locationApi from "../../services/adminApi";

export default function AddLocationModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
  });

  const handleSubmit = async () => {
    console.log(formData);
    // if (!formData.name || !formData.country)
    //   return alert("Tên và quốc gia không được để trống");

    try {
      await locationApi.addLocation(formData);
      onSuccess();
      onHide();
      setFormData({ name: "", country: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Thêm thất bại");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Country</Form.Label>
            <Form.Select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            >
              <option value="Việt Nam">Việt Nam</option>
              <option value="Nước ngoài">Nước ngoài</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
