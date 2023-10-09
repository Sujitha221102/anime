import React, { useState } from "react";
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

const alertMsg = {
  error: {
    msg: "email or password is Invalid",
    severity: "error",
    key: "error",
  },
  warn: {
    msg: "No Field Can be Empty",
    severity: "warning",
    key: "warn",
  },
  success: {
    msg: "You have Successfully LoggedIn",
    severity: "success",
    key: "success",
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  let data = [...JSON.parse(localStorage.getItem("data"))];

  function logined() {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === email && data[i].pwd === pwd) {
        count++;
      }
    }
    if (pwd === "" || email === "") {
      setErrorType(alertMsg.warn.key);
    } else if (count >= 1) {
      setErrorType(alertMsg.success.key);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      localStorage.setItem("LoggedIn", true);
    } else {
      setErrorType(alertMsg.error.key);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorType("");
  };

  function backtoRegister() {
    navigate("/");
  }

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({ pass: false });
  const [errorType, setErrorType] = useState("");

  return (
    <Box
      component="form"
      sx={{
        width: 280,
        height: 350,
        mx: 60,
        my: 12,
        p: 2,
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#c5d8fc",
        },
        boxShadow: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        borderRadius: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">LOGIN PAGE</Typography>
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e, error) => setErrors((state) => ({ ...state, pass: error }))}
      />
      <PasswordInput
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        onBlur={(e, error) => setErrors((state) => ({ ...state, pass: error }))}
      />
      <Button variant="contained" onClick={logined} disabled={errors.pass}>
        Submit
      </Button>
      <MyAlert
        open={errorType}
        onClose={handleClose}
        msg={alertMsg[errorType]?.msg}
        severity={alertMsg[errorType]?.severity}
      />
      <Typography variant="h6">
        You haven't registered yet!Click register..
      </Typography>
      <Button variant="contained" onClick={backtoRegister}>
        Register
      </Button>
    </Box>
  );
};

export default LoginPage;

function MyAlert({ open, onClose, msg, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
