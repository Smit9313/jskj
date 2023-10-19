import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useAuthHook } from "../hooks/useAuthHook";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.totalquantity);
  const { token, logOut } = useAuthHook();

  const Logout = () => {
    logOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/")}>
              <img src="/ZDF_logo!_Logo_2021.svg.png" height={40} width={100} />
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Product
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            {!token ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <>
              <Button color="inherit" component={Link} to="/order">
                Order
              </Button>
              {token ? (
              <Button color="inherit" component={Link} to="/cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={items} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Button>
            ) : (
              <></>
            )}
              <Button color="inherit" component={Link} to="/" onClick={Logout}>
                LogOut
              </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
