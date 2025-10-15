import "./Login.scss";
const Login = () => {
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
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="text-center justify-content-center mt-4">
          <button type="submit" className="btn btn-primary ">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
