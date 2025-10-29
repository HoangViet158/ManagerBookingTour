import dayjs from "dayjs";
import { Modal, Button, Form } from "react-bootstrap";

const ModalCustomer = (props) => {
  const {
    showModal,
    setShowModal,
    currentCustomer,
    setCurrentCustomer,
    handleSaveCustomer,
  } = props;
  console.log(currentCustomer);
  return (
    <div>
      {/* Modal Thêm / Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentCustomer?.id ? "Sửa Khách hàng" : "Thêm Khách hàng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                value={currentCustomer?.full_name || ""}
                onChange={(e) =>
                  setCurrentCustomer({
                    ...currentCustomer,
                    full_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                value={currentCustomer?.phone || ""}
                onChange={(e) =>
                  setCurrentCustomer({
                    ...currentCustomer,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                value={
                  dayjs(currentCustomer?.birthday).format("YYYY-MM-DD") || ""
                }
                onKeyDown={(e) => e.preventDefault()} // Ngăn chặn nhập liệu thủ công
                onClick={(e) => e.target.showPicker?.()} // Ép mở popup lịch khi focus
                onChange={(e) =>
                  setCurrentCustomer({
                    ...currentCustomer,
                    birthday: e.target.value,
                  })
                }
                style={{
                  cursor: "pointer",
                  caretColor: "transparent", // ẩn con trỏ văn bản
                }}
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giới tính</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={currentCustomer?.gender || ""}
                onChange={(e) =>
                  setCurrentCustomer({
                    ...currentCustomer,
                    gender: e.target.value,
                  })
                }
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                value={currentCustomer?.address || ""}
                onChange={(e) =>
                  setCurrentCustomer({
                    ...currentCustomer,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={currentCustomer?.note || ""}
                onChange={(e) =>
                  setCurrentCustomer({
                    ...currentCustomer,
                    note: e.target.value,
                  })
                }
              >
                {" "}
                <option value="Normal">Khách thường</option>
                <option value="VIP">Khách VIP</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveCustomer}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCustomer;
