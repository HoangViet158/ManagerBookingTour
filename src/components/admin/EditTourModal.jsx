import { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import tourApi from "../../services/adminApi";

export default function EditTourModal({ show, onHide, onSuccess, tour }) {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    short_description: "",
    price: "",
    duration_days: 1,
    main_location_id: "",
    min_participants: 1,
    max_participants: 10,
  });
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([{}]);
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

  // Khi tour thay đổi → load dữ liệu
  useEffect(() => {
    if (tour) {
      setFormData({
        code: tour.code || "",
        title: tour.title || "",
        short_description: tour.short_description || "",
        price: tour.price || "",
        duration_days: tour.duration_days || 1,
        main_location_id: tour.main_location_id || "",
        min_participants: tour.min_participants || 1,
        max_participants: tour.max_participants || 10,
      });

      // Lấy danh sách ảnh đã có
      tourApi
        .getImages(tour.id)
        .then((res) => {
          setImages(res.map((i) => ({ id: i.id, img: i.img })));
        })
        .catch(console.error);
    }
  }, [tour]);
  // console.log(images);

  const handleSubmit = async () => {
    if (!formData.title || !formData.price)
      return alert("Thiếu thông tin bắt buộc");

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v || ""));
    files.forEach((f) => fd.append("images", f));

    try {
      await tourApi.updateTour(tour.id, fd);
      onSuccess();
      onHide();
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Xác nhận xóa ảnh?")) return;
    try {
      await tourApi.deleteImage(id);
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Sửa Tour</Modal.Title>
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
            <Form.Label>Chọn ảnh mới</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
          </Form.Group>
          <div className="mb-2 d-flex flex-wrap">
            {/* Ảnh đã có */}
            {images.map((img) => (
              <div key={img.id} className="position-relative me-2 mb-2">
                {/* {console.log(`anh: ${import.meta.env.VITE_API_URL}${img.img}`)} */}
                <Image
                  src={`${import.meta.env.VITE_API_URL}${img.img}`}
                  width={120}
                  height={80}
                  style={{ objectFit: "cover" }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0"
                  onClick={() => handleDeleteImage(img.id)}
                >
                  X
                </Button>
              </div>
            ))}

            {/* Ảnh mới chọn */}
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
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
