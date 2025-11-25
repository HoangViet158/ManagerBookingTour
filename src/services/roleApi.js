import instance from "./axios";

export const getRoles = () => instance.get("/admin/roles");
export const addRole = (data) => instance.post("/admin/roles/add-role", data);
export const updateRole = (id, data) =>
  instance.put(`/admin/roles/${id}`, data);
export const deleteRole = (id) => instance.delete(`/admin/roles/${id}`);
export const getRolePermissions = (id) =>
  instance.get(`/admin/roles/${id}/permissions`);
export const assignPermissions = (id, permission_ids) =>
  instance.post(`/admin/roles/${id}/permissions`, { permission_ids });
