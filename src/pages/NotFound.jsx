import React from 'react'
import {
    Box,
    Typography,
    Container,
    Button
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs" sx={{ boxShadow: 2, marginTop: 10 }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingY: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{color:'red'}} gutterBottom>
        404! 
      </Typography>
      <Typography variant="h4" sx={{color:'red'}} gutterBottom>
        Page Not Found 
      </Typography>
      <Button 
      type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={()=>navigate('/')}>
         Back Home
      </Button>
    </Box>
  </Container>
  )
}

export default NotFound