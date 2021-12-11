import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <footer className="footer">
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Grid container spacing={2} margin={"5px"}>
              Prototipo de aplicación de apoyo para el análisis técnico del
              activo financiero EUR USD en ForEx
            </Grid>
        <Container maxWidth="lg">
          
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            © 2021 Copyright:
            <br />
            Marco Antonio Castro Gutiérrez
            <br />
            Humberto Israel López Vela
            <br />
            Ariel Enrique Montoya Hernandez
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
