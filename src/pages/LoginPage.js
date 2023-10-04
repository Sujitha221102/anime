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

const LoginPage = () => {
  let data = [...JSON.parse(localStorage.getItem("data"))];
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors,setErrors]=useState({pass:false})
  const [success, setSuccess] = useState(false);
  const [warn, setWarn] = useState(false);
  const [error, setError] = useState(false)

  const navigate = useNavigate();


  function logined() {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === email && data[i].pwd === pwd) {
        count++;
      }
    }
    if (pwd === "" || email === "") {
      setWarn(true)
    }else if (count >= 1) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      localStorage.setItem("LoggedIn", true);
    }else{
      setError(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setWarn(false);
  };

  function backtoRegister() {
    navigate("/");
  }
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
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have Successfully LoggedIn
        </Alert>
      </Snackbar>
      <Snackbar open={warn} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          No Field Can be Empty
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          email or password is Invalid
        </Alert>
      </Snackbar>
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
