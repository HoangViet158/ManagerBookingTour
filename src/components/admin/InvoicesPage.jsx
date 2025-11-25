import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import adminApi from "../../services/adminApi"; // API giả sử bạn có
import dayjs from "dayjs";
import FormatCurrency from "../../hooks/FormatCurrency";
import InvoiceDetailModal from "./InvoiceDetailModal";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [show, setShow] = useState(false);
  const [invoice, setInvoice] = useState({
    invoice_no: "INV202511189547",
    amount: "5000000.00",
    tax: "0.00",
    invoice_status: "issued",
    invoice_date: "2025-11-18T09:19:15.000Z",
    booking_code: "BK112460",
    booking_status: "pending",
    payment_status: "unpaid",
    qty_adults: 1,
    qty_children: 0,
    total_amount: "5000000.00",
    booking_date: "2025-11-18T09:19:15.000Z",
    email: "nhanvien@gmail.com",
    passengers: [
      {
        id: 35,
        full_name: "ASD",
        gender: "",
        birth_date: "2013-11-05T17:00:00.000Z",
        seat_type: "ADULT",
        price: "5000000.00",
      },
    ],
  });
  const fetchInvoices = async () => {
    try {
      const res = await adminApi.getInvoices();
      // console.log(res); giả sử trả về { data: [...] }
      setInvoices(res);
    } catch (err) {
      console.error("Lỗi khi fetch invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoiceById = async (id) => {
    const res = await adminApi.getInvoiceById(id);
    setInvoice(res);
    setShow(true);
  };
  const handleView = (id) => {
    fetchInvoiceById(id);
  };

  // const handleDelete = (invoice) => {
  //   if (window.confirm(`Bạn có chắc muốn xóa Invoice #${invoice.id}?`)) {
  //     setInvoices(invoices.filter((i) => i.id !== invoice.id));
  //   }
  // };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý Invoices</h1>
        {/* <button
          className="btn btn-success"
          onClick={() => alert("Tạo Invoice mới")}
        >
          Thêm Invoice
        </button> */}
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              {/* <th>Thuế</th> */}

              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.invoice_no}</td>
                <td>{inv.customer_name || inv.customer_email}</td>
                <td>{FormatCurrency(inv.amount)}</td>
                {/* <td>{FormatCurrency(inv.tax)}</td> */}
                <td>{dayjs(inv.issued_at).format("HH:mm:ss DD/MM/YYYY ")}</td>
                <td>{inv.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleView(inv.id)}
                  >
                    Chi tiết
                  </button>
                  {/* <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(inv)}
                  >
                    Hủy
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InvoiceDetailModal
        show={show}
        onClose={() => setShow(false)}
        invoice={invoice}
      />
    </div>
  );
}
