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
import DashboardPage from "../components/admin/DashBoard";
import AdminLayout from "../layouts/AdminLayout";
import UsersPage from "../components/admin/UsersPage";
import ToursPage from "../components/admin/ToursPage";
import InvoicesPage from "../components/admin/InvoicesPage";
import EmployeesPage from "../components/admin/EmployeesPage";
import CustomersPage from "../components/admin/CustomersPage";
import ServicesPage from "../components/admin/ServicePage";

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/admin/users" element={<UsersPage />}></Route>
          <Route path="/admin/tours" element={<ToursPage />}></Route>
          <Route path="/admin/invoices" element={<InvoicesPage />}></Route>
          <Route path="/admin/employees" element={<EmployeesPage />}></Route>
          <Route path="/admin/customers" element={<CustomersPage />}></Route>
          <Route path="/admin/services" element={<ServicesPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
