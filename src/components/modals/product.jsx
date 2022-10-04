import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/reducers/modal";
import { Rate } from "rsuite";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { setAddProduct } from "../../redux/reducers/products";
import Noti from "../common/Noti";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProductModal() {
  const product = useSelector((state) => state.modal.product);
  const addProduct = useSelector((state) => state.product.add);

  const open = product.status;
  const data = product.data;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      setModal({
        status: false,
        data: {},
      })
    );
  };

  const handleAdd = () => {
    let productArr = [];
    productArr = [...addProduct, data];
    dispatch(setAddProduct(productArr));

    Noti("success", "added product to cart");
    dispatch(
      setModal({
        status: false,
        data: {},
      })
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <img
              src={data.image}
              alt={data.title}
              style={{ height: 400, width: "auto", objectFit: "cover" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography fontWeight={600} variant="h4">
                {data.title}
              </Typography>
              <Typography>{data.description}</Typography>
              {data.rating && (
                <Rate readOnly defaultValue={data.rating.rate} allowHalf />
              )}
              <Typography color={"orange"} variant="h4">
                {data.price}$
              </Typography>
              <Button variant={"contained"} onClick={handleAdd}>
                <AddShoppingCartIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
