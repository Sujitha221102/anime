import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({input,setInput}) => {
  const navigate = useNavigate();
  const [option, setOption] = useState([]);

    useEffect(() => {
      let timer = setTimeout(() => {
        axios
          .get(`https://api.jikan.moe/v4/anime?q=${input}`)
          .then((response) => {
            setOption(response.data.data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }, 2500);
      return () => {
        clearTimeout(timer);
        console.log("sdddsfx", input);
      };
    }, [input]);

      function handleInputChange(event, value) {
        setInput(value);
        console.log(value);
      } 
        function logoutBtn() {
          navigate("/login");
          localStorage.setItem("LoggedIn", false);
        }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Typography variant="h5">API ANIME </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={option}
            getOptionLabel={(option) => option.title}
            onInputChange={handleInputChange}
            sx={{ width: 300 }}
            renderOption={(props, option) => (
              <Link
                to={`/home/${option.mal_id}`}
                style={{ textDecoration: "none" }}
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
                  <Button
                    variant="text"
                    sx={{ color: "black", textAlign: "start" }}
                  >
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
    </>
  );
}

export default NavBar