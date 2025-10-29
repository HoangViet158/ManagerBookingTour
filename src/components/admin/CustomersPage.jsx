import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import adminApi from "../../services/adminApi"; // giả sử có API
import dayjs from "dayjs";
import ModalCustomer from "./ModalCustomer";
import { validatePhone, validateRequired } from "../../utils/Validate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDeleteCustomer";
const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setModalShowDelete] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Fetch khách hàng
  const fetchCustomers = async () => {
    try {
      const res = await adminApi.getCustomers(); // trả về { data: [...] }
      setCustomers(res);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Mở modal thêm / sửa
  const handleOpenModal = (customer = null) => {
    setCurrentCustomer(customer);
    setShowModal(true);
  };
  const handleOpenModalDelete = (customer = null) => {
    setModalShowDelete(true);
    setCurrentCustomer(customer);
  };

  // Lưu thông tin khách hàng (thêm hoặc sửa)
  const handleSaveCustomer = async () => {
    console.log("Saving customer:", currentCustomer);
    try {
      if (!validatePhone(currentCustomer?.phone)) {
        toast.error("Số điện thoại không hợp lệ");
        return;
      }
      if (!validateRequired(currentCustomer?.full_name)) {
        toast.error("Họ và tên không được để trống");
        return;
      }
      if (!validateRequired(currentCustomer?.birthday)) {
        toast.error("Ngày sinh không được để trống");
        return;
      }
      if (currentCustomer?.id) {
        // update
        await adminApi.updateCustomer(currentCustomer.id, currentCustomer);

        toast.success("Cập nhật khách hàng thành công");
      } else {
        // create
        await adminApi.addCustomer(currentCustomer);
        toast.success("Thêm khách hàng thành công");
      }
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa khách hàng
  const handleDeleteCustomer = async (id, user_id) => {
    await adminApi.deleteCustomer(id, { user_id });
    fetchCustomers();
  };

  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Quản lý Khách hàng</h1>
        <Button variant="success" onClick={() => handleOpenModal()}>
          Thêm khách hàng
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Note</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.full_name}</td>
                <td>{cust.phone}</td>
                <td>{dayjs(cust.birthday).format("DD/MM/YYYY")}</td>
                <td>{cust.gender === "male" ? "Nam" : "Nữ"} </td>
                <td>{cust.address}</td>
                <td>{cust.note === "VIP" ? "Khách VIP" : "Khách thường"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => handleOpenModal(cust)}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleOpenModalDelete(cust)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Modal Thêm / Sửa Khách hàng */}
      <ModalCustomer
        showModal={showModal}
        setShowModal={setShowModal}
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
        handleSaveCustomer={handleSaveCustomer}
      />
      <ModalDelete
        show={showModalDelete}
        onHide={() => setModalShowDelete(false)}
        onConfirm={() =>
          handleDeleteCustomer(currentCustomer.id, currentCustomer.user_id)
        }
        customerDelete={currentCustomer}
      />
    </div>
  );
};

export default CustomersPage;
