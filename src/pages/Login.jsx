import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  console.log(errors);

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Avatar sx={{ mx: "auto", mb: 2, color: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Login
        </Typography>
        <Box
          onSubmit={handleSubmit(handleFormSubmit)}
          component="form"
          noValidate
          sx={{ mb: 2 }}
        >
          <TextField
            {...register("username", {
              required: "Username zorunlu alan",
              minLength: {
                value: 3,
                message: "Username en az 3 karakter olmalı",
              },
            })}
            label="Enter username"
            size="small"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password", {
              required: "Password zorunlu alan",
              minLength: {
                value: 6,
                message: "Password en az 6 karakter olmalı",
              },
            })}
            type="password"
            label="Enter password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperTExt={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
