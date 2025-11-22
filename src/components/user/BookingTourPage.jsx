import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdPayments } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import "./BookingTourPage.scss";
import { toast } from "react-toastify";
import adminApi from "../../services/adminApi";
import useAuth from "../../hooks/useAuth";

const BookingTourPage = () => {
  const id = useParams().id;
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const totalPrice = useRef(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [done, setDone] = useState(false);
  const [adultInfo, setAdultInfo] = useState([
    { name: "", gender: "", dob: "" },
  ]);
  const [childInfo, setChildInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({}); // lưu lỗi validate

  useEffect(() => {
    fetchTourSchedule();
  }, []);
  const fetchInfo = async (user) => {
    if (!user) return;
    if (user.cus_id) {
      const res = await adminApi.getCustomerById(user.cus_id);
      console.log(res);
      setContactInfo({
        name: res.full_name,
        email: res.user_email,
        phone: res.phone,
        address: res.address || "",
      });
    }
    if (user.emp_id) {
      const res = await adminApi.getEmployeeById(user.emp_id);
      console.log(res);
      setContactInfo({
        name: res.full_name,
        email: res.user_email,
        phone: res.phone,
        address: res.address || "",
      });
    }
  };
  useEffect(() => {
    console.log(user);
    fetchInfo(user);
  }, [user]);
  useEffect(() => {
    totalPrice.current =
      adultInfo.length * adultPrice + childInfo.length * childPrice;
    console.log("Total updated:", totalPrice.current);
  }, [adultInfo, childInfo]);
  const fetchTourSchedule = async () => {
    console.log(">>> id: ", id);
    const res = await adminApi.getTourScheduleById(id);
    setSchedule(res);
    setAdultPrice(res.price_per_person);
    setChildPrice(res.price_per_person * 0.5);
    totalPrice.current = res.price_per_person;
  };
  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value + adults > schedule.seats_total - schedule.seats_booked) {
      toast.error("Số lượng khách vượt quá số chỗ còn lại của tour!");
      return;
    }
    setChildren(value);
    setChildInfo(
      Array.from(
        { length: value },
        (_, i) => childInfo[i] || { name: "", gender: "", dob: "" }
      )
    );
  };
  const getYearsAgo = (years) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - years);
    return d.toISOString().split("T")[0];
  };
  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value + children > schedule.seats_total - schedule.seats_booked) {
      toast.error("Số lượng khách vượt quá số chỗ còn lại của tour!");
      return;
    }
    setAdults(value);
    setAdultInfo(
      Array.from(
        { length: value },
        (_, i) => adultInfo[i] || { name: "", gender: "", dob: "" }
      )
    );
  };

  const handleInputChange = (listType, index, field, value) => {
    if (listType === "adult") {
      const updated = [...adultInfo];
      updated[index][field] = value;
      setAdultInfo(updated);
      setErrors((prev) => ({ ...prev, [`adult-${index}-${field}`]: false }));
    } else if (listType === "child") {
      const updated = [...childInfo];
      updated[index][field] = value;
      setChildInfo(updated);
      setErrors((prev) => ({ ...prev, [`child-${index}-${field}`]: false }));
    } else if (listType === "contact") {
      setContactInfo({ ...contactInfo, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

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

  const handleConfirmBooking = async () => {
    let newErrors = {};

    // validate contact info
    ["name", "email", "phone", "address"].forEach((field) => {
      if (!contactInfo[field]) newErrors[field] = true;
    });

    // validate adult info
    adultInfo.forEach((person, index) => {
      ["name", "gender", "dob"].forEach((field) => {
        if (!person[field]) newErrors[`adult-${index}-${field}`] = true;
      });
    });

    // validate child info
    childInfo.forEach((person, index) => {
      ["name", "gender", "dob"].forEach((field) => {
        if (!person[field]) newErrors[`child-${index}-${field}`] = true;
      });
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setErrors({});
    // Ghép passengers adult + child
    const passengers = [
      ...adultInfo.map((p) => ({
        full_name: p.name,
        gender: p.gender,
        birth_date: p.dob,
        passport_number: p.passport || null,
        seat_type: "ADULT",
        price: adultPrice, // giá 1 người lớn
      })),
      ...childInfo.map((p) => ({
        full_name: p.name,
        gender: p.gender,
        birth_date: p.dob,
        passport_number: p.passport || null,
        seat_type: "CHILD",
        price: childPrice, // giá 1 trẻ em
      })),
    ];
    console.log("Passengers:", totalPrice.current, passengers);
    if (!user?.id) {
      return;
    }
    // Tạo payload gửi API
    const payload = {
      user_id: user.id, // hoặc contactInfo.id nếu có
      schedule_id: id,
      custom_tour_id: null,
      qty_adults: adults,
      qty_children: children,
      total_amount: totalPrice.current,
      note: contactInfo.note || "",
      passengers: passengers,
    };

    try {
      toast.info("Đang xử lý đặt tour...");

      const res = await adminApi.bookingTour(payload);

      if (!res) {
        toast.error(res.message || "Đặt tour thất bại!");
        return;
      }

      // Thành công
      toast.success("Đang chuyển sang thanh toán MoMo...");
      // console.log(">>> Booking response:", res);

      // 6️⃣ Redirect sang MoMo
      window.location.href = res.payUrl;
      // console.log("Booking created:", res);
      setDone(true);

      // Optional điều hướng
      // nav(`/booking-success/${data.booking_id}`);
    } catch (err) {
      console.error("❌ Booking error:", err);
      toast.error("Lỗi kết nối server!");
    }
  };

  const getClass = (fieldKey) =>
    errors[fieldKey] ? "form-control is-invalid" : "form-control";

  return (
    <div className="container my-3">
      <div className="mt-3">
        <Link
          to={schedule ? `/detail-tour/${schedule.tour_id}` : "/"}
          className="text-decoration-none"
        >
          <FaArrowLeft /> Quay lại
        </Link>
        <h3 className="text-primary mb-4 text-center">Đặt Tour</h3>
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

      {/* Thông tin liên lạc */}
      <div>
        <h5 className="text-primary">Thông tin liên lạc</h5>
        <form className="mb-4">
          <div className="row g-3 fw-bold">
            <div className="col-md-6">
              <label>Họ và tên</label>
              <input
                type="text"
                className={getClass("name")}
                value={contactInfo.name}
                onChange={(e) =>
                  handleInputChange("contact", null, "name", e.target.value)
                }
                disabled
              />
              {errors.name && (
                <div className="invalid-feedback">Vui lòng nhập họ tên</div>
              )}
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                className={getClass("email")}
                value={contactInfo.email}
                onChange={(e) =>
                  handleInputChange("contact", null, "email", e.target.value)
                }
                disabled
              />
              {errors.email && (
                <div className="invalid-feedback">Vui lòng nhập email</div>
              )}
            </div>
            <div className="col-md-6">
              <label>Số điện thoại</label>
              <input
                type="tel"
                className={getClass("phone")}
                value={contactInfo.phone}
                onChange={(e) =>
                  handleInputChange("contact", null, "phone", e.target.value)
                }
                disabled
              />
              {errors.phone && (
                <div className="invalid-feedback">
                  Vui lòng nhập số điện thoại
                </div>
              )}
            </div>
            <div className="col-md-6">
              <label>Địa chỉ</label>
              <input
                type="text"
                className={getClass("address")}
                value={contactInfo.address}
                onChange={(e) =>
                  handleInputChange("contact", null, "address", e.target.value)
                }
                disabled
              />
              {errors.address && (
                <div className="invalid-feedback">Vui lòng nhập địa chỉ</div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Bộ đếm */}
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

      {/* Form người lớn */}
      <div
        style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}
      >
        {adultInfo.map((person, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-light">
              <h6 className="mb-0">Người lớn {index + 1}</h6>
              {adults > 1 && (
                <button
                  type="button"
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
                    className={getClass(`adult-${index}-name`)}
                    value={person.name}
                    onChange={(e) =>
                      handleInputChange("adult", index, "name", e.target.value)
                    }
                  />
                  {errors[`adult-${index}-name`] && (
                    <div className="invalid-feedback">Vui lòng nhập họ tên</div>
                  )}
                </div>
                <div className="col-md-3">
                  <select
                    className={getClass(`adult-${index}-gender`)}
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
                  {errors[`adult-${index}-gender`] && (
                    <div className="invalid-feedback">
                      Vui lòng chọn giới tính
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className={getClass(`adult-${index}-dob`)}
                    value={person.dob}
                    max={getYearsAgo(12)}
                    onChange={(e) =>
                      handleInputChange("adult", index, "dob", e.target.value)
                    }
                  />
                  {errors[`adult-${index}-dob`] && (
                    <div className="invalid-feedback">
                      Vui lòng chọn ngày sinh
                    </div>
                  )}
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
                type="button"
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
                    className={getClass(`child-${index}-name`)}
                    value={person.name}
                    onChange={(e) =>
                      handleInputChange("child", index, "name", e.target.value)
                    }
                  />
                  {errors[`child-${index}-name`] && (
                    <div className="invalid-feedback">Vui lòng nhập họ tên</div>
                  )}
                </div>
                <div className="col-md-3">
                  <select
                    className={getClass(`child-${index}-gender`)}
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
                  {errors[`child-${index}-gender`] && (
                    <div className="invalid-feedback">
                      Vui lòng chọn giới tính
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className={getClass(`child-${index}-dob`)}
                    value={person.dob}
                    min={getYearsAgo(13)}
                    max={getYearsAgo(0)}
                    onChange={(e) =>
                      handleInputChange("child", index, "dob", e.target.value)
                    }
                  />
                  {errors[`child-${index}-dob`] && (
                    <div className="invalid-feedback">
                      Vui lòng chọn ngày sinh
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end mt-3">
        {/* Nút mở modal */}
        <button
          type="button"
          className="btn btn-success px-4"
          data-bs-toggle="modal"
          data-bs-target="#confirmBookingModal"
        >
          Xác nhận thông tin
        </button>
      </div>

      {/* Modal Bootstrap */}
      <div
        className="modal fade"
        id="confirmBookingModal"
        tabIndex="-1"
        aria-labelledby="confirmBookingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="confirmBookingModalLabel">
                Xác nhận thông tin đặt tour
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Người lớn:</span>
                <span>
                  {adultInfo.length} x {adultPrice.toLocaleString()}đ
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Trẻ em:</span>
                <span>
                  {childInfo.length} x {childPrice.toLocaleString()}đ
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 text-danger">
                <span>Tổng tiền:</span>
                <span>{totalPrice.current.toLocaleString()}đ</span>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirmBooking}
                data-bs-dismiss="modal"
              >
                Xác nhận đặt tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTourPage;
