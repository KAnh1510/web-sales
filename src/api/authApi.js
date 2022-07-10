// api/usersApi.js
import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    const url = `/auth`;
    return axiosClient.post(url, data);
  },

  get: () => {
    const url = `/auth`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    return axiosClient.delete(`/auth/${id}`);
  },
};

export default authApi;
