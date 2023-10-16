import { Card, CardContent, CardActions, Button, Typography, Grid  } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartt } from '../../store/cartSlice';
// import { getCart } from '../../services/api/Handler';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const style = {
    flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
}

const ProductCard = ({ product }) => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
   const dispatch = useDispatch()
   const navigate = useNavigate()

  //  const ProductId = product.id
  //  const quantity = 1
  const handleClose = () => {
    setOpen(false);
  };
  
    const handleAdd=(product)=>{
        if(token){
          // const data = {
          //   'ProductId': product.id,
          //   'quantity': 1
          // }
            // addCartt(data).then((res)=>
            // console.log(res,"added to cart")
            // ).catch((err)=>{
            //   console.log(err)
            // })
          dispatch(addCartt({product,quantity:1}))
          setMessage('Item added to cart')
          setOpen(true)
        }else{
          setMessage('You need to register')
          setOpen(true)
          setTimeout(() => {
            navigate("/register");
          }, 3000);
          // navigate('/register')
        }
      }
    
    const viewSingleProduct = () =>{
      navigate(`/products/${product.id}`)
    }

    return (
        <Grid item xs={2} sm={4} md={4}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' ,padding:5}}>
        <div style={style}>
          <img src={product.image} alt={product.title} style={{ width: '40%', height: '100px' }} />
        </div>
           <CardContent className='product' onClick={viewSingleProduct}>
             <Typography variant="h6" component="div" style={style}>
               {product.name}
             </Typography>
             <Typography variant="subtitle1" color="text.secondary" style={style}>
               {product.price}
             </Typography>
           </CardContent>
           <CardActions>
             <Button variant="contained" color="primary" size='small' style={style} onClick={()=>handleAdd(product)}>
               Add to cart
            </Button>
           </CardActions>
         </Card> 
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" ,position:'center'}}>
          {message}
        </Alert>
      </Snackbar>
       </Grid>     
    );
}
export default ProductCard;
  