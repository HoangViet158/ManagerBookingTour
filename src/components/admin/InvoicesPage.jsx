import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import adminApi from "../../services/adminApi"; // API giả sử bạn có
import dayjs from "dayjs";
import FormatCurrency from "../../hooks/FormatCurrency";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await adminApi.getInvoices();
      console.log(res); // giả sử trả về { data: [...] }
      setInvoices(res);
    } catch (err) {
      console.error("Lỗi khi fetch invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleView = (invoice) => {
    alert(`Xem chi tiết Invoice #${invoice.id}`);
    // sau này mở modal hoặc chuyển trang chi tiết
  };

  const handleDelete = (invoice) => {
    if (window.confirm(`Bạn có chắc muốn xóa Invoice #${invoice.id}?`)) {
      setInvoices(invoices.filter((i) => i.id !== invoice.id));
    }
  };

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
              <th>Thuế</th>

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
                <td>{FormatCurrency(inv.tax)}</td>
                <td>{dayjs(inv.issued_at).format("HH:mm:ss DD/MM/YYYY ")}</td>
                <td>{inv.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleView(inv)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(inv)}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
