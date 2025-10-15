import HomePage from "../components/user/HomePage";
import Login from "../components/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Register from "../components/auth/Register";
import DetailTour from "../components/user/DetailTour";
import BookingTourPage from "../components/user/BookingTourPage";
import Schedule from "../components/user/Schedule";
import Profile from "../components/user/Profile";
import History from "../components/user/History";
import ProfileInformation from "../components/user/ProfileInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail-tour/:id" element={<DetailTour />} />
          <Route path="/booking-tour" element={<BookingTourPage />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileInformation />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="history" element={<History />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
