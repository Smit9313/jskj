import * as React from 'react';
import {style} from './ProductCard'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import { add } from '../../store/cartSlice'
import {Button} from '@mui/material'
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api/Handler';
import { useDispatch } from 'react-redux';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addCartt } from '../../store/cartSlice';
import { useAuthHook } from '../../hooks/useAuthHook';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewProduct() {
  const {id} = useParams();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate()
  const {token} = useAuthHook()

  const [product,setProduct] = React.useState([])

  React.useEffect(()=>{
    getSingleProduct({id}).then(res=>{
      if(res.status){
        setProduct([res.data])
      }else{
        setProduct([])
      }
    })
  },[])

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd =(product)=>{
    if(token){
      dispatch(addCartt({product,quantity:1}))
      setMessage('Item added to cart')
      setOpen(true)
    }else{
      setMessage('You need to register')
      setOpen(true)
      setTimeout(()=>{
        navigate('/register')
      },3000)
    }
  }
  
  return (
    <Card sx={{ display: 'flex', width: 700, marginTop: '100px', alignItems: 'center', minHeight: '50vh', marginLeft: '22%', justifyContent: 'center' }}>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" ,position:'center'}}>
          {message}
        </Alert>
      </Snackbar>
     {product.length > 0 ? (
    <>
      <CardMedia
        component="img"
        sx={{ width: 151 ,marginRight: '70px'}}
        alt="Product Image"
        src={product[0].image}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
           {product[0].name}
          </Typography>
          <Typography component="div" variant="subtitle1">
          {product[0].price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {product[0].description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant="contained" color="primary" size='small' fullWidth onClick={()=>handleAdd(product[0])}>Add to Cart</Button>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Typography component="div" variant="h5">
        Product Not found
      </Typography>
      <Button variant="contained" color="primary" size='small' style={style} onClick={() => navigate('/products')}>Back to products</Button>
    </>
  )}
</Card>
  );
}

export default ViewProduct