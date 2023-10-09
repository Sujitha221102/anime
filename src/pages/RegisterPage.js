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


const RegisterPage = () => {
  
  const navigate = useNavigate();

    function saveBtn() {
      if (password === "" || email === "") {
        setErrorType(alertMsg.warn.key);
      } else {
        setNoOfUsers([...noOfUsers, data]);
        localStorage.setItem(
          "data",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("data") || "[]"),
            { ...data },
          ])
        );
        setErrorType(alertMsg.success.key);
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
    };
    
  const [errors, setErrors] = useState({ pass: false });
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState("");
  const { email, setEmail, noOfUsers, setNoOfUsers } = useAppContext();
  const data = {
    email: email,
    pwd: password,
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
      <MyAlert
        open={errorType}
        onClose={handleClose}
        msg={alertMsg[errorType]?.msg}
        severity={alertMsg[errorType]?.severity}
      />
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



function MyAlert({ open, onClose, msg, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}