import instance from "./axios";

const BASE_URL = "/admin";

const adminApi = {
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
  addTour: (data) => instance.post(`${BASE_URL}/tours/add-tour`, data),
  getTours: () => instance.get(`${BASE_URL}/tours`),
  updateTour: (id, data) => instance.put(`${BASE_URL}/tours/${id}`, data),
  deleteTour: (id) => instance.delete(`${BASE_URL}/tours/${id}`),
  getTourById: (id) => instance.get(`${BASE_URL}/tours/${id}`),
  // User
  addUser: (data) => instance.post(`${BASE_URL}/users/add-user`, data),
  getUsers: () => instance.get(`${BASE_URL}/users`),
  updateUser: (id, data) => instance.put(`${BASE_URL}/users/${id}`, data),
  deleteUser: (id) => instance.delete(`${BASE_URL}/users/${id}`),

  //Tour Schedule
  getTourSchedulesByTourId: (tourId) =>
    instance.get(`${BASE_URL}/tour-schedules/${tourId}`),
};

export default adminApi;
