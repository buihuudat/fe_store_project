import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setCartModal } from "../../redux/reducers/modal";
import _ from "lodash";
import Noti from "../common/Noti";
import { setAddProduct } from "../../redux/reducers/products";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: 800,
  p: 4,
};

export default function Cart() {
  const open = useSelector((state) => state.modal.cart);
  const products = useSelector((state) => state.product.add);
  console.log(products);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCartModal(false));
  };

  const CartProduct = (props) => {
    return (
      <Box sx={{ display: "flex", gap: 2, flexDirection: "row", pb: 3 }}>
        <img
          src={props.image}
          alt={props.title}
          style={{ width: "auto", height: "110px", objectFit: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography fontWeight={600}>{props.title}</Typography>
          <Typography variant="subtitle2">{props.description}</Typography>
        </Box>
      </Box>
    );
  };

  const costTotal = _.sumBy(products, "price");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" fontWeight={600} pb={5}>
            Your cart
          </Typography>
          {products.map((product) => (
            <CartProduct key={product.id} {...product} />
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight={600}>
              Pay {costTotal}$
            </Typography>
            <Button
              variant={"contained"}
              onClick={() => {
                Noti("success", "Pay successfully");
                dispatch(setCartModal(false));
                dispatch(setAddProduct([]));
              }}
            >
              Pay
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
