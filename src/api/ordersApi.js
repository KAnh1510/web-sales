// api/productApi.js
import axiosClient from "./axiosClient";

const ordersApi = {
  create: (data) => {
    const url = `/orders`;
    return axiosClient.post(url, data);
  },

  getAll: (params) => {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  update: (id, data) => {
    return axiosClient.patch(`/orders/${id}`, data);
  },
};

export default ordersApi;
