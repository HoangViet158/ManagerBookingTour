import { useState } from "react";
import "./Login.scss";
import adminApi from "../../services/adminApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login payload:", { email, password });

    const res = await adminApi.login({ email: email, password: password });
    console.log(">>> check res: ", res);
  };
  return (
    <div className="login-container">
      <div className="title">Đăng nhập</div>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
