import { Grid } from "@material-ui/core";
import { useState } from "react";
import DatePickersTrain from "./datePickersTrain";
import Chart from "react-google-charts";
import BackButton from "../Common/BackButton";
import ReactLoading from "react-loading";
import { Box } from "@material-ui/core";

const Sugerencia = () => {
  const [respuesta, setRespuesta] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [busy, setBusy] = useState(false);

  function toCandlestick(RowNames) {
    let auxArr = [];
    auxArr.push(RowNames);

    respuesta.forEach((res, index) => {
      let nDate = new Date(res._id);
      let Hichi = Number.parseFloat(prediction[index]) > 0 ? 1.6 : 0.85;

      let Hichi2 = Number.parseFloat(prediction[index]) < 0 ? 1.6 : 0.8;
      auxArr.push([
        nDate,
        Hichi,
        Hichi2,
        res.high,
        res.close,
        res.open,
        res.low,
      ]);
    });
    return auxArr;
  }

  function drawChart() {
    if (respuesta.length > 0 && prediction.length > 0) {
      let controlsC = [
        {
          controlType: "ChartRangeFilter",
          options: {
            filterColumnIndex: 0,
            ui: {
              chartType: "CandleStickChart",
              chartOptions: {
                chartArea: { width: "90%", height: "40%" },
                hAxis: { baselineColor: "none" },
              },
            },
          },
          controlPosition: "bottom",
          controlWrapperParams: {
            state: {
              range: {
                start: new Date(respuesta[0]._id),
                end: new Date(respuesta[respuesta.length - 1]._id),
              },
            },
          },
        },
      ];

      return (
        <Chart
          controls={controlsC}
          className="chartResultado"
          width={"100%"}
          height={"500px"}
          chartType="ComboChart"
          loader={<div>Loading Chart</div>}
          data={toCandlestick([
            "Fecha",
            "Continuación de Tendencia Alcista",
            "Continuación de Tendencia Bajista",
            "Velas",
            "close",
            "open",
            "low",
          ])}
          options={{
            legend: { position: "bottom" },
            hAxis: {
              title: "Fecha",
            },
            vAxis: {
              title: "Precio",
              viewWindowMode: "explicit",
              viewWindow: {
                max: 1.65,
                min: 0.85,
              },
            },
            seriesType: "candlesticks",
            series: {
              0: { type: "area" },
              1: { type: "area" },
              2: { color: "#000000" },
            },
            title: "Resultados EURUSD",
            explorer: {
              axis: "horizontal",
              keepInBounds: true,
              maxZoomIn: 12.0,
            },
            isStacked: "false",
          }}
          rootProps={{ "data-testid": "3" }}
        />
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
      <h2>Resultados</h2>
      <DatePickersTrain
        busy={busy}
        setBusy={setBusy}
        setDatos={setRespuesta}
        setPrediction={setPrediction}
      />

      {drawChart()}
    </Grid>
  );
};

export default Sugerencia;
