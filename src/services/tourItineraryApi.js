import instance from "./axios";

const BASE_URL = "/admin/tour-itineraries";

const tourItineraryApi = {
  // Lấy tất cả lịch trình của 1 tour
  getByTourId: (tourId) => {
    const res = instance.get(`${BASE_URL}/${tourId}`);
    return res;
  },

  // Thêm lịch trình mới
  add: (data) => {
    const res = instance.post(`${BASE_URL}/add-itinerary`, data);
    return res;
  },

  // Cập nhật lịch trình
  update: (id, data) => {
    const res = instance.put(`${BASE_URL}/${id}`, data);
    return res;
  },

  // Xóa lịch trình
  delete: (id) => {
    const res = instance.delete(`${BASE_URL}/${id}`);
    return res;
  },

  // Lấy tất cả (dành cho admin)
  getAll: () => {
    const res = instance.get(BASE_URL);
    return res;
  },
};

export default tourItineraryApi;
