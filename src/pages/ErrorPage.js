import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import { Box, Typography } from "@mui/material";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box className="error">
      <Box>
        <Typography variant="h6">404</Typography>
        <Typography>THE PAGE WAS NOT FOUND</Typography>
        <Button variant="contained" onClick={() => navigate("/home")}>GO HOME</Button>
      </Box>
    </Box>
  );
}

export default ErrorPage;