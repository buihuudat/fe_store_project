import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";

import authApi from "../api/auth";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneErrText("");
    setPasswordErrText("");

    const data = new FormData(e.target);
    const phone = data.get("phone").trim();
    const password = data.get("password").trim();

    let err = false;

    if (phone === "") {
      err = true;
      setPhoneErrText("Please fill in this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill in this field");
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.signin({ phone, password });
      dispatch(setUser(res.user));
      localStorage.setItem("token", res.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      const errors = error.data.errors;
      errors.forEach((e) => {
        if (e.param === "phone") {
          setPhoneErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <Box
      mt={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: 500,
        m: "0 auto",
      }}
    >
      <Box component={"h1"}>Login</Box>
      <Box component="form" mt={1} noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="phone"
          name="phone"
          label="Phone"
          disabled={loading}
          error={phoneErrText !== ""}
          helperText={phoneErrText}
        />
        <TextField
          fullWidth
          type={"password"}
          margin="normal"
          id="password"
          name="password"
          label="Password"
          disabled={loading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
        Don't have an account? signup
      </Button>
    </Box>
  );
};

export default Signin;
