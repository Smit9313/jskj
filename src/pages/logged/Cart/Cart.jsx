import React from "react";
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
  Modal,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { orderPlace } from "../../../services/api/Handler";
import { removeAllCartt, removeCartt, updateCartt } from "../../../store/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  gap: 16,
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cart, totalprice, totalquantity} = useSelector((state)=>state.cart)
  const [open, setOpen] = React.useState(false);
  const [opentoaster, setOpenToaster] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleRemoveAll = (id) => {
    dispatch(removeCartt({ProductId:id}))
    setMessage('Removed product')
    setOpenToaster(true)
  };

  const handleUpdateQuantity = (id,quantity) => {
    dispatch(updateCartt({ProductId:id,quantity}))
      // setMessage('Quantity updated')
      // setOpenToaster(true)
  };
  
  const removeCart = () =>{
      dispatch(removeAllCartt())
      setMessage('Removed cart')
      setOpenToaster(true)
  }

  const handleClose = () => setOpen(false);

  const shopNow = ()=>{
    navigate('/products')
  }

  const checkOut = ()=>{
    setOpen(true)
  }

  const handleCloseToaster = () =>{
    setOpenToaster(false)
  }

  const handleorderPlace=()=>{
    const data = {
      shipping: {
        street: 'Law Garden',
        city: 'Maninagar',
        zipCode: '890XXG'
    },
    paymentMethod: "credit_card"
    }
    orderPlace(data).then((res)=>{
      setMessage('Order Successful placed')
      setOpenToaster(true)
      dispatch(removeAllCartt())
    }).catch((err)=>console.log(err))
    setTimeout(()=>{
      navigate('/order')
    },1000)
  }

  return (
      <div style={{ padding: "20px", marginTop: "70px" }}>
        <Typography variant="h5" gutterBottom>
          Cart
        </Typography>
        <Snackbar open={opentoaster} autoHideDuration={3000} onClose={handleCloseToaster}>
        <Alert onClose={handleCloseToaster} severity="info" sx={{ width: "100%" ,position:'center'}}>
          {message}
        </Alert>
      </Snackbar>
        {cart.length > 0 ? (
          <>
          <Button variant="contained" onClick={()=>removeCart()}>Remove Cart</Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price per Unit</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
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
                        onClick={()=> navigate(`/products/${product.product_id}`)}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.price_per_unit.toFixed(2)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{(product.price_per_unit*product.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          onClick={() => handleUpdateQuantity(product.product_id,product.quantity - 1)}
                        >
                          -
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleUpdateQuantity(product.product_id,product.quantity + 1)}
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
          </>
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
          <TableContainer component={Paper} sx={{marginTop: 2}}>
            <Table>
              <TableRow>
                <TableCell>Bill</TableCell>
                <TableCell>Total Quantity: {totalquantity}</TableCell>
                <TableCell>Total Price: {totalprice?.toFixed(2)}</TableCell>
                <Button variant="contained" onClick={() => checkOut()}>
                  CheckOut
                </Button>
              </TableRow>
            </Table>
          </TableContainer>
        )}
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to place order?
          </Typography>
        <Box sx={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16, // Adjust the gap between buttons as needed
        marginTop: 2, }}
>
          <Button variant="contained" onClick={handleorderPlace}>Yes</Button>
          <Button variant="contained" onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
      </div>
    
  );
}

export default Cart;
