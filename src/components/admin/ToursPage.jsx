import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";
import tourApi from "../../services/adminApi";

export default function TourPage() {
  const [tours, setTours] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const data = await tourApi.getTours();
      setTours(data);
    } catch (err) {
      console.error(err);
      alert("Lấy danh sách tour thất bại");
    }
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setShowEdit(true);
  };

  const handleDelete = async (tour) => {
    let msg = `Xác nhận xóa tour "${tour.title}"?`;
    // Lấy danh sách email hoặc ảnh liên quan nếu muốn hiện thêm info
    if (!window.confirm(msg)) return;

    try {
      await tourApi.deleteTour(tour.id);
      setTours(tours.filter((t) => t.id !== tour.id));
    } catch (err) {
      console.error(err);
      alert("Xóa tour thất bại");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý Tour</h1>
        <Button variant="success" onClick={() => setShowAdd(true)}>
          Thêm tour
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Số ngày</th>
            <th>SL tối thiểu</th>
            <th>SL tối đa</th>
            <th>Địa điểm chính</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.code}</td>
              <td>{t.title}</td>
              <td>{t.price}</td>
              <td>{t.duration_days}</td>
              <td>{t.min_participants}</td>
              <td>{t.max_participants}</td>
              <td>{t.main_location}</td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEdit(t)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(t)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modals */}
      <AddTourModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSuccess={fetchTours}
      />
      <EditTourModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        onSuccess={fetchTours}
        tour={selectedTour}
      />
    </div>
  );
}
