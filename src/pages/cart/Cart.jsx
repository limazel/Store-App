import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { currencyTRY } from "../../utils/formats";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { Link } from "react-router";

export default function CartPage() {
  const { cart, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subTotal = cart?.cartItems.reduce(
    (toplam, item) => toplam + item.product.price * item.product.quantity,
    0
  );
  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde ürün yok.</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 100 }}></TableCell>
              <TableCell>Ürün</TableCell>
              <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
              <TableCell sx={{ width: 180 }}>Adet</TableCell>
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
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(
                        addItemToCart({ productId: item.product.productId })
                      )
                    }
                  >
                    {status === "pendingAddItem" + item.product.productId ? (
                      <CircularProgress size={20} />
                    ) : (
                      <AddCircleOutlineIcon />
                    )}
                  </Button>
                  {item.product.quantity}
                  <Button
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.product.productId,
                          quantity: 1,
                          key: "single",
                        })
                      )
                    }
                  >
                    {status ===
                    "pendingDeleteItem" + item.product.productId + "single" ? (
                      <CircularProgress size={20} />
                    ) : (
                      <RemoveCircleOutlineIcon />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  {currencyTRY.format(
                    item.product.price * item.product.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.product.productId,
                          quantity: item.product.quantity,
                          key: "all",
                        })
                      )
                    }
                    color="error"
                  >
                    {status ===
                    "pendingDeleteItem" + item.product.productId + "all" ? (
                      <CircularProgress size={20} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={5}>
                Ara Toplam
              </TableCell>
              <TableCell align="right">
                {currencyTRY.format(subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}>
                Vergi
              </TableCell>
              <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}>
                Toplam
              </TableCell>
              <TableCell align="right">{currencyTRY.format(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Button
          component={Link}
          variant="contained"
          to="/products"
          color="primary"
        >
          Continue Shopping
        </Button>
        <Button
          component={Link}
          variant="contained"
          to="/checkout"
          color="secondary"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}
