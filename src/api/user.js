import axiosClient from "./axiosClient";

const userApi = {
  update: (payload) => axiosClient.put("/user/update", payload),
  delete: (payload) => axiosClient.post("/user/delete", payload),
  getAll: () => axiosClient.get("/user/get-all"),
};

export default userApi;
