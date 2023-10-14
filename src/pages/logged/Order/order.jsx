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

function order() {
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
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {products.map((product) => ( */}
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    // src={product.thumbnail}
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
              Your cart is empty
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