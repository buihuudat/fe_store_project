import { Box, Grid } from "@mui/material";
import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";

const WomenPage = () => {
  const manProducts = _.filter(
    useSelector((state) => state.product.data),
    {
      category: "women's clothing",
    }
  );
  return (
    <Grid container spacing={3}>
      {manProducts.map((data, index) => (
        <Grid item key={index} xs={3}>
          <CardProduct {...data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WomenPage;
