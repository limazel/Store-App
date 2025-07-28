import { AppBar, Badge, Box, Button, IconButton, Toolbar } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavLink } from "react-router";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from "../context/CartContext";

const links = [
  { title: "Home", to: "/" },
  { title: "Products", to: "/products" },
  { title: "Errors", to: "/errors" },
];

const authLinks = [
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

export default function Navbar() {

  const {cart} = useCartContext();
  const itemCount = cart?.cartItems.reduce((total, item) => total + item.product.quantity, 0);

  return (
    <AppBar position="static" sx={{backgroundColor: "secondary.light"}}>
      <Toolbar>
        <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
          <IconButton color="inherit">
            <StorefrontIcon />
          </IconButton>
          {links.map((link) => (
            <Button component={NavLink} to={link.to} color="inherit">
                {link.title}
            </Button>
          ))}
        </Box>

         <Box sx={{display: "flex", alignItems: "center"}}>
          <IconButton color="inherit" component={NavLink} to="/cart" size="large" edge="start">
            <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCartIcon/>
            </Badge>
          </IconButton>
          {authLinks.map((link) => (
            <Button component={NavLink} to={link.to} color="inherit">
                {link.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
