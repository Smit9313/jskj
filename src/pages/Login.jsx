import React from 'react'
import { TextField, Button, Box, Typography } from "@mui/material";
import {useForm} from 'react-hook-form';

export default function Login() {
  const form = useForm()
  const { register, handleSubmit , formState} = form

  const {errors} = formState

  const onSubmit=(data)=>{
     console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
   <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField id="email" label="Email" name="email" variant="outlined"
        margin="dense" {...register('email', {
              required: {
                value:true,
                required:"Email is required"
                },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message : "Invalid email address format"
                
              }
            })}
        />
        {/* <p>{errors.email?.message}</p> */}
      <TextField id="password" label="Password" name="password" variant="outlined"
        margin="dense" {...register('password',{
          required:{
            value:true,
            message:'Password is register'
          }
        })} />
        {/* <p>{errors.password?.message}</p> */}
       
        <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}>
          Login
        </Button>
   </Box>
   </form>
    )
}
