import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { mal_id } = useParams();
  const Navigate=useNavigate()
  const [data, setData] = useState([]);

  function fetchData() {
    axios
      .get(`https://api.jikan.moe/v4/anime/${mal_id}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    fetchData();
  }, [mal_id]);


  function handleBack(){
    Navigate('/home')
  }
  return (
    <Card sx={{ textAlign: "start", m: 2, backgroundColor: "#bedbfa" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "650",
          height: "fit-content",
          m: 2,
        }}
      >
        <Box>
          {<CardMedia
              component="img"
              sx={{ width: 450, height: 550 }}
              image={data.images?.jpg?.image_url}
              alt={data.title}
            />}
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ mx: 20, my: 5 }}
          >
            Prev
          </Button>
        </Box>
        <Box
          sx={{
            width: "550px",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography variant="h4">TITLE : {data.title}</Typography>
          <Typography>EPISODES : {data.episodes}</Typography>
          <Typography>MAL_ID : {data.mal_id}</Typography>
          <Typography>STATUS : {data.status}</Typography>
          <Typography>DURATION : {data.duration}</Typography>
          <Typography>SYNOPSIS : {data.synopsis}</Typography>
          <Typography>
            BACKGROUND : {data.background ? data.background : "Null"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Details;
