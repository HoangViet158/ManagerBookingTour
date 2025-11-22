import { useState } from "react";
import "./Login.scss";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false); // state bật Bootstrap validation
  const navigation = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // HTML5 validation
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await login({ email, password });
      if (res) {
        toast.success("Đăng nhập thành công");
        navigation("/");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (err) {
      toast.error("Đăng nhập thất bại");
      console.log(">>> login err: ", err);
    }
  };

  return (
    <div className="login-container">
      <div className="title">Đăng nhập</div>
      <form
        noValidate
        className={validated ? "was-validated" : ""}
        onSubmit={handleLogin}
      >
        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback">Vui lòng nhập email hợp lệ.</div>
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">
            Vui lòng nhập mật khẩu (ít nhất 6 ký tự).
          </div>
        </div>
        <div className="text-center justify-content-center mt-4">
          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
