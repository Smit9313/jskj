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

export default function Login() {
  const validation = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validation),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
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
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
