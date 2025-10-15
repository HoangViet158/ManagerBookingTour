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
import dayjs from "dayjs";

const DetailTour = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const daySelectionRef = useRef();
  const [modalShow, setModalShow] = useState(false);
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
    const ps = new PerfectScrollbar(daySelectionRef.current, {
      suppressScrollY: true, // tắt scroll dọc
      suppressScrollX: false, // bật scroll ngang
    });
    return () => {
      ps.destroy();
    };
  }, []);
  const fetchTourDetails = async () => {
    const res = await adminApi.getTourById(id);
    setTour(res);
    console.log("res", res);
  };
  const fetchTourSchedules = async () => {
    const res = await adminApi.getTourSchedulesByTourId(id);
    setTourSchedules(res);
    console.log("res schedule", tourSchedules);
    console.log("res schedule", res);
  };
  useEffect(() => {
    fetchTourDetails();
    fetchTourSchedules();
    fetchTourSchedules();
  }, [id]);
  const handleScrollToDays = () => {
    if (daySelectionRef.current) {
      daySelectionRef.current.scrollIntoView({
        behavior: "smooth", // scroll mượt
        block: "start", // scroll tới đầu phần tử
      });
    }
  };
  const Imgs = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
    "https://swiperjs.com/demos/images/nature-6.jpg",
  ];
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
              {Imgs.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
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
              {Imgs.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
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
              <div className="day-container" ref={daySelectionRef}>
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
          <div className="schedule-content">
            <h5 className="text-center mb-3 mt-1">Lịch trình</h5>
            <ul>
              <li>Day 1</li>
              <li>Day 2</li>
              <li>Day 3</li>
              <li>Day 4</li>
            </ul>
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
            <strong className="text-primary fs-4">{tour.main_location}</strong>
          </div>
          <div className="d-flex justify-content-start fs-4">
            {" "}
            Thời gian:{" "}
            <strong className="text-primary">{tour.duration_days}</strong>
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
        <AnotherTour />
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
