import instance from "./axios";

const BASE_URL = "/admin";

const adminApi = {
  //Auth
  login: (data) => instance.post(`/auth/login`, data),
  register: (data) => instance.post(`/auth/register`, data),
  // Location
  addLocation: (data) =>
    instance.post(`${BASE_URL}/locations/add-location`, data),
  getLocations: () => instance.get(`${BASE_URL}/locations`),
  updateLocation: (id, data) =>
    instance.put(`${BASE_URL}/locations/${id}`, data),
  deleteLocation: (id) => instance.delete(`${BASE_URL}/locations/${id}`),

  // Service
  createService: (data) =>
    instance.post(`${BASE_URL}/services/add-service`, data),
  getServices: () => instance.get(`${BASE_URL}/services`),
  getServiceById: (id) => instance.get(`${BASE_URL}/services/${id}`),
  updateService: (id, data) => instance.put(`${BASE_URL}/services/${id}`, data),
  deleteService: (id) => instance.delete(`${BASE_URL}/services/${id}`),

  // Tour
  addTour: (data) => instance.post(`${BASE_URL}/tours`, data),
  getTours: () => instance.get(`${BASE_URL}/tours`),
  getTourById: (id) => instance.get(`tours/${id}`),
  updateTour: (id, data) => instance.put(`${BASE_URL}/tours/${id}`, data),
  deleteTour: (id) => instance.delete(`${BASE_URL}/tours/${id}`),
  deleteTourImage: (id) => instance.delete(`${BASE_URL}/tours/images/${id}`),
  getTourImages: (tourId) => instance.get(`${BASE_URL}/tours/${tourId}/images`),
  getTourRandom: (id) => instance.get(`${BASE_URL}/tours/${id}/other-tours`),
  // User
  addUser: (data) => instance.post(`${BASE_URL}/users/add-user`, data),
  getUsers: () => instance.get(`${BASE_URL}/users`),
  updateUser: (id, data) => instance.put(`${BASE_URL}/users/${id}`, data),
  deleteUser: (id) => instance.delete(`${BASE_URL}/users/${id}`),
  getUserById: (id) => instance.get(`${BASE_URL}/users/${id}`),
  ResetPassword: (id) => instance.put(`${BASE_URL}/users/${id}/reset-password`),

  // Employee
  getEmployees: () => instance.get(`${BASE_URL}/employees`),
  getEmployeesWithoutUser: () =>
    instance.get(`${BASE_URL}/employees/unassigned`),
  createEmployee: (data) => instance.post(`${BASE_URL}/employees`, data),
  updateEmployee: (id, data) =>
    instance.put(`${BASE_URL}/employees/${id}`, data),
  deleteEmployee: (id) => instance.delete(`${BASE_URL}/employees/${id}`),
  getEmployeeById: (id) => instance.get(`${BASE_URL}/employees/${id}`),

  // Employee Schedule
  getEmployeeSchedules: () => instance.get(`${BASE_URL}/employee-schedules`),
  getScheduleByEmployeeId: (employeeId) =>
    instance.get(`${BASE_URL}/employee-schedules/employee/${employeeId}`),
  addEmployeeSchedule: (data) =>
    instance.post(`${BASE_URL}/employee-schedules/add`, data),
  updateEmployeeSchedule: (id, data) =>
    instance.put(`${BASE_URL}/employee-schedules/${id}`, data),
  deleteEmployeeSchedule: (id) =>
    instance.delete(`${BASE_URL}/employee-schedules/${id}`),

  // TourImage
  uploadImages: (tourId, formData) =>
    instance.post(`${BASE_URL}/tours/${tourId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteImage: (id) => instance.delete(`${BASE_URL}/tours/images/${id}`),
  getImages: (tourId) => instance.get(`${BASE_URL}/tours/${tourId}/images`),
  // Customer
  getCustomers: () => instance.get(`${BASE_URL}/customers`),
  addCustomer: (data) =>
    instance.post(`${BASE_URL}/customers/add-customer`, data),
  updateCustomer: (id, data) =>
    instance.put(`${BASE_URL}/customers/${id}`, data),
  deleteCustomer: (id, data) =>
    instance.delete(`${BASE_URL}/customers/${id}`, { data }),
  getCustomersWithoutUser: () => instance.get(`${BASE_URL}/customers/no-user`),
  //Tour Schedule
  // 🔹 Lấy tất cả lịch tour
  getAllTourSchedule: () => instance.get(`${BASE_URL}/tour-schedules`),

  // 🔹 Lấy lịch theo tour_id
  getTourScheduleByTourId: (tourId) =>
    instance.get(`${BASE_URL}/tour-schedules/${tourId}`),
  getTourScheduleById: (id) =>
    instance.get(`${BASE_URL}/tour-schedules/get_schedule_by_id/${id}`),

  // 🔹 Thêm lịch tour
  addSchedule: (data) =>
    instance.post(`${BASE_URL}/tour-schedules/add-schedule`, data),
  // data = { tour_id, start_date, end_date, seats_total, seats_booked?, price_per_person?, status? }

  // 🔹 Cập nhật lịch tour
  updateSchedule: (id, data) =>
    instance.put(`${BASE_URL}/tour-schedules/${id}`, data),
  // data = { start_date, end_date, seats_total, seats_booked?, price_per_person?, status? }

  // 🔹 Xóa lịch tour
  deleteSchedule: (id) => instance.delete(`${BASE_URL}/tour-schedules/${id}`),
  // getTourSchedulesByTourId: (tourId) =>
  //   instance.get(`${BASE_URL}/tour-schedules/${tourId}`),

  // đặt tour
  bookingTour: (data) =>
    instance.post(`${BASE_URL}/bookings/create-full`, data),
  // data = { customer_id, schedule_id, custom_tour_id, qty_adults, qty_children, total_amount, note }
  // Invoice
  getInvoices: () => instance.get(`${BASE_URL}/invoices`),

  // permission
  getAllPermission: () => instance.get(`${BASE_URL}/permissions`),
};

export default adminApi;
