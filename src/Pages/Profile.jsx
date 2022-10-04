import React from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import userApi from "../api/user";
import { setUser } from "../redux/reducers/user";
import Noti from "../components/common/Noti";

const Profile = () => {
  const [hidden, setHidden] = useState(true);
  const [fullnameErrText, setFullnameErrText] = useState("");
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      _id: user._id,
      fullname: formData.get("fullname") || user.fullname,
      phone: formData.get("phone") || user.phone,
      password: formData.get("password") || user.password,
      confirmPassword: formData.get("confirmPassword"),
    };

    let err = false;
    if (data.fullname === "") {
      err = true;
      setFullnameErrText("Invalid your name");
    }
    if (data.phone.length < 10 || data.phone.length > 11) {
      err = true;
      setPhoneErrText("Invalid your phone number");
    }
    if (data.password === "") {
      err = true;
      setPhoneErrText("password must be least 8 character");
    }
    if (data.confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("confirmPassword must be least 8 character");
    }
    if (data.password !== data.confirmPassword) {
      setConfirmPasswordErrText("Password not match");
      err = true;
    }

    if (err) return;
    setPhoneErrText("");
    setFullnameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    try {
      const user = await userApi.update(data);
      dispatch(setUser(user));
      Noti("success", "update successfully");
      setHidden(true);
    } catch (error) {
      const errors = error.data.errors;
      Noti("error", "update failure");
      errors.map((e) => {
        if (e.param === "phone") {
          setPhoneErrText(e.msg);
        }
      });
    }
  };
  return (
    user._id && (
      <Container
        sx={{
          p: 5,
        }}
      >
        <Typography fontWeight={600} align="center" variant="h4">
          {user.fullname}
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            margin="normal"
            name="fullname"
            label="Fullname"
            defaultValue={user.fullname}
            error={fullnameErrText !== ""}
            helperText={fullnameErrText}
          />
          <TextField
            margin="normal"
            name="phone"
            label="Phone"
            defaultValue={user.phone}
            error={phoneErrText !== ""}
            helperText={phoneErrText}
          />
          <TextField
            margin="normal"
            name="password"
            label="Password"
            type={"password"}
            defaultValue={user.password}
            error={passwordErrText !== ""}
            helperText={passwordErrText}
          />
          {!hidden && (
            <TextField
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              type={"password"}
              defaultValue={user.password}
              error={confirmPasswordErrText !== ""}
              helperText={confirmPasswordErrText}
            />
          )}
          {!hidden && (
            <Box>
              <Button
                sx={{ mt: 3, mb: 3 }}
                fullWidth
                color="warning"
                variant="contained"
                onClick={() => setHidden(true)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                color={"success"}
                variant="contained"
                type={"submit"}
              >
                Update
              </Button>
            </Box>
          )}
          {hidden && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setHidden(false)}
            >
              Edit
            </Button>
          )}
        </Box>
      </Container>
    )
  );
};

export default Profile;
