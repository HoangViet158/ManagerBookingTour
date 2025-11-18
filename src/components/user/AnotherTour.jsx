import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import FormatCurrency from "../../hooks/FormatCurrency";
import VinhHaLong from "../../../public/Images/Tu-Hao-Vinh-Ha-Long-.jpg";
import adminApi from "../../services/adminApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupExample = (props) => {
  const { tourId } = props;
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const handleBtnDetailTour = (id) => {
    navigate(`/detail-tour/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fetchTour = async () => {
    const res = await adminApi.getTourRandom(tourId);
    setTours(res);
    console.log("other tours", res);
  };
  useEffect(() => {
    fetchTour();
  }, []);
  return (
    <CardGroup>
      {tours.map((tour) => (
        <Card key={tour.id} className="me-3 ms-3 custom-card">
          <Card.Img
            variant="top"
            src={
              tour.img[0]
                ? `${import.meta.env.VITE_API_URL}${tour.img[0]}`
                : VinhHaLong
            }
          />
          <Card.Body>
            <Card.Title>{tour.title}</Card.Title>
            <Card.Text>{tour.short_description}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center">
            {/* Bên trái */}
            <div className="text-left">
              <span>Giá từ: </span>
              <h5 className="text-danger">{FormatCurrency(tour.price)}</h5>
            </div>

            {/* Bên phải */}
            <button className="btn">
              <small
                className="text-muted"
                onClick={() => handleBtnDetailTour(tour.id)}
              >
                Xem thêm
              </small>
            </button>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  );
};

export default GroupExample;
