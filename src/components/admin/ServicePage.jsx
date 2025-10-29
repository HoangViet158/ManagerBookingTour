import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import adminApi from "../../services/adminApi"; // file API quản lý admin
import FormatCurrency from "../../hooks/FormatCurrency";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Lấy danh sách dịch vụ
  const fetchServices = async () => {
    try {
      const res = await adminApi.getServices(); // giả định trả về { data: [...] }
      setServices(res);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Mở modal thêm / sửa
  const handleOpenModal = (service = null) => {
    setCurrentService(service);
    setShowModal(true);
  };

  // Lưu dịch vụ (thêm hoặc sửa)
  const handleSave = async () => {
    try {
      if (currentService?.id) {
        await adminApi.updateService(currentService.id, currentService);
      } else {
        await adminApi.createService(currentService);
      }
      setShowModal(false);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa dịch vụ
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này không?")) {
      await adminApi.deleteService(id);
      fetchServices();
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý Dịch vụ</h2>
        <Button variant="success" onClick={() => handleOpenModal()}>
          Thêm Dịch vụ
        </Button>
      </div>

      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Loại dịch vụ</th>
              <th>Tên dịch vụ</th>
              <th>Nhà cung cấp</th>
              <th>Chi tiết</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.type}</td>
                <td>{service.name}</td>
                <td>{service.provider}</td>
                <td>{service.details}</td>
                <td>{FormatCurrency(service.price)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => handleOpenModal(service)}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal thêm/sửa dịch vụ */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentService?.id ? "Sửa Dịch vụ" : "Thêm Dịch vụ"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Loại dịch vụ</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.type || ""}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    type: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên dịch vụ</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.name || ""}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nhà cung cấp</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.provider || ""}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    provider: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chi tiết</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentService?.details || ""}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    details: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServicesPage;
