import React, { useEffect, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import useAuth from "../../hooks/useAuth";
import adminApi from "../../services/adminApi";
import { toast } from "react-toastify";

/**
 * UserInfoForm - form thông tin người dùng
 * - 2 cột trên desktop (col-md-6)
 * - validation cơ bản: required, email format, phone pattern, dob not in future
 */
const ProfileInformation = () => {
  const initial = {
    fullName: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
  };

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const { user } = useAuth();
  const handleChange = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
    // clear error for field while editing
    setErrors((e) => ({ ...e, [field]: undefined }));
    setSuccessMsg("");
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  };
  const fetchUserInfo = async () => {
    if (!user) return;
    if (user?.cus_id) {
      try {
        const res = await adminApi.getCustomerById(user.cus_id);
        if (!res) return;

        setForm({
          fullName: res.full_name ?? "",
          email: res.user_email ?? "",
          dob: formatDate(res.birthday),
          phone: res.phone ?? "",
          address: res.address ?? "",
        });
      } catch (error) {
        console.error("❌ Error loading customer info:", error);
        toast.error("Không thể tải thông tin người dùng");
      }
    }
    if (user?.emp_id) {
      try {
        const res = await adminApi.getEmployeeById(user.emp_id);
        if (!res) return;

        setForm({
          fullName: res.full_name ?? "",
          email: res.user_email ?? "",
          dob: formatDate(res.birthday),
          phone: res.phone ?? "",
          address: res.address ?? "",
        });
      } catch (error) {
        console.error("❌ Error loading customer info:", error);
        toast.error("Không thể tải thông tin người dùng");
      }
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [user]);
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Họ tên là bắt buộc.";
    if (!form.email.trim()) e.email = "Email là bắt buộc.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email không hợp lệ.";
    if (!form.dob && user?.role_id === 2) e.dob = "Ngày sinh là bắt buộc.";
    else {
      const dobDate = new Date(form.dob);
      const now = new Date();
      if (dobDate > now && user?.role_id === 2)
        e.dob = "Ngày sinh không thể ở tương lai.";
    }
    if (!form.phone.trim()) e.phone = "Số điện thoại là bắt buộc.";
    else if (!/^[0-9]{7,15}$/.test(form.phone.replace(/[ \-()+]/g, "")))
      e.phone = "Số điện thoại không hợp lệ (7-15 chữ số).";
    if (!form.address.trim() && user.role_id === 2)
      e.address = "Địa chỉ là bắt buộc.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!validate()) {
      setSuccessMsg("");
      return;
    }
    // xử lý submit (gửi API hoặc xử lý khác)
    // tại đây demo bằng console.log
    const res = adminApi.updateCustomer(user.cus_id, {
      user_id: user.id,
      full_name: form.fullName,
      phone: form.phone,
      birthday: form.dob,
      address: form.address,
    });
    console.log("Submitted user info:", res);
    toast.success("Lưu thông tin thành công!");
  };

  // const handleChangePassword = () => {
  //   // setForm(initial);
  //   // setErrors({});
  //   // setSuccessMsg("");
  // };

  // nhỏ: helper hiển thị class invalid bootstrap
  const invalidClass = (field) => (errors[field] ? "is-invalid" : "");

  return (
    <div className="container my-4" style={{ maxWidth: 800 }}>
      <h4 className="mb-3">Thông tin người dùng</h4>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          {/* Họ tên */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Họ và tên</label>
            <input
              type="text"
              className={`form-control ${invalidClass("fullName")}`}
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className={`form-control ${invalidClass("email")}`}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@example.com"
              disabled
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Ngày sinh */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Ngày sinh</label>
            <input
              type="date"
              className={`form-control ${invalidClass("dob")}`}
              value={form.dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          {/* Số điện thoại */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Số điện thoại</label>
            <input
              type="tel"
              className={`form-control ${invalidClass("phone")}`}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="0912345678"
              inputMode="tel"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          {/* Địa chỉ (full width) */}
          <div className="col-12">
            <label className="form-label fw-bold">Địa chỉ</label>
            <input
              type="text"
              className={`form-control ${invalidClass("address")}`}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Số nhà, đường, phường, quận, thành phố"
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2 justify-content-end mt-4">
          {/* <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </button> */}
          <ChangePasswordModal userId={user?.id} />

          <button type="submit" className="btn btn-primary">
            Lưu thông tin
          </button>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="alert alert-success mt-3" role="alert">
            {successMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInformation;
