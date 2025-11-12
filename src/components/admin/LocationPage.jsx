import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import locationApi from "../../services/adminApi";
import AddLocationModal from "./AddLocationModal";
import EditLocationModal from "./EditLocationModal";
import DeleteLocationModal from "./DeleteLocationModal";

export default function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchLocations = async () => {
    try {
      const res = await locationApi.getLocations();
      setLocations(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Quản lý Location</h3>
      <div className="d-flex justify-content-end mb-3">
        <Button
          className="mb-3 btn btn-success"
          onClick={() => setAddModal(true)}
        >
          Thêm Location
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Description</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <td>{loc.id}</td>
              <td>{loc.name}</td>
              <td>{loc.country}</td>
              <td>{loc.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentLocation(loc);
                    setEditModal(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setCurrentLocation(loc);
                    setDeleteModal(true);
                  }}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddLocationModal
        show={addModal}
        onHide={() => setAddModal(false)}
        onSuccess={fetchLocations}
      />

      <EditLocationModal
        show={editModal}
        onHide={() => setEditModal(false)}
        onSuccess={fetchLocations}
        location={currentLocation}
      />

      <DeleteLocationModal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        onSuccess={fetchLocations}
        locationId={currentLocation?.id}
      />
    </div>
  );
}
