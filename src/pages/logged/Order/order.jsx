import React,{useEffect, useState} from 'react'
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
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../../services/api/Handler';

function order() {
const navigate = useNavigate()
const [order, setOrder] = useState([])

  const shopNow = () => {
    navigate('/products')
  }

  useEffect(()=>{
   getOrder().then((res)=>{
    console.log(res)
    if(res.status){
      const sortedOrders = res.data.OrderDetails.sort(
        (a, b) => b.order_id - a.order_id
      );
       setOrder(sortedOrders)
    }
  }).catch((err)=>
  console.log(err))
},[])

console.log(order)

  return (
    <div style={{ padding: "20px", marginTop: "70px" }}>
    <Typography variant="h5" gutterBottom>
      Order
    </Typography>
    {
      order.length>0 ? <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>Order Id</TableCell>
          <TableCell>Order Date</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          

        {order.map((item)=>(
          <TableRow>
          <TableCell>{item.order_id}</TableCell>
            <TableCell>{item.order_date.split("T")[0]}</TableCell>
            <TableCell>
            <Table>
        <TableHead>
          <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {item.products.map((single)=>(
            <TableRow>
            <TableCell>{single.name}</TableCell>
            <TableCell><img
                        src={single.image}
                        alt=""
                        onClick={()=> navigate(`/products/${single.id}`)}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      /></TableCell>
            <TableCell>{single.price}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
            </TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{(item.total_price).toFixed(2)}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>       
      </TableContainer>:
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
      You don't have Order History
      <Button
      variant="contained"
      onClick={shopNow}
    >
      Shop Now
    </Button>
    </Typography>
    }
    </div>
)}

export default order