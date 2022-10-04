import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../common/sidebar";
import { Box, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import products from "../../api/products";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/reducers/products";
import ProductModal from "../modals/product";
import authApi from "../../api/auth";
import { setUser } from "../../redux/reducers/user";
import Cart from "../modals/cart";

const AppLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await products.get();
      dispatch(setProduct(productsData));
    };
    const checkAuth = async () => {
      const auth = await authApi.verifyToken();
      if (auth) {
        dispatch(setUser(auth.user));
      }
    };
    getProducts();
    checkAuth();
  }, [navigate, dispatch]);
  return (
    <Box>
      <SideBar />
      <Box>
        <Outlet />
        <ProductModal />
        <Cart />
      </Box>
    </Box>
  );
};

export default AppLayout;
