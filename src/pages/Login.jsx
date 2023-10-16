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
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Login() {

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const validation = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
    .required("Password is required") 
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validation),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    userLogin(data).then(res=>{
      if(res.status===200){
        localStorage.setItem('token', res.data.token)
        setMessage('success')
        setOpen(true)
        navigate("/")
      }    
    }).catch(err=>{
      console.log(err)
      console.log(err.response)
      console.log(err.response.data.message)
      setMessage(err.response.data.message)
      setOpen(true)
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
          type="password"
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" ,position:'center'}}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
