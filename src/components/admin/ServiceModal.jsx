import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const serviceTypes = ["restaurant", "hotel", "transport"];

export default function ServiceModal({ show, onHide, onSave, service, title }) {
  const [formData, setFormData] = useState({
    type: service?.type || "",
    name: service?.name || "",
    provider: service?.provider || "",
    details: service?.details || "",
    price: service?.price || "",
    id: service?.id || null,
  });

  useEffect(() => {
    setFormData({
      type: service?.type || "",
      name: service?.name || "",
      provider: service?.provider || "",
      details: service?.details || "",
      price: service?.price || "",
      id: service?.id || null,
    });
  }, [service]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Loại dịch vụ</Form.Label>
            <Form.Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="">Chọn loại dịch vụ</option>
              {serviceTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tên dịch vụ</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>
          {/* 
          <Form.Group className="mb-3">
            <Form.Label>Nhà cung cấp</Form.Label>
            <Form.Control
              type="text"
              value={formData.provider}
              onChange={(e) =>
                setFormData({ ...formData, provider: e.target.value })
              }
            />
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Chi tiết</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={() => onSave(formData)}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
