import { useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";
import tourApi from "../../services/adminApi";
import TourScheduleModal from "./TourScheduleModal";

export default function TourPage() {
  const [tours, setTours] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  // PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 5;

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const data = await tourApi.getTours();
      setTours(data);
      setCurrentPage(1); // reset về trang 1 sau khi lấy dữ liệu
    } catch (err) {
      console.error(err);
      alert("Lấy danh sách tour thất bại");
    }
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setShowEdit(true);
  };
  const handleSchedule = (tour) => {
    setSelectedTour(tour);
    setShowSchedule(true);
  };

  const handleDelete = async (tour) => {
    let msg = `Xác nhận xóa tour "${tour.title}"?`;
    if (!window.confirm(msg)) return;

    try {
      await tourApi.deleteTour(tour.id);
      setTours(tours.filter((t) => t.id !== tour.id));
    } catch (err) {
      console.error(err);
      alert("Xóa tour thất bại");
    }
  };

  // ===== PHÂN TRANG LOGIC =====
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentTours.map((t) => (
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
                  onClick={() => handleSchedule(t)}
                >
                  Lịch trình
                </Button>
                <Button
                  size="sm"
                  variant="warning"
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
      <TourScheduleModal
        show={showSchedule}
        onClose={() => setShowSchedule(false)}
        tour={selectedTour}
      />
    </div>
  );
}
