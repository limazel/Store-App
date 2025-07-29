import { Button, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import { currencyTRY } from "../utils/formats";
import ReportIcon from "@mui/icons-material/Report";

export default function ProductItem({ product, handleAddItem, cartItem , isAdding }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ lg: 4, md: 5, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <img
            src={`http://localhost:5001/images/${product.image}`}
            style={{ width: "100%" }}
          />
        </Paper>
      </Grid>
      <Grid size={{ lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" color="secondary.dark">
            {product.title}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" color="secondary" sx={{ mt: 3 }}>
            {currencyTRY.format(product.price)}
          </Typography>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            sx={{ mt: 2, gap: 2, alignItems: "center" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAddItem(product.id)}
            >
              Sepete Ekle
            </Button>
            {cartItem?.product.quantity > 0 && (
              <Typography variant="body2" display="flex" alignItems="center">
                <ReportIcon color="secondary"/>
                Sepette {cartItem.product.quantity} adet eklendi.
              </Typography>
            )}

            {isAdding && (
              <CircularProgress size={20}/>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
