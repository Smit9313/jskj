import React from "react";
import { TextField, Button, Box, Typography,Input, Container,InputLabel } from "@mui/material";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from "axios";
import { userRegister } from "../services/api/Handler";
import { useNavigate } from "react-router-dom";


function Register() {

  const validation = Yup.object().shape({
    firstName: Yup.string().required('Firstname is required'),
    lastName:Yup.string().required('Lastname is required'),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const { register, handleSubmit , formState} = useForm({
    resolver: yupResolver(validation)
  })
  
  const navigate = useNavigate();

  const {errors} = formState

  const onSubmit= async(data)=>{
    console.log(data)
    const params = {
      firstName: data.firstName,
      lastName:data.lastName,
      email: data.email,
      password: data.password
    }
    userRegister(params).then(res=>{
      console.log(res)
    })
  }

  return (
    <Container maxWidth='xs' sx={{boxShadow: 2, marginTop: 10}}>
    <Box sx={{display:"flex",
    flexDirection:"column",
    paddingY: 5,
    alignItems:"center",
    justifyContent:"center",
    }}
    component='form' 
      onSubmit={handleSubmit(onSubmit)}
    >
   <Typography variant="h4" gutterBottom>
        Registration
      </Typography>
      <TextField id="firstName" label="First Name" name="firstName" variant="outlined" fullWidth
        margin="dense" {...register('firstName')}/>
        {errors.firstName && <InputLabel sx={{color: 'red'}}>{errors.firstName?.message}</InputLabel>}
    
      <TextField id="lastName" label="Last Name" name="lastName" variant="outlined" fullWidth
        margin="dense" 
        {...register('lastName')}
        />
       {errors.lastName && <InputLabel sx={{color: 'red'}}>{errors.lastName?.message}</InputLabel>}
      <TextField id="email" label="Email" name="email" variant="outlined" fullWidth
        margin="dense" {...register('email')}
        />
        {errors.email && <InputLabel  sx={{color: 'red'}}>{errors.email?.message}</InputLabel>}
      <TextField id="password" label="Password" name="password" variant="outlined" fullWidth
        margin="dense" {...register('password')} />
       {errors.password && <InputLabel  sx={{color: 'red'}}>{errors.password?.message}</InputLabel>}
       {/* <TextField type='file' id="profilepicture" name="profilepicture" variant="outlined" fullWidth
        margin="dense" {...register('profilepicture')} /> */}
       {/* {errors.password && <InputLabel  sx={{color: 'red'}}>{errors.password?.message}</InputLabel>} */}
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{ marginTop: '20px' }}>
          Register
        </Button>
        <Typography variant='h9' sx={{marginTop: '10px', marginLeft: 'auto', color:'#1976d2'}} onClick={()=>navigate('/login')}>Already registered!! Login?</Typography>
   </Box>
   </Container>
  );
}

export default Register;
