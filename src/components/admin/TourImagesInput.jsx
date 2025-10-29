import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";

export default function TourImagesInput({ images, setImages }) {
  const handleAdd = () => setImages([...images, ""]);
  const handleChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  const handleRemove = (index) =>
    setImages(images.filter((_, i) => i !== index));

  return (
    <div>
      <label>Ảnh tour (URL)</label>
      {images.map((img, i) => (
        <div key={i} className="d-flex align-items-center mb-2">
          <Form.Control
            type="text"
            value={img}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder="Nhập URL ảnh"
          />
          <Button
            variant="danger"
            size="sm"
            className="ms-2"
            onClick={() => handleRemove(i)}
          >
            X
          </Button>
          {img && (
            <Image
              src={img}
              alt=""
              width={80}
              height={50}
              className="ms-2"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      ))}
      <Button variant="success" size="sm" onClick={handleAdd}>
        Thêm ảnh
      </Button>
    </div>
  );
}
