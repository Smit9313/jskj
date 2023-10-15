import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate()
  const items = useSelector((state) => state.cart);
  const token = localStorage.getItem("token");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2}>
         
            <Button onClick={()=>navigate('/')}>
            <img src="/ZDF_logo!_Logo_2021.svg.png" height={40} width={100} />
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Product
            </Button>
            {token ?
              <Button color="inherit" component={Link} to="/cart">
              Cart: {items.totalquantity}
            </Button>:<></>
            }
            
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
              <Button
                color="inherit"
                component={Link}
                onClick={() => localStorage.removeItem("token")}
              >
                LogOut
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
