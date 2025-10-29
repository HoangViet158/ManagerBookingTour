import { useState } from "react";
import adminApi from "../../services/adminApi";
import "./register.scss";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await adminApi.register({ email, password });
    console.log(">>> check res: ", res);
  };
  return (
    <div className="register-container">
      <div className="title">Đăng ký</div>
      <form>
        <div className="form-group">
          <label>Họ tên: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập họ tên"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Nhập email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary "
            onClick={handleRegister}
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
