import { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import tourApi from "../../services/adminApi";

export default function AddTourModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    short_description: "",
    price: "",
    duration_days: 1,
    main_location_id: "", // mới
    min_participants: 1,
    max_participants: 10,
  });
  const [files, setFiles] = useState([]);
  const [locations, setLocations] = useState([]);

  // Lấy danh sách locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await tourApi.getLocations();
        setLocations(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title || !formData.price)
      return alert("Thiếu thông tin bắt buộc");

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v || ""));
    files.forEach((f) => fd.append("images", f));

    try {
      await tourApi.addTour(fd);
      onSuccess();
      onHide();
      setFiles([]);
      setFormData({
        code: "",
        title: "",
        short_description: "",
        price: "",
        duration_days: 1,
        main_location_id: "",
        min_participants: 1,
        max_participants: 10,
      });
    } catch (err) {
      console.error(err);
      alert("Thêm tour thất bại");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm Tour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Mô tả ngắn</Form.Label>
            <Form.Control
              type="text"
              value={formData.short_description}
              onChange={(e) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Số ngày</Form.Label>
            <Form.Control
              type="number"
              value={formData.duration_days}
              onChange={(e) =>
                setFormData({ ...formData, duration_days: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Location</Form.Label>
            <Form.Select
              value={formData.main_location_id}
              onChange={(e) =>
                setFormData({ ...formData, main_location_id: e.target.value })
              }
            >
              <option value="">Chọn location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Số lượng tối thiểu</Form.Label>
            <Form.Control
              type="number"
              value={formData.min_participants}
              onChange={(e) =>
                setFormData({ ...formData, min_participants: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Số lượng tối đa</Form.Label>
            <Form.Control
              type="number"
              value={formData.max_participants}
              onChange={(e) =>
                setFormData({ ...formData, max_participants: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Chọn ảnh</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
          </Form.Group>

          <div className="mb-2 d-flex flex-wrap">
            {files.map((f, i) => (
              <Image
                key={i}
                src={URL.createObjectURL(f)}
                width={120}
                height={80}
                style={{ objectFit: "cover" }}
                className="me-2 mb-2"
              />
            ))}
          </div>
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
