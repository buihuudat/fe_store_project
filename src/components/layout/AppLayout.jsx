import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../common/sidebar";
import { Box, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import products from "../../api/products";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/reducers/products";
import ProductModal from "../modals/product";

const AppLayout = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await products.get();
      dispatch(setProduct(productsData));
    };
    getProducts();
  });
  return (
    <Box>
      <SideBar />
      <Box>
        <Outlet />
        <ProductModal />
      </Box>
    </Box>
  );
};

export default AppLayout;
