import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router";
import { currencyTRY } from "../utils/formats";
import requests from "../api/apiClient";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  function handleAddItem(productId) {
    setLoading(true);
    requests.cart
      .addItem(productId)
      .then((cart) => console.log(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  return (
    <Card>
      <CardActionArea component={Link} to={"/products/" + product.id}>
        <CardMedia
          sx={{ height: 160, backgroundSize: "contain" }}
          image={`http://localhost:5001/images/${product.image}`}
        ></CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            color="primary.dark"
          >
            {product.title}
          </Typography>
          <Typography variant="body1" color="secondary.dark">
            {currencyTRY.format(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton>
          {/* <FavoriteIcon /> */}
          <FavoriteBorderIcon />
        </IconButton>
        <Button onClick={() => handleAddItem(product.id)}>
          {loading ? <CircularProgress size="20px" /> : "Sepete Ekle"}
        </Button>
      </CardActions>
    </Card>
  );
}
