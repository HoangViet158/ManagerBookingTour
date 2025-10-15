import { useState } from "react";

function ChangePasswordModal() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.oldPassword) newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ";
    if (!form.newPassword) newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    if (form.newPassword && form.newPassword.length < 6)
      newErrors.newPassword = "Mật khẩu mới phải ít nhất 6 ký tự";
    if (form.newPassword !== form.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 🔥 gọi API đổi mật khẩu ở đây
    console.log("Đổi mật khẩu thành công:", form);

    setSuccessMsg("Đổi mật khẩu thành công!");
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <>
      {/* Nút mở modal */}
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#changePasswordModal"
      >
        Đổi mật khẩu
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="changePasswordModalLabel">
                  Đổi mật khẩu
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Đóng"
                ></button>
              </div>
              <div className="modal-body">
                {successMsg && (
                  <div className="alert alert-success">{successMsg}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Mật khẩu cũ</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.oldPassword ? "is-invalid" : ""
                    }`}
                    value={form.oldPassword}
                    onChange={(e) =>
                      handleChange("oldPassword", e.target.value)
                    }
                  />
                  {errors.oldPassword && (
                    <div className="invalid-feedback">{errors.oldPassword}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mật khẩu mới</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.newPassword ? "is-invalid" : ""
                    }`}
                    value={form.newPassword}
                    onChange={(e) =>
                      handleChange("newPassword", e.target.value)
                    }
                  />
                  {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Nhập lại mật khẩu mới</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordModal;
