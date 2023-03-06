import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

function ResultItem(props) {
  const { title, price, image } = props;

  return (
    <Card 
        sx={{ 
            position: "relative",
            margin: "50px", 
            marginBottom: "100px", 
            width: "350px", 
            height: "350px", 
            border: "1px solid #ccc", 
            borderRadius: "4px", 
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", 
            backgroundColor: "#f9f9f9", 
            transition: "background-color 0.2s ease-in-out", 
            "&:hover": { backgroundColor: "#f1f1f1" },
             }}
        className={"classes.card"} href="www2.hm.com/en_us/productpage.1005627019.html">
      <CardMedia 
        sx={{ height: "100%", width: "100%", objectFit: "contain", filter: 'brightness(90%) contrast(120%)' }}
        className={"classes.media"} image={image} title={title} />
      <CardContent className={"classes.content"} sx={{ 
        position: "absolute", 
        bottom: 0, 
        backgroundColor: "#ffffff96", 
        width: "100%",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": { backgroundColor: "#ffffffe0" }, }}>
        <Box mb={1}>
          <Typography gutterBottom className={title} sx={{
            fontSize: "24px", 
            fontWeight: "bold",
            fontSize: '1.2rem',
            fontWeight: 'bold',
            }} variant="h2" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography className={price} sx={{
            fontSize: "18px",
        }}
        variant="body1">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

ResultItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ResultItem;
