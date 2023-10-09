import {
  Card,
  CardMedia,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchedData = ({
  data,
  setData,
  handleData,
  handleClick,
  handleDragStart,
  handleDragEnd,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePage = (event, value) => {
    console.log(value);
    setCurrentPage(value);
  };
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime?page=${currentPage}`)
      .then((response) => {
        setData(response.data.data);
        setPagination(response.data.pagination);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
    return () => {
      console.log("dkjf");
    };
  }, [currentPage]);

  return (
    <>
      {data.map((value, index) => {
        return (
          <Grid
            item
            xs={5}
            sx={{
              m: 1,
            }}
            key={index}
            // onClick={(e) => handleData(e, value)}
          >
            {loading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={150}
                height={100}
              />
            ) : (
              <Card
                sx={{ m: 1, width: 215, height: 180 }}
                onDoubleClick={() => handleClick(value)}
                draggable
                onDragStart={() => handleDragStart(value)}
                onDragEnd={() => handleDragEnd()}
              >
                <CardMedia
                  sx={{ height: 100, width: 180, m: 2 }}
                  image={value.images.jpg.image_url}
                />

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {value.title}
                  {value.isEmoji ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon
                      onDoubleClick={() => handleClick(value)}
                    />
                  )}
                </Typography>
              </Card>
            )}
          </Grid>
        );
      })}
      <Pagination
        count={pagination?.last_visible_page}
        color="primary"
        spacing={7}
        size="large"
        page={currentPage}
        onChange={handlePage}
        sx={{ position: "fixed", top: 550, left: 400 }}
      />
    </>
  );
};

export default FetchedData;
