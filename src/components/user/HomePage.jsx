import { useEffect, useRef, useState } from "react";
import BannerImage from "../../../public/Images/Adobe Express - file.jpg";
import "./HomePage.scss";
import Select from "react-select";
import DateInput from "../../hooks/DateInput";
import PriceRange from "../../hooks/PriceRange";
import PerfectScrollbar from "perfect-scrollbar";
import useEqualHeight from "../../hooks/useEqualHeight";
import { Link, useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
const HomePage = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(1000000);
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const [vehicleSelected, setVehicleSelected] = useState("");
  const [typeSelected, setTypeSelected] = useState("");
  const [tours, setTours] = useState([
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
    const ps = new PerfectScrollbar(rightRef.current);
    return () => {
      ps.destroy();
    };
  }, []);
  useEffect(() => {
    fetchTours(); // gọi async function
  }, []);

  const fetchTours = async () => {
    try {
      const res = await adminApi.getTours();
      console.log(res);
      setTours(res);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  const handleBtnDetailTour = (id) => {
    navigate(`/detail-tour/${id}`);
  };
  useEqualHeight(leftRef, rightRef);
  const options = [
    { value: "all", label: "Tất cả" },
    { value: "apple", label: "Táo" },
    { value: "banana", label: "Chuối" },
    { value: "orange", label: "Cam" },
  ];
  const handleOnClickType = (value) => {
    if (value === typeSelected) {
      setTypeSelected("");
    } else {
      setTypeSelected(value);
    }
  };
  const handleOnClickVehicle = (value) => {
    if (value === vehicleSelected) {
      setVehicleSelected("");
    } else {
      setVehicleSelected(value);
    }
  };
  const [date, setDate] = useState(today);
  return (
    <div className="home-page">
      <div className="header-content">
        <img className="img-fluid" src={BannerImage} />
      </div>
      <div className="main-content">
        <div ref={leftRef} className="left-content">
          <h1 className="fw-bolder ">Bộ lọc tìm kiếm</h1>
          <div className="departure form-group mb-3">
            <span className="form-group-text fw-bolder" id="basic-addon1">
              Điểm khởi hành
            </span>
            <Select options={options} defaultValue={options[0]} isSearchable />
          </div>
          <div className="destination form-group mb-3">
            <span className="form-group-text fw-bolder" id="basic-addon1">
              Điểm đến
            </span>
            <Select options={options} defaultValue={options[0]} isSearchable />
          </div>
          <div className="date form-group mb-3">
            <span className="form-group-text fw-bolder" id="basic-addon1">
              Ngày bắt đầu
            </span>
            <DateInput value={date} onChange={setDate} />
          </div>
          <div className="tour-type mb-3">
            <span className="fw-bolder"> Dòng Tour</span>
            <div>
              <button
                onClick={() => handleOnClickType("Cao cấp")}
                className={`btn btn-custom ${
                  typeSelected === "Cao cấp" ? "btn-selected" : ""
                }`}
              >
                Cao cấp
              </button>
              <button
                onClick={() => handleOnClickType("Tiêu chuẩn")}
                className={`btn btn-custom ${
                  typeSelected === "Tiêu chuẩn" ? "btn-selected" : ""
                }`}
              >
                Tiêu chuẩn
              </button>
              <button
                onClick={() => handleOnClickType("Giá tốt")}
                className={`btn btn-custom ${
                  typeSelected === "Giá tốt" ? "btn-selected" : ""
                }`}
              >
                Giá tốt
              </button>
              <button
                onClick={() => handleOnClickType("Tiết kiệm")}
                className={`btn btn-custom ${
                  typeSelected === "Tiết kiệm" ? "btn-selected" : ""
                }`}
              >
                Tiết kiệm
              </button>
            </div>
          </div>
          <div className="vehicle mb-3">
            <div>
              <span className="fw-bolder">Phương tiện</span>
            </div>
            <button
              onClick={() => handleOnClickVehicle("Xe khách")}
              className={`btn btn-custom ${
                vehicleSelected === "Xe khách" ? "btn-selected" : ""
              }`}
            >
              Xe khách
            </button>
            <button
              onClick={() => handleOnClickVehicle("Máy bay")}
              className={`btn btn-custom ${
                vehicleSelected === "Máy bay" ? "btn-selected" : ""
              }`}
            >
              Máy bay
            </button>
          </div>
          <div className="price-range form-group mb-3">
            <span className="form-group-text fw-bolder" id="basic-addon1">
              {" "}
              Giá từ:{" "}
            </span>
            <PriceRange price={priceStart} setPrice={setPriceStart} />
          </div>
          <div className="price-range form-group mb-3">
            <span className="form-group-text fw-bolder" id="basic-addon1">
              {" "}
              Giá đến:{" "}
            </span>
            <PriceRange price={priceEnd} setPrice={setPriceEnd} />
          </div>
          <button className="btn btn-primary text-center w-100  ">
            Tìm kiếm
          </button>
        </div>
        <div
          className="right-content"
          ref={rightRef}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          <h2>Tour du lịch</h2>
          {tours.map((tour, index) => (
            <div key={index} className="card mb-3" style={{ width: "100%" }}>
              <img
                className="card-img-top"
                src={BannerImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{tour.title}</h5>
                <p className="card-text">
                  {tour.short_description || "Mô tả ngắn về tour du lịch"}
                </p>
                <button
                  className="me-4 nav-icon btn btn-primary"
                  onClick={() => handleBtnDetailTour(tour.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
