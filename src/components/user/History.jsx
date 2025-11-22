import "./Schedule.scss";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import { Modal, Button } from "react-bootstrap";
const History = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // modal state
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return; // chưa có userId thì không fetch

    const fetchInvoices = async () => {
      try {
        const res = await adminApi.getInvoiceByUserId(user.id); // giả sử API lấy hóa đơn theo user
        console.log(res);
        setSchedules(res);
      } catch (err) {
        console.error("Lỗi lấy lịch trình:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user]);

  const handleClickSchedule = (invoice) => {
    setSelectedInvoice(invoice); // mở modal
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  if (loading)
    return <p className="text-center mt-5">Đang tải lịch trình...</p>;

  if (!schedules) return <p className="text-center mt-5">Bạn đặt tour nào.</p>;

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h4 className="text-center mb-4">Lịch sử đặt tour</h4>

      <div className="schedule-container d-flex justify-content-center align-items-center flex-column w-100">
        {schedules.map((item) => (
          <div
            className="card mb-3 card-hover shadow-sm"
            style={{ maxWidth: "70%", cursor: "pointer" }}
            key={item.invoice_id}
            onClick={() => handleClickSchedule(item)}
          >
            <div className="row g-0">
              {/* <div className="col-md-4">
                <img
                  src="https://picsum.photos/300/200?random=1"
                  className="img-fluid rounded-start"
                  alt={item.booking_code}
                />
              </div> */}
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">{item.booking_code}</h5>
                  <p className="card-text">
                    Tổng tiền: {item.total_amount} | Trạng thái:{" "}
                    {item.invoice_status}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Ngày đặt: {new Date(item.booking_date).toLocaleString()}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Hành khách: {item.passengers.length} người
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết hóa đơn */}
      <Modal
        show={selectedInvoice !== null}
        onHide={handleCloseModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Chi tiết hóa đơn {selectedInvoice?.invoice_no}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <>
              <p>
                <strong>Booking code:</strong> {selectedInvoice.booking_code}
              </p>
              <p>
                <strong>Tour :</strong> {selectedInvoice.title}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {selectedInvoice.total_amount} |{" "}
                <strong>Thuế:</strong> {selectedInvoice.tax}
              </p>
              <p>
                <strong>Trạng thái hóa đơn:</strong>{" "}
                {selectedInvoice.invoice_status}
              </p>
              <p>
                <strong>Trạng thái booking:</strong>{" "}
                {selectedInvoice.booking_status}
              </p>
              <hr />
              <h6>Danh sách hành khách</h6>
              <ul>
                {selectedInvoice.passengers.map((p) => (
                  <li key={p.id}>
                    {p.full_name} - {p.seat_type} - {p.price} - Ngày sinh:{" "}
                    {new Date(p.birth_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default History;
