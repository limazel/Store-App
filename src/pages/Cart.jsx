import { useEffect, useState } from "react";
import requests from "../api/apiClient";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { currencyTRY } from "../utils/formats";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../components/Loading";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
     .finally(() => setLoading(false)) 
  }, []);

  if(loading) return <Loading message="Sepetiniz Güncelleniyor" />

  if (!cart)
    return <Typography component="h4">Sepetinizde ürün yok.</Typography>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
            <TableCell sx={{ width: 120 }}>Adet</TableCell>
            <TableCell sx={{ width: 120 }}>Toplam</TableCell>
            <TableCell sx={{ width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={`http://localhost:5001/images/${item.product.image}`}
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
              <TableCell>{item.product.quantity}</TableCell>
              <TableCell>
                {currencyTRY.format(item.product.price * item.product.quantity)}
              </TableCell>
              <TableCell>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
