import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Schedule.scss";
import useAuth from "../../hooks/useAuth";
import adminApi from "../../services/adminApi";

const Schedule = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // modal state
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await adminApi.getTourScheduleByUserId(user.id); // API mới trả về bookings

        setBookings(res);
      } catch (err) {
        console.error("Lỗi lấy lịch trình:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleClickBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  if (loading)
    return <p className="text-center mt-5">Đang tải lịch trình...</p>;

  if (!bookings.length)
    return <p className="text-center mt-5">Bạn chưa có lịch trình nào.</p>;

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h4 className="text-center mb-4">Lịch trình cá nhân</h4>

      <div className="schedule-container d-flex justify-content-center align-items-center flex-column w-100">
        {bookings.map((booking) => (
          <div
            className="card mb-3 card-hover shadow-sm"
            style={{ maxWidth: "70%", cursor: "pointer" }}
            key={booking.booking_id}
            onClick={() => handleClickBooking(booking)}
          >
            <div className="row g-0">
              {/* <div className="col-md-4">
                <img
                  src="https://picsum.photos/300/200?random=1"
                  className="img-fluid rounded-start"
                  alt={`Tour ${booking.schedule.tour_id}`}
                />
              </div> */}
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">
                    Booking #{booking.booking_code}
                  </h5>
                  <p className="card-text">
                    Tour : {booking.schedule.tour_name} | Giá:{" "}
                    {booking.schedule.price_per_person}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {new Date(
                        booking.schedule.start_date
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(booking.schedule.end_date).toLocaleDateString()}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Trạng thái: {booking.schedule.status} | Chỗ đã đặt:{" "}
                      {booking.schedule.seats_booked}/
                      {booking.schedule.seats_total}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết booking */}
      <Modal
        show={selectedBooking !== null}
        onHide={handleCloseModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Chi tiết Booking #{selectedBooking?.booking_id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <>
              <p>
                <strong>Booking ID:</strong> {selectedBooking.booking_id}
              </p>
              <p>
                <strong>Tour :</strong> {selectedBooking.schedule.tour_name}
              </p>
              <p>
                <strong>Ngày đi:</strong>{" "}
                {new Date(selectedBooking.schedule.start_date).toLocaleString()}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong>{" "}
                {new Date(selectedBooking.schedule.end_date).toLocaleString()}
              </p>
              <p>
                <strong>Giá/Người:</strong>{" "}
                {selectedBooking.schedule.price_per_person}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedBooking.schedule.status}
              </p>
              <p>
                <strong>Chỗ đã đặt / Tổng chỗ:</strong>{" "}
                {selectedBooking.schedule.seats_booked}/
                {selectedBooking.schedule.seats_total}
              </p>
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

export default Schedule;
