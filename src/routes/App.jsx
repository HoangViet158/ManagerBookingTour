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
import LocationPage from "../components/admin/LocationPage";
import { AuthProvider } from "../hooks/AuthContext";
import PaymentResultPage from "../components/user/ResultPaymentPage";
import AdminRoute, { LoginRouter } from "../components/auth/AdminRoute";
import RevenueChart from "../components/admin/StatePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/login"
              element={
                <LoginRouter>
                  <Login />
                </LoginRouter>
              }
            />
            <Route
              path="/register"
              element={
                <LoginRouter>
                  <Register />
                </LoginRouter>
              }
            />
            <Route path="/detail-tour/:id" element={<DetailTour />} />
            <Route path="/booking-tour/:id" element={<BookingTourPage />} />
            <Route path="/payment-result" element={<PaymentResultPage />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileInformation />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="history" element={<History />} />
            </Route>
          </Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="/admin/users" element={<UsersPage />}></Route>
            <Route path="/admin/tours" element={<ToursPage />}></Route>
            <Route path="/admin/invoices" element={<InvoicesPage />}></Route>
            <Route path="/admin/employees" element={<EmployeesPage />}></Route>
            <Route path="/admin/customers" element={<CustomersPage />}></Route>
            <Route path="/admin/services" element={<ServicesPage />}></Route>
            <Route path="/admin/locations" element={<LocationPage />}></Route>
            <Route path="/admin/stats" element={<RevenueChart />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
