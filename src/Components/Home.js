import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router";

import homeImage from "../img/Home.png";

function Home() {
  const history = useHistory();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h2>Trabajo Terminal 2 2020-B030</h2>
      <Box textAlign="center" sx={{ mx: 0.6 }} margin="auto">
        <h4>
          Prototipo de aplicación de apoyo para el análisis técnico del activo
          financiero EUR USD en ForEx
        </h4>
      </Box>
      <br />
      <img className="homeImg mx-auto" src={homeImage} alt="home" />
      <br />
      <Box sx={{ m: 0.6 }}>
        <Button
          variant="contained"
          className="homeButton"
          onClick={() => {
            history.push("/datosh");
          }}
        >
          Datos historicos
        </Button>
      </Box>
      <Box sx={{ m: 0.6 }}>
        <Button
          variant="contained"
          className="homeButton"
          onClick={() => {
            history.push("/Train");
          }}
        >
          Entrenar algoritmo
        </Button>
      </Box>
      <Box sx={{ m: 0.6 }}>
        <Button
          variant="contained"
          className="homeButton"
          onClick={() => {
            history.push("/Resultados");
          }}
        >
          Resultados
        </Button>
      </Box>
      <Box sx={{ m: 0.6 }}>
        <Button
          variant="contained"
          className="homeButton"
          onClick={() => {
            history.push("/Backtesting");
          }}
        >
          Backtesting
        </Button>
      </Box>
    </Grid>
  );
}

export default Home;
