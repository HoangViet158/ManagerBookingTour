import React, { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import "./ResultPaymentPage.scss";
const PaymentResultPage = () => {
  const [status, setStatus] = useState("PENDING"); // default là PENDING
  const [bookingCode, setBookingCode] = useState("");
  const [message, setMessage] = useState(
    "Đang kiểm tra trạng thái thanh toán..."
  );

  // Lấy booking_code từ query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("booking_code");
    if (code) setBookingCode(code);
  }, []);

  // Kiểm tra trạng thái thanh toán mỗi 2 giây
  useEffect(() => {
    console.log(">>> checking payment status for booking:", status);
    if (!bookingCode) return;

    const interval = setInterval(async () => {
      try {
        const res = await adminApi.getStatusPayments(bookingCode);
        const currentStatus = res.status.toUpperCase(); // chuẩn hóa chữ hoa
        setStatus(currentStatus);

        if (currentStatus === "COMPLETED") {
          setMessage("🎉 Thanh toán thành công!");
          clearInterval(interval);
        } else if (currentStatus === "FAILED") {
          setMessage("❌ Thanh toán thất bại hoặc bị hủy.");
          clearInterval(interval);
        } else {
          setMessage("⏳ Thanh toán đang xử lý...");
        }
      } catch (error) {
        setMessage("⚠️ Không thể kiểm tra trạng thái thanh toán.");
        clearInterval(interval);
        console.error("Error checking payment status:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [bookingCode]);

  const handleBackHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="container text-center custom-payment-result">
      <h2>{message}</h2>
      {bookingCode && (
        <p>
          <strong>Booking:</strong> {bookingCode}
        </p>
      )}
      <button className="btn btn-primary mt-3" onClick={handleBackHome}>
        Quay về trang chủ
      </button>
    </div>
  );
};

export default PaymentResultPage;
