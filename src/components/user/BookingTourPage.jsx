import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdPayments } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import "./BookingTourPage.scss";

const BookingTourPage = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [done, setDone] = useState(false);
  const [adultInfo, setAdultInfo] = useState([
    { name: "", gender: "", dob: "" },
  ]);
  const [childInfo, setChildInfo] = useState([]);

  // cập nhật khi thay đổi số lượng
  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setChildren(value);
    setChildInfo(
      Array.from(
        { length: value },
        (_, i) => childInfo[i] || { name: "", gender: "", dob: "" }
      )
    );
  };

  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setAdults(value);
    setAdultInfo(
      Array.from(
        { length: value },
        (_, i) => adultInfo[i] || { name: "", gender: "", dob: "" }
      )
    );
  };

  // cập nhật thông tin từng khách
  const handleInputChange = (listType, index, field, value) => {
    if (listType === "adult") {
      const updated = [...adultInfo];
      updated[index][field] = value;
      setAdultInfo(updated);
    } else {
      const updated = [...childInfo];
      updated[index][field] = value;
      setChildInfo(updated);
    }
  };

  // xóa hành khách
  const removePerson = (listType, index) => {
    if (listType === "adult") {
      const updated = [...adultInfo];
      updated.splice(index, 1);
      setAdultInfo(updated);
      setAdults(updated.length);
    } else {
      const updated = [...childInfo];
      updated.splice(index, 1);
      setChildInfo(updated);
      setChildren(updated.length);
    }
  };

  const handleConfirmBooking = () => {
    setDone(true);
  };
  return (
    <div className="container my-3">
      <div className="mt-3">
        <Link to="/detail-tour" className="text-decoration-none">
          {" "}
          <FaArrowLeft /> Quay lại
        </Link>
        <h3 className="text-primary mb-4 text-center"> Đặt Tour </h3>
      </div>
      <div className="icon-step d-flex justify-content-center align-items-center gap-5">
        <div className={`icon-circle active ${done ? "bg-success" : ""}`}>
          <AiTwotoneEdit />
        </div>
        <FaArrowRight className="icon-arrow" />
        <div className="icon-circle">
          <MdPayments />
        </div>
        <FaArrowRight className="icon-arrow" />
        <div className="icon-circle">
          <IoMdDoneAll />
        </div>
      </div>

      <div>
        <h5 className="text-primary">Thông tin liên lạc</h5>
        <form className="mb-4">
          <div className="row g-3 fw-bold">
            <div className="col-md-6">
              <label htmlFor="userName">Họ và tên: </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Họ và tên"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Bộ đếm người lớn / trẻ em */}
      <div className="row mb-4">
        <h5 className="text-primary mb-4">Thông tin hành khách</h5>

        <div className="col-md-6">
          <label className="fw-bold">Người lớn:</label>
          <input
            type="number"
            min="1"
            value={adults}
            onChange={handleAdultsChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="fw-bold">Trẻ em:</label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={handleChildrenChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Tổng số */}
      <div className="alert alert-info">
        Tổng số khách: <b>{adults + children}</b> (Người lớn: {adults}, Trẻ em:{" "}
        {children})
      </div>

      {/* Form nhập */}
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {/* Người lớn */}
        {adultInfo.map((person, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-light">
              <h6 className="mb-0">Người lớn {index + 1}</h6>
              {adults > 1 && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removePerson("adult", index)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Họ tên"
                    className="form-control"
                    value={person.name}
                    onChange={(e) =>
                      handleInputChange("adult", index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={person.gender}
                    onChange={(e) =>
                      handleInputChange(
                        "adult",
                        index,
                        "gender",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    value={person.dob}
                    onChange={(e) =>
                      handleInputChange("adult", index, "dob", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Trẻ em */}
        {childInfo.map((person, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-light">
              <h6 className="mb-0">Trẻ em {index + 1}</h6>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removePerson("child", index)}
              >
                <FaTrash />
              </button>
            </div>
            <div className="card-body">
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Họ tên"
                    className="form-control"
                    value={person.name}
                    onChange={(e) =>
                      handleInputChange("child", index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={person.gender}
                    onChange={(e) =>
                      handleInputChange(
                        "child",
                        index,
                        "gender",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    value={person.dob}
                    onChange={(e) =>
                      handleInputChange("child", index, "dob", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút submit */}
      <div className="text-end mt-3">
        <button
          className="btn btn-success px-4"
          onClick={() => handleConfirmBooking()}
        >
          Xác nhận đặt tour
        </button>
      </div>
    </div>
  );
};

export default BookingTourPage;
