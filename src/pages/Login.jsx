import Avatar from "@mui/material/Avatar";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";

export default function LoginPage() {
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
        <Box component="form" sx={{ mb: 2 }}>
          <TextField
            name="username"
            label="Enter username"
            size="small"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            type="password"
            label="Enter password"
            size="small"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth color="secondary">Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
}
