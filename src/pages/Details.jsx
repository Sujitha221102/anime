import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { mal_id } = useParams();
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [errPg, setErrPg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    axios
      .get(`https://api.jikan.moe/v4/anime/${mal_id}`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
        setErrPg(false)
        console.log(response.data.data);
      })
      .catch((error) => {
        setData(error.message)
        setErrPg(true)
        console.error(error.message);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, [mal_id]);

  function handleBack() {
    Navigate("/home");
  }
  return (
    <Box>
      {isLoading ? (
        <Box sx={{ display: "flex", ml: 68 }}>
          <CircularProgress />
          <Button variant="text">LOADING..</Button>
        </Box>
      ) : (
        <>
          {errPg ? (
            <Typography variant="h5">{data}</Typography>
          ) : 
          (
            isLoading ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={150}
              height={100}
            />
          ) : (
            <Card
              sx={{
                textAlign: "start",
                m: 2,
                width: 1180,
                height: 570,
                backgroundColor: "#bedbfa",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  m: 2,
                }}
              >
                <Box>
                  {
                    <CardMedia
                      component="img"
                      sx={{ width: 450, height: 480 }}
                      image={data.images?.jpg?.image_url}
                      alt={data.title}
                    />
                  }
                  <Button
                    variant="contained"
                    onClick={handleBack}
                    sx={{ mx: 20, my: 1 }}
                  >
                    Prev
                  </Button>
                </Box>
                <Box
                  sx={{
                    width: "450px",
                    height: "500px",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Typography variant="h4" sx={{ fontFamily: "fantasy" }}>
                    TITLE : {data.title}
                  </Typography>
                  <Typography>EPISODES : {data.episodes}</Typography>
                  <Typography>MAL_ID : {data.mal_id}</Typography>
                  <Typography>STATUS : {data.status}</Typography>
                  <Typography>DURATION : {data.duration}</Typography>
                  <Typography>FAVOURITE : {data.favorites}</Typography>
                  <Typography>RANK : {data.rank}</Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    SYNOPSIS :{" "}
                    {data.synopsis ? data.synopsis : "No Data available"}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    BACKGROUND :{" "}
                    {data.background ? data.background : "No Data available"}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default Details;
