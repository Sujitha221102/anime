import React, { useState } from "react";
import { useAppContext } from "../customHook/AppContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import PasswordInput from "../components/password-input";
import EmailInput from "../components/email-input";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterPage = () => {
  
  const [errors, setErrors] = useState({ pass: false });
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [warn,setWarn]=useState(false)
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    arr,
    setArr,
  } = useAppContext();
  const data = {
    email: email,
    pwd: password,
  };

  function saveBtn() {
    if (password === "" || email === "") {
      setWarn(true)
    }else{
      setArr([...arr, data]);
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("data") || "[]"),
          { ...data },
        ])
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }
  function loginFn() {
    navigate("/login");
  }
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
      setWarn(false);
  };
  return (
    <Box
      component="form"
      sx={{
        width: 280,
        height: 350,
        mx: 60,
        my: 5,
        p: 2,
        backgroundColor: "white",
        "&:hover": { backgroundColor: "#c5d8fc" },
        boxShadow: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        borderRadius: 2,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" component="h2">
        REGISTER PAGE
      </Typography>
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e, error) => setErrors((state) => ({ ...state, pass: error }))}
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={(e, error) => setErrors((state) => ({ ...state, pass: error }))}
      />
      <Button variant="contained" onClick={saveBtn} disabled={errors.pass}>
        Save
      </Button>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have successfully Registered
        </Alert>
      </Snackbar>
      <Snackbar open={warn} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          No Field Can be Empty
        </Alert>
      </Snackbar>
      <Typography variant="h6">
        If you have already Registered!Click Login..
      </Typography>
      <Button variant="contained" onClick={loginFn}>
        Login
      </Button>
    </Box>
  );
};

export default RegisterPage;
