import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function NotFoundPage() {
  const { state } = useLocation();
  return <Paper sx={{ p: 3 }}>
     <Typography variant="h4" gutterBottom>
                Not Found Page
            </Typography>
            <Alert severity="error">
                Aradığınız kaynak bulunamadı.
            </Alert>
    <Button component={Link} color="secondary" variant="contained" to="/" sx={{mt: 2}}>Anasayfa</Button>
  </Paper>;
}
