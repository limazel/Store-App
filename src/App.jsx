import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetails";
import LoginPage from "./pages/account/Login";
import CartPage from "./pages/cart/Cart";
import RegisterPage from "./pages/account/Register";
import ErrorPage from "./pages/errors/Error";
import ServerErrorPage from "./pages/errors/ServerError";
import NotFoundPage from "./pages/errors/NotFound";
import { useEffect } from "react";
import requests from "./api/apiClient";
import { useDispatch } from "react-redux";
import { setCart } from "./pages/cart/cartSlice";
import { logout, setUser } from "./pages/account/accountSlice";
import MainLayout from "./layouts/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "errors",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));

    requests.account
      .getUser()
      .then((user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
      });

    requests.cart
      .get()
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log(error));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
