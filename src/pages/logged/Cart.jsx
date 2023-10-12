import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, removeAll, removeOne } from "../../store/cartSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { redirect, useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalprice);
  const totalQuantity = useSelector((state) => state.cart.totalquantity);

  const handleRemoveAll = (id) => {
    dispatch(removeAll(id));
  };

  const handleAddQuantity = (product) => {
    dispatch(add(product));
  };

  const handleRemoveQuantity = (id) => {
    dispatch(removeOne(id));
  };

  const shopNow = ()=>{
    navigate('/products')
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Cart
        </Typography>
        {products.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.thumbnail}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          onClick={() => handleRemoveQuantity(product.id)}
                        >
                          -
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleAddQuantity(product)}
                        >
                          +
                        </Button>

                        <Button>
                          <DeleteIcon
                            onClick={() => handleRemoveAll(product)}
                          />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2
              }}
            >
              Your cart is empty
              <Button
              variant="contained"
              onClick={shopNow}
            >
              Shop Now
            </Button>
            </Typography>
            
          </>
        )}
        {products.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell>Bill</TableCell>
                <TableCell>Quantity : {totalQuantity}</TableCell>
                <TableCell>Price : {totalPrice}</TableCell>
                <Button variant="contained" onClick={() => checkOut()}>
                  PayNow
                </Button>
              </TableRow>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default Cart;
