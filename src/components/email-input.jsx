import { FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";

let errMsgs = {
  emptyField: "Please fill Email",
  wrongPwd: "Enter Valid Email format",
};

let emailValidation = /^[\w]+@[a-zA-Z\d]+\.[a-zA-Z]{2,}$/;

function EmailInput(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleBlur(e) {
    const { value } = e.target;
    setValue(value);
    const emailRegex = new RegExp(emailValidation);
    setError(!emailRegex.test(value));

    if (props.onBlur) {
      props?.onBlur?.(e, !emailRegex.test(value));
    }
  }
  return (
    <FormControl error={error} variant="standard" sx={{ my: 1 }}>
      <TextField
        id="outlined-basic"
        label="Email Address"
        variant="outlined"
        {...props}
        onBlur={handleBlur}
      />
      {error && (
        <FormHelperText id="component-error-text">
          {value ? errMsgs.wrongPwd : errMsgs.emptyField}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default EmailInput;
