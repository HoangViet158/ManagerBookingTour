import instance from "./axios";

export const getPermissions = () => instance.get("/admin/permissions");
export const addPermission = (data) =>
  instance.post("/admin/permissions/add-permission", data);
export const updatePermission = (id, data) =>
  instance.put(`/admin/permissions/${id}`, data);
export const deletePermission = (id) =>
  instance.delete(`/admin/permissions/${id}`);
