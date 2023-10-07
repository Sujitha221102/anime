import { Button, Card, CardMedia, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'

const WishList = ({draggedItems,handleDelete,handleDrop}) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          m: 1,
          p: 2,
          width: 500,
          height: 1000,overflowY: "scroll"
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
    </>
  );
}

export default WishList