import axiosClient from "./axiosClient";

const authApi = {
  signin: (payload) => axiosClient.post("/auth/singin", payload),
  signup: (payload) => axiosClient.post("/auth/signup", payload),
  verifyToken: () => axiosClient.get("/verify-token"),
};

export default authApi;
