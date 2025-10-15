import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import FormatCurrency from "../../hooks/FormatCurrency";
import VinhHaLong from "../../../public/Images/Tu-Hao-Vinh-Ha-Long-.jpg";

const GroupExample = () => {
  return (
    <CardGroup>
      <Card className="me-3 ms-3 custom-card">
        <Card.Img variant="top" src={VinhHaLong} />
        <Card.Body>
          <Card.Title>Vịnh Hạ Long</Card.Title>
          <Card.Text>
            Danh lam thắng cảnh tuyệt đẹp nơi xứ Việt, là vẻ đẹp tinh khôi của
            trời đất ban tặng tại đất nước Việt Nam
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          {/* Bên trái */}
          <div className="text-left">
            <span>Giá từ: </span>
            <h5 className="text-danger">{FormatCurrency(5000000)}</h5>
          </div>

          {/* Bên phải */}
          <button className="btn">
            <small className="text-muted">Xem thêm</small>
          </button>
        </Card.Footer>
      </Card>
      <Card className="me-3 custom-card">
        <Card.Img variant="top" src={VinhHaLong} />
        <Card.Body>
          <Card.Title>Vịnh Hạ Long</Card.Title>
          <Card.Text>
            Danh lam thắng cảnh tuyệt đẹp nơi xứ Việt, là vẻ đẹp tinh khôi của
            trời đất ban tặng tại đất nước Việt Nam
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          {/* Bên trái */}
          <div className="text-left">
            <span>Giá từ: </span>
            <h5 className="text-danger">{FormatCurrency(5000000)}</h5>
          </div>

          {/* Bên phải */}
          <button className="btn">
            <small className="text-muted">Xem thêm</small>
          </button>
        </Card.Footer>
      </Card>
      <Card className="me-3 custom-card">
        <Card.Img variant="top" src={VinhHaLong} />
        <Card.Body>
          <Card.Title>Vịnh Hạ Long</Card.Title>
          <Card.Text>
            Danh lam thắng cảnh tuyệt đẹp nơi xứ Việt, là vẻ đẹp tinh khôi của
            trời đất ban tặng tại đất nước Việt Nam
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          {/* Bên trái */}
          <div className="text-left">
            <span>Giá từ: </span>
            <h5 className="text-danger">{FormatCurrency(5000000)}</h5>
          </div>

          {/* Bên phải */}
          <button className="btn">
            <small className="text-muted">Xem thêm</small>
          </button>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
};

export default GroupExample;
