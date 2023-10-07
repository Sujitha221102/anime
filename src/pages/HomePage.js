import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import ApiData from "./ApiCards";
import WishList from "./WishList";
import NavBar from "./NavBar";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [draggedItems, setDraggedItems] = useState([]);
  const [errPg, setErrPg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    axios
      .get("https://api.jikan.moe/v4/anime")
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
        setErrPg(false);
      })
      .catch((error) => {
        setErrPg(true);
        setData(error.message);
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

  const filteredData = input
    ? data.filter((value) =>
        value.title.toLowerCase().includes(input.toLowerCase())
      )
    : data;

  function handleClick(item) {
    const itemWishList = draggedItems.some(
      (draggedItem) => draggedItem.mal_id === item.mal_id
    );
    if (!itemWishList) {
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
    } else {
      const dblClick = data.map((value) => {
        if (value.mal_id === item.mal_id) {
          return {
            ...value,
            isEmoji: false,
          };
        }
        return value;
      });
      setData(dblClick);
      const updatedDraggedItems = draggedItems.filter(
        (draggedItem) => draggedItem.mal_id !== item.mal_id
      );
      setDraggedItems(updatedDraggedItems);
      dispatch({ type: "DELETE" });
    }
  }

  // function handleData(e, value) {
  //   e.stopPropagation();
  //   navigate(`/home/${value.mal_id}`);
  // }
  return (
    <>
      {errPg ? (
        <Typography variant="h5">{data}</Typography>
      ) : (
        <Box>
          <NavBar input={input} setInput={setInput} />
          {isLoading ? (
            <Box sx={{ display: "flex", ml: 68 }}>
              <CircularProgress />
              <Button variant="text">LOADING..</Button>
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ width: 600, height: 1000, overflowY: "scroll", m: 1 }}
                >
                  <ApiData
                    data={filteredData}
                    setData={setData}
                    // handleData={handleData}
                    handleClick={handleClick}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                  />
                </Grid>
                <Grid item xs={6}>
                  <WishList
                    draggedItems={draggedItems}
                    handleDrop={handleDrop}
                    handleDelete={handleDelete}
                  />
                </Grid>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default HomePage;
