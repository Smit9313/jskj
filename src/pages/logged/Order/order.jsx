import React from 'react'
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
import { useNavigate } from 'react-router-dom';

function order() {
const navigate = useNavigate()

  const shopNow = () => {
    navigate('/products')
  }

  return (
    <div style={{ padding: "20px" }}>
    <Typography variant="h5" gutterBottom>
      Order
    </Typography>
    {/* {products.length > 0 ? ( */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {products.map((product) => (  key={id}*/}
              <TableRow >
                {/* <TableCell>
                  <img
                    // src={product.thumbnail}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell> */}
                <TableCell>order date</TableCell>
                <TableCell>status</TableCell>
                <TableCell>total price</TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ) : ( */}
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
              You don't have Order History
              <Button
              variant="contained"
              onClick={shopNow}
            >
              Shop Now
            </Button>
            </Typography>
            
          </>
        {/* )} */}
    </div>
)}

export default order