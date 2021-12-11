import { Grid, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import DatePickers from "./datePickers";
import Button from "@mui/material/Button";
import BackButton from "../Common/BackButton";
import ReactLoading from "react-loading";

const DatosHistoricos = () => {
  const [datos, setDatos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [modify,setModify] = useState(false);

  function toCandlestick(RowNames) {
    let auxArr = [];
    auxArr[0] = RowNames;
    var i = 1;
    let actualPrice = datos[datos.length - 1].close;
    datos.forEach((item) => {
      let dateItem = new Date(item._id);
      auxArr[i++] = [
        dateItem,
        item.high,
        item.close,
        item.open,
        item.low,
        actualPrice,
      ];
    });
    return auxArr;
  }

  function download() {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(datos)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "data.json";
    a.click();
  }

  function customViewWindow(){
    if(modify)
    return {};
    return {
      max: 1.65,
      min: 0.9,
    };
  }

  const dibujarGreafica = () => {
    if (datos.length > 1)
      return (
        <Box sx={{ width: "95vw" }}>
          <Chart
            width={"auto"}
            height={"600px"}
            chartType="CandlestickChart"
            loader={<div>Loading Chart</div>}
            data={toCandlestick([
              "Fecha",
              "Precios",
              "CLOSE",
              "OPEN",
              "LOW",
              "Ultimo precio",
            ])}
            options={{
              hAxis: {
                title: "Fecha",
              },
              vAxes: {
                0: {
                  title: "Precio",
                  viewWindow: customViewWindow(),
                },
                1: {
                  title: "Precio",
                  viewWindow: customViewWindow(),
                },
              },
              series: {
                0: { targetAxisIndex: 0 ,color:"black"},
                1: { type: "line", targetAxisIndex: 1 },
              },
              title: "EURUSD datos",
              axes: {
                y: {
                  1: {
                    side: "right",
                  }, // Right y-axis.
                },
              },
              explorer: {
                axis: "horizontal",
                keepInBounds: true,
                maxZoomIn: modify ? 90.0 :30.0,
              },
            }}
            rootProps={{ "data-testid": "2" }}
          />
          <Box sx={{ mx: "auto", width: "100px" }}>
            <Button variant="contained" onClick={download}>
              Descargar
            </Button>
          </Box>
        </Box>
      );
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
  };
  useEffect(() => {});
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <BackButton />
      <h2>Consulta de datos</h2>
      <DatePickers
        busy={busy}
        setModify={setModify}
        setBusy={setBusy}
        datos={datos}
        setDatos={setDatos}
      />
      {dibujarGreafica()}
    </Grid>
  );
};
export default DatosHistoricos;
