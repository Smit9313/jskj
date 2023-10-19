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
import { userRegister } from "../services/api/Handler";
import {useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;

  const validation = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one number, one special character, and one alphabetic character"
      )
      .required("Password is required"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validation),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    userRegister(data)
      .then((res) => {
        if (res.status === 201) {
          setMessage("User Registered!! Verify email");
          setOpen(true)
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        setOpen(true);
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
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
            Registration
          </Typography>
          <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register("firstName")}
          />
          {errors.firstName && (
            <InputLabel sx={{ color: "red" }}>
              {errors.firstName?.message}
            </InputLabel>
          )}

          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register("lastName")}
          />
          {errors.lastName && (
            <InputLabel sx={{ color: "red" }}>
              {errors.lastName?.message}
            </InputLabel>
          )}
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register("email")}
          />
          {errors.email && (
            <InputLabel sx={{ color: "red" }}>
              {errors.email?.message}
            </InputLabel>
          )}
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
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
            Register
          </Button>

          <Typography
            variant="h9"
            sx={{ marginTop: "10px", marginLeft: "auto", color: "#1976d2" }}
            onClick={() => navigate("/login")}
          >
            Already registered!! Login?
          </Typography>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" ,position:'center'}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Register;
