import { Grid } from "@material-ui/core";
import { useState } from "react";
import BackButton from "../Common/BackButton";
import DatePickersTrain from "./datePickersTrain";
import ReactLoading from "react-loading";
import { Box } from "@material-ui/core";
import { toSpanish } from "../Common/FechasInicio";

const Train = () => {
  const [Respuesta, setRespuesta] = useState(null);
  const [busy, setBusy] = useState(false);

  const res = () => {
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
    if (Respuesta === null) return;
    if (Respuesta.message)
      return (
        <p className="error">
          <strong>
            Ha ocurrido un error en el servidor, el rango de fechas es muy corto
          </strong>
          <br />
          {Respuesta.message}
        </p>
      );

    return (
      <>
        <p>
          <strong>Entrenado:</strong> {Respuesta.trained}
        </p>
        <p>
          <strong>Colección:</strong> {toSpanish[Respuesta.collection_name]}
        </p>
      </>
    );
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>Entrenamiento del algoritmo</h1>
      <BackButton />
      <DatePickersTrain busy={busy} setBusy={setBusy} setDatos={setRespuesta} />

      {res()}
    </Grid>
  );
};

export default Train;
