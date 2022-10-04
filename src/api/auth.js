import axiosClient from "./axiosClient";

const authApi = {
  signin: (payload) => axiosClient.post("/auth/signin", payload),
  signup: (payload) => axiosClient.post("/auth/signup", payload),
  verifyToken: () => axiosClient.post("/auth/verify-token"),
};

export default authApi;
