import React from "react";
import { TextField, Button, Box, Typography,Input, Container,InputLabel } from "@mui/material";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function Register() {

  const validation = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname:Yup.string().required('Lastname is required'),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });


  const { register, handleSubmit , formState} = useForm({
    resolver: yupResolver(validation)
  })

  const {errors} = formState

  const onSubmit=(data)=>{
     console.log(data)
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
      <TextField id="firstname" label="First Name" name="firstname" variant="outlined"
        margin="dense" {...register('firstname')}/>
        {errors.firstname && <InputLabel  sx={{color: 'red'}}>{errors.firstname?.message}</InputLabel>}
    
      <TextField id="lastname" label="Last Name" name="lastname" variant="outlined"
        margin="dense" 
        {...register('lastname')}
        />
       {errors.lastname && <InputLabel  sx={{color: 'red'}}>{errors.lastname?.message}</InputLabel>}
      <TextField id="email" label="Email" name="email" variant="outlined"
        margin="dense" {...register('email')}
        />
        {errors.email && <InputLabel  sx={{color: 'red'}}>{errors.email?.message}</InputLabel>}
      <TextField id="password" label="Password" name="password" variant="outlined"
        margin="dense" {...register('password')} />
       {errors.password && <InputLabel  sx={{color: 'red'}}>{errors.password?.message}</InputLabel>}
        <Input type="file" id="profilepicture" label="profile Picture" name="profilepicture" variant="outlined" {...register("profilepicture")}/>
        <Button component='span' variant='outlined' color='primary' size="small" >Upload</Button>
      {/* <TextField id="role" label="Role" name="role" variant="outlined"
        margin="dense" /> */}
        <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}>
          Register
        </Button>
   </Box>
   </Container>
  );
}

export default Register;
