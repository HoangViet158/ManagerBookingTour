import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import adminApi from "../../services/adminApi";
import dayjs from "dayjs";
import FormatCurrency from "../../hooks/FormatCurrency";
import InvoiceDetailModal from "./InvoiceDetailModal";
import { Pagination } from "react-bootstrap";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [show, setShow] = useState(false);
  const [invoice, setInvoice] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  const fetchInvoices = async () => {
    try {
      const res = await adminApi.getInvoices();
      setInvoices(res);
      setCurrentPage(1); // reset page khi fetch
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

  // Phân trang dữ liệu
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Quản lý Invoices</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.invoice_no}</td>
                <td>{inv.customer_name || inv.customer_email}</td>
                <td>{FormatCurrency(inv.amount)}</td>
                <td>{dayjs(inv.issued_at).format("HH:mm:ss DD/MM/YYYY ")}</td>
                <td>{inv.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleView(inv.id)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
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

      <InvoiceDetailModal
        show={show}
        onClose={() => setShow(false)}
        invoice={invoice}
      />
    </div>
  );
}
