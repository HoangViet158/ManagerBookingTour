import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./DetailTour.scss";
import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules"; // ✅ đúng cách cho Swiper >=10
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import FormatCurrency from "../../hooks/FormatCurrency";
import PerfectScrollbar from "perfect-scrollbar";
import ModalBookTour from "./ModalBookTour";
import AnotherTour from "./AnotherTour";
import { useParams } from "react-router-dom";
import adminApi from "../../services/adminApi";
import tourItineraryApi from "../../services/tourItineraryApi";
import dayjs from "dayjs";

const DetailTour = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const daySelectionRef = useRef();
  const [modalShow, setModalShow] = useState(false);
  const [tourItineraries, setTourItineraries] = useState([]);
  const [scheduleSelected, setScheduleSelected] = useState({
    id: "",
    tour_id: "",
    start_date: "",
    end_date: "",
    seats_total: 0,
    seats_booked: 0,
    price_per_person: 0,
    status: "",
    created_at: "",
    updated_at: "",
  });
  const [tourSchedules, setTourSchedules] = useState([]);
  const [img, setImg] = useState([]);
  const [tour, setTour] = useState([
    {
      id: "",
      code: "",
      created_at: "",
      duration_days: 0,
      duration_nights: 0,
      main_location: "",
      main_location_id: "",
      max_participants: 0,
      min_participants: 0,
      price: "0",
      short_description: "",
      status: "",
      title: "",
      updated_at: "",
    },
  ]);
  useEffect(() => {
    if (daySelectionRef.current) {
      const ps = new PerfectScrollbar(daySelectionRef.current, {
        suppressScrollY: true,
        wheelPropagation: true,
      });
      return () => ps.destroy();
    }
  }, []);
  const fetchTourDetails = async () => {
    const res = await adminApi.getTourById(id);
    const data = await adminApi.getTourImages(id);
    setTour(res);
    setImg(data);
  };
  const fetchTourSchedules = async () => {
    const res = await adminApi.getTourScheduleByTourId(id);
    setTourSchedules(
      res.filter((schedule) => new Date(schedule.start_date) >= new Date())
    );
  };
  const fetchTourItineraries = async () => {
    const res = await tourItineraryApi.getByTourId(id);
    // console.log("itinerary", res);
    setTourItineraries(res);
  };
  useEffect(() => {
    fetchTourDetails();
    fetchTourSchedules();
    fetchTourSchedules();
    fetchTourItineraries();
  }, [id]);
  const handleScrollToDays = () => {
    const offset = 100; // số px muốn scroll thêm
    window.scrollBy({
      top: offset,
      behavior: "smooth", // scroll mượt
    });
  };

  const handleSelecteDay = (tourSchedule) => {
    setModalShow(true);
    setScheduleSelected(tourSchedule);
  };
  return (
    <div>
      <div className="title-tour text-center my-4">
        <h3>Title Tour</h3>
      </div>
      <div className="detail-tour">
        <div className="left-content">
          <div className="illustration">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={10}
              slidesPerView={1} // mỗi lần hiển thị 1 ảnh
              slidesPerGroup={1} // mỗi lần cuộn 1 ảnh
              loop={true} // vòng lặp vô hạn
            >
              {img.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${img.img}`}
                    alt={`Slide ${index}`}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Slider thumbnail */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4} // hiển thị 4 thumbnail
              watchSlidesProgress
              loop={true}
              style={{ marginTop: "10px" }}
            >
              {img.map((i, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${i.img}`}
                    alt={`Thumb ${index}`}
                    style={{
                      width: "100px",
                      height: "60px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="departure-time-tour">
            {" "}
            <div>
              <span>
                <strong>Thời gian khởi hành: </strong>
              </span>
              <div className="day-container">
                {tourSchedules.map((tourSchedule, index) => (
                  <button
                    key={index}
                    className={`btn btn-day btn-light me-3`}
                    onClick={() => handleSelecteDay(tourSchedule)}
                  >
                    {dayjs(tourSchedule.start_date).format("DD/MM/YYYY")}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="schedule-content ms-3">
            <h5 className="text-center mb-3 mt-1">Lịch trình</h5>
            <div className="accordion" id="tourItineraryAccordion">
              {tourItineraries.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${
                        index !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      <span>
                        <strong>
                          {"Ngày " +
                            item.day_number +
                            " : " +
                            item.location_name}
                        </strong>
                        <br />
                        <small className="text-muted">{item.title}</small>
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#tourItineraryAccordion"
                  >
                    <div className="accordion-body">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-content">
          <h3> Giá: </h3>
          <div>
            <span className="price-tour"> {FormatCurrency(tour.price)}</span>
            <strong>/khách</strong>
          </div>
          <div className="d-flex justify-content-start fs-4">
            Mã Tour: <strong className="text-primary">{tour.code}</strong>
          </div>
          <div className="d-flex justify-content-start fs-4">
            Khởi hành:{" "}
            <strong className="text-primary fs-4">{tour.location_name}</strong>
          </div>
          <div className="d-flex justify-content-start fs-4">
            {" "}
            Thời gian:{" "}
            <strong className="text-primary">{tour.duration_days} ngày</strong>
          </div>
          {/* <div className="d-flex justify-content-start fs-4">
            {" "}
            Số chỗ còn lại:{" "}
            <strong className="text-primary">{tour.max_participants}</strong>
          </div> */}
          <div>
            <button
              className="btn btn-primary ms-2 me-2"
              onClick={() => handleScrollToDays()}
            >
              Chọn ngày khởi hành
            </button>
          </div>
        </div>
      </div>

      <div className="another-tour mb-3">
        <h5 className="text-center">Các chương trình khác</h5>
        <AnotherTour tourId={tour.id} />
      </div>
      <ModalBookTour
        tourSchedule={scheduleSelected}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
export default DetailTour;
