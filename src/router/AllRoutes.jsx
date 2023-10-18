import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Navbar from "../Layout/Navbar";
import Product from "../pages/products/Product";
import Cart from "../pages/logged/Cart/Cart";
import NotFound from "../pages/NotFound";
import Order from "../pages/logged/Order/order";
import ViewProduct from "../pages/products/ViewProduct";
import { useDispatch } from "react-redux";
import { getCartt } from "../store/cartSlice";
import { useAuthHook } from "../hooks/useAuthHook";
import Checkout from "../pages/logged/Order/Checkout";

function AllRoutes() {
  const dispatch = useDispatch();

  const {token} = useAuthHook();

  useEffect(() => {
    console.log(token)
    if (token) {
      dispatch(getCartt());
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/products" element={<Product />}></Route>
        {token ? (
          <>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        )}
        <Route path="/products/:id" element={<ViewProduct />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default AllRoutes;
