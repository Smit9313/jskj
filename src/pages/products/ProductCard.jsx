import { Card, CardContent, CardActions, Button, Typography, Grid, CardMedia } from '@mui/material';
import "./Products.css"
import {add} from '../../store/cartSlice'
import { useDispatch } from 'react-redux';

const style = {
    flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
}

const ProductCard = ({ product }) => {
   const dispatch = useDispatch()

    const handleAdd=(product)=>{
       dispatch(add(product))
    }

    return (
        <Grid item xs={2} sm={4} md={4}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' ,padding:5}}>
        <div style={style}>
          <img src={product.thumbnail} alt={product.title} style={{ width: '40%', height: '100px' }} />
        </div>
           <CardContent className='product'>
             <Typography variant="h6" component="div" style={style}>
               {product.title}
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
       </Grid>     
    );
  };
  
  export default ProductCard;
  