import { useState } from "react";
import adminApi from "../../services/adminApi";
import "./register.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // male, female, other
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [validated, setValidated] = useState(false); // bootstrap validation
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      email,
      password,
      name: fullName,
      phone,
      birthday: dob,
      gender,
      address,
    };

    try {
      const res = await adminApi.register(payload);
      if (res) {
        toast.success("Đăng ký thành công");
        nav("/login");
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="register-container">
      <div className="title">Đăng ký</div>
      <form
        noValidate
        className={validated ? "was-validated" : ""}
        onSubmit={handleRegister}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label>Họ tên</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Vui lòng nhập họ tên</div>
            </div>
            <div className="form-group mb-3">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="^[0-9\-\+]{9,15}$"
                required
              />
              <div className="invalid-feedback">
                Vui lòng nhập số điện thoại hợp lệ (9-15 chữ số)
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">Vui lòng nhập email hợp lệ</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-3">
              <label>Ngày sinh</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <div className="invalid-feedback">Vui lòng chọn ngày sinh</div>
            </div>
            <div className="form-group mb-3">
              <label>Giới tính</label>
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
              <div className="invalid-feedback">Vui lòng chọn giới tính</div>
            </div>
            <div className="form-group mb-3">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // required
              />
              <div className="invalid-feedback">Vui lòng nhập địa chỉ</div>
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <div className="invalid-feedback">Password phải ít nhất 6 ký tự</div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
