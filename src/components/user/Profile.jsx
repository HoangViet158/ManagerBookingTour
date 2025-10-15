import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// import "./Profile.scss";

function Profile() {
  const [tabSelected, setTabSelected] = useState("profile");
  const navigate = useNavigate();

  const tabs = ["profile", "schedule", "history"];

  const handleTabClick = (tabName) => {
    if (tabName === "profile") {
      setTabSelected(tabName);
      navigate("/profile");
    } else {
      setTabSelected(tabName);
      navigate(`/profile/${tabName}`);
    }
  };

  return (
    <div className={`container my-4`}>
      <nav>
        <ul className="nav nav-tabs mb-3 pt-3 gap-2" role="tablist">
          {tabs.map((t) => (
            <li
              key={t}
              className={`nav-link ${tabSelected === t ? "active" : ""}`}
            >
              <button
                className={`btn btn-secondary `}
                onClick={() => handleTabClick(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
