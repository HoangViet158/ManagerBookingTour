import { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
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

  // -------------------- PHÂN TRANG --------------------
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 5; // số item mỗi trang
  const totalPages = Math.ceil(locations.length / locationsPerPage);

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = locations.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // -------------------- FETCH --------------------
  const fetchLocations = async () => {
    try {
      const res = await locationApi.getLocations();
      setLocations(res);
      setCurrentPage(1); // reset trang khi fetch
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
          {currentLocations.map((loc) => (
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

      {/* PHÂN TRANG */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
          />
        </Pagination>
      )}

      {/* MODALS */}
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
