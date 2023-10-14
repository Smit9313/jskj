import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { userLogin } from "../services/api/Handler";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;
  const validation = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
    .matches(passwordRegex, "Password must contain at least one uppercase letter, one number, one special character, and one alphabetic character")
    .required("Password is required") 
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validation),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    userLogin(data).then(res=>{
      console.log(res)
      localStorage.setItem('token', res.data.token)
      navigate("/")
    })
  };
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
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          id="email"
          label="Email"
          name="email"
          variant="outlined"
          margin="dense"
          fullWidth
          {...register("email")}
        />
        {errors.email && (
          <InputLabel sx={{ color: "red" }}>{errors.email?.message}</InputLabel>
        )}
        <TextField
          id="password"
          label="Password"
          name="password"
          variant="outlined"
          margin="dense"
          fullWidth
          {...register("password")}
        />
        {errors.password && (
          <InputLabel sx={{ color: "red" }}>
            {errors.password?.message}
          </InputLabel>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
        <Typography variant='h9' sx={{marginTop: '10px', marginLeft: 'auto', color:'#1976d2'}} onClick={()=>navigate('/register')}>Create a new account</Typography>
      </Box>
    </Container>
  );
}
