import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaBus } from "react-icons/fa";
import "./ModalBookTour.scss";
import FormatCurrency from "../../hooks/FormatCurrency";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ModalBookTour = (props) => {
  const { tourSchedule, ...modalProps } = props;
  const navigate = useNavigate();
  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thông tin chuyến đi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3>
            {dayjs(tourSchedule.start_date).format("DD/MM/YYYY")}(Còn lại{" "}
            {tourSchedule.seats_total - tourSchedule.seats_booked} chỗ){" "}
          </h3>
        </div>
        <h5 className="text-primary">Phương tiện di chuyển:</h5>
        <div className="d-flex justify-content-between fw-bold">
          <div className="d-flex flex-column">
            <span>
              Ngày đi: {dayjs(tourSchedule.start_date).format("DD/MM/YYYY")}
            </span>
            <span>Giờ khởi hành: 8h30</span>
          </div>
          <div className="timeline text-center">
            <span>Xe khách {<FaBus />}</span>
            <hr style={{ width: "100%", borderTop: "2px solid #0d6efd" }} />
          </div>
          <div className="d-flex flex-column">
            <span>
              Ngày về: {dayjs(tourSchedule.end_date).format("DD/MM/YYYY")}
            </span>
            <span>Giờ về: 8h30</span>
          </div>
        </div>

        <hr />
        {/* Giá */}
        <div className="price-per-person">
          <div className="text-center text-primary">
            <h3>Giá</h3>
          </div>
          <div className="d-flex h5 justify-content-between">
            <div className="border-end border-2 border-muted p-1 fw-bold w-50">
              <span>
                Người lớn{" "}
                <span className="text-secondary fw-normal ">
                  (12 tuổi trở lên)
                </span>
                :{" "}
              </span>
              <span className="text-danger">{FormatCurrency(4000000)}</span>
            </div>
            <div className="fw-bold">
              <span>
                Trẻ em{" "}
                <span className="text-secondary fw-normal ">
                  (dưới 12 tuổi)
                </span>
                :{" "}
              </span>
              <span className="text-danger">{FormatCurrency(2000000)}</span>
            </div>
          </div>
        </div>
        <hr />
        {/* // */}
        {/* Form chọn số lượng */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Chọn ngày khác</Button>
        <Button
          className="btn btn-success"
          onClick={() => navigate("/booking-tour")}
        >
          Đặt ngay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBookTour;
