import { Card, CardContent, CardActions, Button, Typography, Grid  } from '@mui/material';
import { add } from '../../store/cartSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const style = {
    flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
}

const ProductCard = ({ product }) => {
  const token = localStorage.getItem("token");
   const dispatch = useDispatch()
   const navigate = useNavigate()
  
    const handleAdd=()=>{
        if(token){
          dispatch(add(product))
        }else{
          navigate('/register')
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
             <Button variant="contained" color="primary" size='small' style={style} onClick={handleAdd}>
               Add to cart
            </Button>
           </CardActions>
         </Card> 
       </Grid>     
    );
}
export default ProductCard;
  