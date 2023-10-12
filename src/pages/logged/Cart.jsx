import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {remove} from '../../store/cartSlice'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

function Cart() {
    const dispatch = useDispatch();
    const products = useSelector((state)=>state.cart)

    const handleRemove = (productId) =>{
        dispatch(remove(productId))
    }

  return (
    <>
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.thumbnail} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleRemove(product.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    </>
  )
}

export default Cart