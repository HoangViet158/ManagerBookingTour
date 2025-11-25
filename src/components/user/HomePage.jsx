import { useEffect, useRef, useState } from "react";
import BannerImage from "../../../public/Images/Adobe Express - file.jpg";
import "./HomePage.scss";
import Select from "react-select";
import DateInput from "../../hooks/DateInput";
import PriceRange from "../../hooks/PriceRange";
import PerfectScrollbar from "perfect-scrollbar";
import useEqualHeight from "../../hooks/useEqualHeight";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { Pagination } from "react-bootstrap";

const HomePage = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const rightRef = useRef(null);
  const leftRef = useRef(null);

  const [options, setOptions] = useState([]);
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(today);

  const [allTours, setAllTours] = useState([]);
  const [tours, setTours] = useState([]);

  // PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 5;

  const handleSearch = () => {
    let filtered = [...allTours];

    if (searchText.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (departure)
      filtered = filtered.filter((t) => t.main_location_id === departure.value);
    if (destination)
      filtered = filtered.filter((t) => t.destination_id === destination.value);

    filtered = filtered.filter((t) => t.start_dates.some((d) => d >= date));
    filtered = filtered.filter((t) => {
      const p = Number(t.price);
      return p >= priceStart && p <= priceEnd;
    });

    setTours(filtered);
    setCurrentPage(1); // reset trang 1 sau filter
  };

  useEffect(() => {
    const ps = new PerfectScrollbar(rightRef.current);
    return () => ps.destroy();
  }, []);

  useEffect(() => {
    fetchTours();
    fetchLocations();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await adminApi.getTours();
      setAllTours(res);
      setTours(res);

      const maxPrice = Math.max(...res.map((t) => Number(t.price) || 0));
      setPriceMax(maxPrice);
      setPriceStart(0);
      setPriceEnd(maxPrice);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await adminApi.getLocations();
      setOptions(res.map((loc) => ({ value: loc.id, label: loc.name })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnDetailTour = (id) => navigate(`/detail-tour/${id}`);

  useEqualHeight(leftRef, rightRef);

  // ===== PHÂN TRANG LOGIC =====
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-page">
      <div className="header-content">
        <img className="img-fluid" src={BannerImage} />
      </div>

      <div className="main-content">
        {/* ===== LEFT FILTER ===== */}
        <div ref={leftRef} className="left-content">
          <h1 className="fw-bolder">Bộ lọc tìm kiếm</h1>

          {/* TEXT SEARCH */}
          <div className="form-group mb-3">
            <span className="form-group-text fw-bolder">Từ khóa</span>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên tour..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* ĐIỂM KHỞI HÀNH */}
          <div className="departure form-group mb-3">
            <span className="form-group-text fw-bolder">Điểm khởi hành</span>
            <Select
              placeholder="Chọn điểm khởi hành"
              options={options}
              onChange={(v) => setDeparture(v)}
              isSearchable
            />
          </div>

          {/* ĐIỂM ĐẾN */}
          <div className="destination form-group mb-3">
            <span className="form-group-text fw-bolder">Điểm đến</span>
            <Select
              placeholder="Chọn điểm đến"
              options={options}
              onChange={(v) => setDestination(v)}
              isSearchable
            />
          </div>

          {/* NGÀY */}
          <div className="date form-group mb-3">
            <span className="form-group-text fw-bolder">Ngày bắt đầu</span>
            <DateInput value={date} onChange={setDate} />
          </div>

          {/* GIÁ TỪ */}
          <div className="price-range form-group mb-3">
            <span className="form-group-text fw-bolder">Giá từ:</span>
            <PriceRange
              maxPrice={priceMax}
              price={priceStart}
              setPrice={setPriceStart}
            />
          </div>

          {/* GIÁ ĐẾN */}
          <div className="price-range form-group mb-3">
            <span className="form-group-text fw-bolder">Giá đến:</span>
            <PriceRange
              maxPrice={priceMax}
              price={priceEnd}
              setPrice={setPriceEnd}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="btn btn-secondary w-100 mt-2" onClick={fetchTours}>
            Reset bộ lọc
          </button>
        </div>

        {/* ===== RIGHT LIST ===== */}
        <div
          className="right-content"
          ref={rightRef}
          style={{ overflow: "hidden", position: "relative" }}
        >
          <h2>Tour du lịch</h2>

          {currentTours.map((tour, index) => (
            <div key={index} className="card mb-3" style={{ width: "100%" }}>
              <img
                className="card-img-top"
                src={
                  tour.img?.length > 0
                    ? `${import.meta.env.VITE_API_URL}${tour.img[0]}`
                    : BannerImage
                }
                alt="Tour Img"
              />
              <div className="card-body">
                <h5 className="card-title">{tour.title}</h5>
                <p className="card-text">
                  {tour.short_description || "Mô tả ngắn về tour du lịch"}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBtnDetailTour(tour.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Pagination>
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
