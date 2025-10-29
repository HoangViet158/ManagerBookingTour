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
  addService: (data) => instance.post(`${BASE_URL}/services/add-service`, data),
  getServices: () => instance.get(`${BASE_URL}/services`),
  updateService: (id, data) => instance.put(`${BASE_URL}/services/${id}`, data),
  deleteService: (id) => instance.delete(`${BASE_URL}/services/${id}`),

  // Tour
  addTour: (data) => instance.post(`${BASE_URL}/tours`, data),
  getTours: () => instance.get(`${BASE_URL}/tours`),
  getTourById: (id) => instance.get(`${BASE_URL}/tours/${id}`),
  updateTour: (id, data) => instance.put(`${BASE_URL}/tours/${id}`, data),
  deleteTour: (id) => instance.delete(`${BASE_URL}/tours/${id}`),
  deleteTourImage: (id) => instance.delete(`${BASE_URL}/tours/images/${id}`),
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
  getTourSchedulesByTourId: (tourId) =>
    instance.get(`${BASE_URL}/tour-schedules/${tourId}`),

  // Invoice
  getInvoices: () => instance.get(`${BASE_URL}/invoices`),

  // permission
  getAllPermission: () => instance.get(`${BASE_URL}/permissions`),
};

export default adminApi;
