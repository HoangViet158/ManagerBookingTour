import Logo from "../../../public/Images/Logo.jpg";
import "./Footer.scss";
const Footer = () => {
  const info = [
    { icon: "🌐", label: "Website", value: "novatravel.com" },
    { icon: "📞", label: "Hotline", value: "1900 888 999" },
    { icon: "📧", label: "Email", value: "support@novatravel.com" },
    { icon: "📍", label: "Trụ sở", value: "123 Nguyễn Huệ, Quận 1, TP.HCM" },
  ];
  return (
    <div className="footer-container">
      <div className="left-content">
        <h3>NOVA TRAVEL</h3>
        <img src={Logo}></img>
      </div>
      <div className="center-content">
        <span>
          NOVA Travel tự hào là một trong những đơn vị lữ hành chuyên tổ chức
          các tour trong nước và quốc tế.
        </span>
        <br />
        <span>
          Chúng tôi tin rằng mỗi chuyến đi không chỉ là một kỳ nghỉ, mà còn là
          cơ hội để kết nối, tận hưởng và lưu giữ những khoảnh khắc đáng nhớ.
        </span>
        <br />
        <span>
          NOVA Travel luôn cam kết vận hành với các tiêu chí hàng đầu như sau:
        </span>
        <br />
        <span className="fw-bold ms-5">
          Trải nghiệm khách hàng là ưu tiên số một{" "}
        </span>
        <br />
        <span className="fw-bold ms-5">
          Hành trình chất lượng, chi phí hợp lý{" "}
        </span>
        <br />
        <span className="formatted-text">{`Theo thống kê hằng năm:`}</span>
        <br />
        <span className="formatted-text fw-bold">
          {`          • Hơn 10,000+ khách hàng hài lòng mỗi năm.
          • Hơn 500+ hành trình trong và ngoài nước.
          • Đối tác với hơn 50 khách sạn, resort, hãng bay uy tín.`}
        </span>
        <br />
      </div>
      <div className="right-content">
        <strong>Liên hệ NOVA Travel</strong>
        {"\n"}
        {info.map((item, index) => (
          <div key={index}>
            {item.icon} {item.label}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
