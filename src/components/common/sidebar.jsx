import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setCartModal } from "../../redux/reducers/modal";
const navData = [
  {
    name: "BHD store",
    path: "/",
  },
  {
    name: "Men",
    path: "/men",
  },
  {
    name: "Women",
    path: "/women",
  },
  {
    name: "Jewelery",
    path: "/jewelery",
  },
];

export default function SideBar() {
  const user = useSelector((state) => state.user.data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    dispatch(setUser({}));
  };

  const handleAddCart = () => {
    dispatch(setCartModal(true));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {navData.map((data, index) => (
            <Box component={Link} key={index} to={data.path}>
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                {data.name}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
            }}
          >
            <IconButton onClick={handleAddCart}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {user._id && (
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Profile
              </MenuItem>
            )}
            {user._id && <MenuItem onClick={handleClose}>My Cart</MenuItem>}
            {user._id && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            {!user._id && (
              <MenuItem onClick={handleClose} component={Link} to="/signin">
                Signin
              </MenuItem>
            )}
            {!user._id && (
              <MenuItem onClick={handleClose} component={Link} to="/signup">
                Signup
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </Box>
  );
}
