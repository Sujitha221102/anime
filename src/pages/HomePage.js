import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

const HomePage = () => {
  const [data, setData] = useState([]);
  // const [input, setInput] = useState("");
  const [draggedItems, setDraggedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function fetchData() {
    axios
      .get("https://api.jikan.moe/v4/anime")
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const initialState = {
    draggedItem: null,
    dropData: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "DRAG_START":
        return { ...state, draggedItem: action.payload };
      case "DRAG_END":
        return { ...state, draggedItem: null };
      case "DROP":
        return { ...state, dropData: action.payload };
      case "DELETE":
        return {
          ...state,
          draggedItem: null,
          dropData: null,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDragStart = (item) => {
    if (!isDragged(item)) {
      dispatch({ type: "DRAG_START", payload: item });
    }
  };

  const handleDragEnd = () => {
    dispatch({ type: "DRAG_END" });
  };

  const handleDrop = () => {
    if (state.draggedItem) {
      const updateData = data.map((item) => {
        if (item.mal_id === state.draggedItem.mal_id) {
          return {
            ...item,
            isEmoji: true,
          };
        }
        return item;
      });
      setData(updateData);
      setDraggedItems([...draggedItems, state.draggedItem]);
      dispatch({ type: "DROP", payload: null });
    }
  };

  const isDragged = (item) => {
    return draggedItems.some(
      (draggedItem) => draggedItem.mal_id === item.mal_id
    );
  };

  const handleDelete = (item) => {
    const updatedDraggedItems = draggedItems.filter(
      (draggedItem) => draggedItem.mal_id !== item.mal_id
    );
    const deleteData = data.map((value) => {
      if (value.mal_id === item.mal_id) {
        return {
          ...value,
          isEmoji: false,
        };
      }
      return value;
    });
    setData(deleteData);
    setDraggedItems(updatedDraggedItems);
    dispatch({ type: "DELETE" });
  };

  function logoutBtn() {
    navigate("/login");
    localStorage.setItem("LoggedIn", "false");
  }
  // const filteredData = input
  //   ? data.filter((value) =>
  //       value.title.toLowerCase().includes(input.toLowerCase())
  //     )
  //   : data;

  function handleClick(item) {
    const dblClick = data.map((value) => {
      if (value.mal_id === item.mal_id) {
        return {
          ...value,
          isEmoji: true,
        };
      }
      return value;
    });
    setData(dblClick);
    setDraggedItems([...draggedItems, item]);
    dispatch({ type: "DROP", payload: null });
  }

  function handleInputChange(event, value) {
    console.log(value);
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Typography variant="h5">API ANIME </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          /> */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data}
            getOptionLabel={(option) => option.title}
            onInputChange={handleInputChange}
            sx={{ width: 300 }}
            renderOption={(props, option) => (
              <Link
                to={`/home/${option.mal_id}`}
                style={{ textDecoration: "none"}}
              >
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={option.images.jpg.image_url}
                    alt=""
                  />
                  <Button variant="text" sx={{ color: "black",textAlign:'start' }}>
                    (Id : {option.mal_id}){option.title}
                  </Button>
                </Box>
              </Link>
            )}
            renderInput={(params) => <TextField {...params} label="Anime" />}
          />
          <Button variant="contained" onClick={logoutBtn} sx={{ height: 50 }}>
            Logout
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", ml: 68 }}>
          <CircularProgress />
          <Button variant="text">LOADING..</Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={3} sx={{ width: 400 }} xs={6}>
            {data.map((value, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <Card
                    sx={{ m: 1, maxWidth: 345, height: 180 }}
                    draggable
                    onDragStart={() => handleDragStart(value)}
                    onDragEnd={() => handleDragEnd()}
                  >
                    <CardMedia
                      sx={{ height: 100, width: 220, m: 2 }}
                      image={value.images.jpg.image_url}
                    />
                    <Typography
                      sx={{ display: "flex", justifyContent: "space-around" }}
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
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              sx={{
                m: 1,
                p: 2,
                width: 545,
                height: 1900,
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop()}
            >
              <Typography>WISHLIST❤️</Typography>
              {draggedItems.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    m: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    sx={{ height: 100, width: 140, m: 2 }}
                    image={item.images.jpg.image_url}
                  />
                  <Typography>{item.title}</Typography>
                  <Button
                    variant="contained"
                    sx={{ height: 50 }}
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
