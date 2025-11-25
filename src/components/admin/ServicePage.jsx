import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import adminApi from "../../services/adminApi";
import FormatCurrency from "../../hooks/FormatCurrency";
import ServiceModal from "./ServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentService, setCurrentService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await adminApi.getServices();
      setServices(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async (service) => {
    await adminApi.createService(service);
    setShowAddModal(false);
    fetchServices();
  };

  const handleEditService = async (service) => {
    await adminApi.updateService(service.id, service);
    setShowEditModal(false);
    fetchServices();
  };

  const handleDeleteService = async () => {
    await adminApi.deleteService(currentService.id);
    setShowDeleteModal(false);
    fetchServices();
  };

  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý Dịch vụ</h2>
        <Button
          variant="success"
          onClick={() => {
            setCurrentService(null);
            setShowAddModal(true);
          }}
        >
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
              {/* <th>Nhà cung cấp</th> */}
              <th className="w-50">Chi tiết</th>
              {/* <th>Giá</th> */}
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.type}</td>
                <td>{service.name}</td>
                {/* <td>{service.provider}</td> */}
                <td>{service.details}</td>
                {/* <td>{FormatCurrency(service.price)}</td> */}
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      setCurrentService(service);
                      setShowEditModal(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setCurrentService(service);
                      setShowDeleteModal(true);
                    }}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modals */}
      <ServiceModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddService}
        service={currentService}
        title="Thêm Dịch vụ"
      />
      <ServiceModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={handleEditService}
        service={currentService}
        title="Sửa Dịch vụ"
      />
      <DeleteServiceModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDeleteService}
        service={currentService}
      />
    </div>
  );
}
