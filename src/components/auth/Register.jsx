import "./register.scss";
const Register = () => {
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
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
