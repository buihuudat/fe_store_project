import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Rate } from "rsuite";
import { setModal } from "../../redux/reducers/modal";
import "./style.css";

const CardProduct = (props = "") => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      setModal({
        status: true,
        data: props,
      })
    );
  };
  return (
    <Box>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component={"img"}
            height={"auto"}
            image={props.image}
            alt={props.title}
          />
          <CardContent>
            <Typography>{props.title}</Typography>
            <Rate defaultValue={props.rating.rate} allowHalf />
            <Typography align="right" color={"orange"}>
              {props.price}$
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CardProduct;
