import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import BackButton from "../Common/BackButton";
import DatePickers from "./datePickers";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactLoading from "react-loading";

const Backtesting = () => {
  const [Datos, setDatos] = useState();
  const [accion, setAccion] = useState(0);
  const [lote, setLote] = useState(0);
  const [busy, setBusy] = useState(false);

  function Backtesting() {
    if (Datos !== undefined) {
      let op = accion === 0 ? "Compra" : "Venta";
      let start = Datos.start;
      let end = Datos.end;
      let res;
      if (accion === 0) res = (end.close - start.close) * lote * 100000;
      else res = (start.close - end.close) * lote * 100000;

      return (
        <Card sx={{ minWidth: 400 }}>
          <CardContent variant="outlined">
            <Grid display="flex" justify="center" alignItems="center">
              <Typography sx={{ mb: 1.5 }} color="text.primary">
                Operación: {op}
              </Typography>
              <Typography variant="body2">
                <p>
                  <strong>Fecha: </strong>
                  {new Date(start._id).toISOString().split("T")[0]}
                </p>
                <p>Valor de cierre Inicio: $ {start.close}</p>
                <p>
                  <strong>Fecha: </strong>
                  {new Date(end._id).toISOString().split("T")[0]}
                </p>
                <p>Valor de cierre Final: $ {end.close}</p>
                <h4 className={res < 0 ? "perdida" : "ganancia"}>
                  Resultado: $ {res} USD
                </h4>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      );
    }
    if (busy)
      return (
        <Box sx={{ m: 0.5 }}>
          <ReactLoading
            type={"bars"}
            color={"#1976d2"}
            height={15}
            width={60}
          />
        </Box>
      );
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <BackButton />
      <h1>BackTesting</h1>
      <DatePickers
        accion={accion}
        lote={lote}
        setLote={setLote}
        setAccion={setAccion}
        setDatos={setDatos}
        busy={busy}
        setBusy={setBusy}
      />

      <Box sx={{ m: 1 }}>{Backtesting()}</Box>
    </Grid>
  );
};

export default Backtesting;
