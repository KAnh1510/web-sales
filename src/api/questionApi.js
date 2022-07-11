// api/productApi.js
import axiosClient from "./axiosClient";

const questionsApi = {
  create: (data) => {
    const url = `/question`;
    return axiosClient.post(url, data);
  },

  get: (id) => {
    const url = `/question/${id}`;
    return axiosClient.get(url);
  },

  update: (id, data) => {
    return axiosClient.patch(`/question/${id}`, data);
  },
};

export default questionsApi;
