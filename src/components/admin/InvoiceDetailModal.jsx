import React from "react";

const InvoiceDetailModal = ({ show, onClose, invoice }) => {
  if (!invoice) return null;

  console.log(invoice);
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content rounded-4 shadow">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Chi tiết hóa đơn</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* THÔNG TIN HÓA ĐƠN */}
            <h5 className="border-bottom pb-2">Thông tin hóa đơn</h5>
            <div className="row mt-3">
              <div className="col-md-6">
                <b>Mã hóa đơn:</b> {invoice.invoice_no}
              </div>
              <div className="col-md-6">
                <b>Ngày xuất:</b>{" "}
                {new Date(invoice.invoice_date).toLocaleString()}
              </div>
              <div className="col-md-6">
                <b>Trạng thái:</b> {invoice.invoice_status}
              </div>
              <div className="col-md-6">
                <b>Thuế:</b> {invoice.tax}
              </div>
              <div className="col-md-6">
                <b>Tổng tiền:</b> {invoice.amount}
              </div>
            </div>

            {/* THÔNG TIN BOOKING */}
            <h5 className="border-bottom pb-2 mt-4">Thông tin đặt tour</h5>
            <div className="row mt-3">
              <div className="col-md-6">
                <b>Mã booking:</b> {invoice.booking_code}
              </div>
              <div className="col-md-6">
                <b>Ngày đặt:</b>{" "}
                {new Date(invoice.booking_date).toLocaleString()}
              </div>
              <div className="col-md-6">
                <b>Trạng thái booking:</b> {invoice.booking_status}
              </div>
              {/* <div className="col-md-6">
                <b>Thanh toán:</b> {invoice.payment_status}
              </div> */}
              <div className="col-md-6">
                <b>Email:</b> {invoice.email}
              </div>
              <div className="col-md-6">
                <b>Người lớn:</b> {invoice.qty_adults}
              </div>
              <div className="col-md-6">
                <b>Trẻ em:</b> {invoice.qty_children}
              </div>
              <div className="col-md-6">
                <b>Tổng tiền:</b> {invoice.total_amount}
              </div>
            </div>

            {/* HÀNH KHÁCH */}
            <h5 className="border-bottom pb-2 mt-4">Danh sách hành khách</h5>

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-light">
                  <tr>
                    <th>Họ tên</th>
                    {/* <th>Giới tính</th> */}
                    <th>Ngày sinh</th>
                    <th>Loại vé</th>
                    <th>Giá vé</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.passengers?.map((p) => (
                    <tr key={p.id}>
                      <td>{p.full_name}</td>
                      {/* <td>{p.gender || "Không có"}</td> */}
                      <td>{new Date(p.birth_date).toLocaleDateString()}</td>
                      <td>{p.seat_type}</td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailModal;
