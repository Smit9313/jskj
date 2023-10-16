import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { add, removeAll, removeOne } from "../../../store/cartSlice";
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
import { useNavigate } from "react-router-dom";
import { getCart } from "../../../services/api/Handler";
import { removeCartt } from "../../../store/cartSlice";
// import { getCartt } from "../../../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [cartItems , setCartItems] = useState([])
  const {cart, totalprice, totalquantity} = useSelector((state)=>state.cart)

  // useEffect(()=>{
  //   getCart()
  //   .then(res=>{
  //       console.log(res.data)
  //       setCartItems(res.data)
  //   })
  // },[])

  const handleRemoveAll = (ProductId) => {
    dispatch(removeCartt({ProductId}))
  };

  const handleAddQuantity = (product) => {
    // dispatch(add(product));
  };

  const handleRemoveQuantity = (id) => {
    // dispatch(removeOne(id));
  };
  console.log(cart)

  const shopNow = ()=>{
    navigate('/products')
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Cart
        </Typography>
        {cart.length > 0 ? (
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
                {cart.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.price_per_unit*product.quantity}</TableCell>
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
                            onClick={() => handleRemoveAll(product.product_id)}
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
        {cart.length > 0 && (
          <TableContainer component={Paper} sx={{marginTop:'20%'}}>
            <Table>
              <TableRow>
                <TableCell>Bill</TableCell>
                <TableCell>Quantity : {totalquantity}</TableCell>
                <TableCell>Price : {totalprice}</TableCell>
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
