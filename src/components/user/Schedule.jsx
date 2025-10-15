import "./Schedule.scss";
const Schedule = () => {
  const count = [1, 2, 3, 4, 5];
  //   const [isAuth, setIsAuth] = useState(true);
  const handleClickSchedule = () => {
    console.log("Click");
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {/* {isAuth ? "Schedule" : "Vui lòng đăng nhập để sử dụng tính năng này"} */}
      <h4 className="text-center">Lịch trình cá nhân</h4>
      <div className="schedule-container d-flex justify-content-center align-items-center flex-column w-100">
        {count.map((item, index) => (
          <div
            className="card mb-3 card-hover"
            style={{ maxWidth: "70%" }}
            key={index}
            onClick={() => handleClickSchedule()}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img src="..." className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
