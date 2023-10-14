import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
import {Button} from '@mui/material'
import Typography from '@mui/material/Typography';

function ViewProduct() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex',  width: 700, marginTop: '50px' , alignItems: 'center', minHeight: '50vh', marginLeft:'22%', justifyContent: 'center'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Product Title
          </Typography>
          <Typography component="div" variant="subtitle1">
            Price
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Description
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button>Add to Cart</Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, marginLeft: '80px' }}
        alt="Live from space album cover"
        // src={image}
      />
    </Card>
  );
}

export default ViewProduct