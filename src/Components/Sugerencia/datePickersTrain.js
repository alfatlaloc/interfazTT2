import { useEffect, useState } from "react";
import { startDates, tolerancia, urlArray } from "../Common/FechasInicio";
import Button from "@mui/material/Button";
import { endgreaterThanStart, startLessThanEnd } from "../Common/DateValidator";
import AdapterDateFns from "@date-io/date-fns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getData, getLast } from "../../Peticiones/Peticiones";
import { Box } from "@material-ui/core";
const urlBack = "https://tt2-backend.herokuapp.com/";

const DatePickersTrain = ({ setPrediction, setDatos, busy, setBusy }) => {
  const [start_date, setstart_date] = useState();
  const [end_date, setend_date] = useState();
  const [intervalo, setIntervalo] = useState(0);
  const [minDate, setMinDate] = useState(new Date("01/01/2000"));
  const [maxDate, setMaxDate] = useState(new Date());

  const train = () => {
    if (busy) return;
    setBusy(true);
    setDatos([]);
    let datos = {
      end_date: end_date.toISOString(),
      start_date: start_date.toISOString(),
      forecast_or_train: "forecast",
    };
    getData(urlBack + urlArray[intervalo] + "/ML", datos).then((res) => {
      setDatos(res.candles);
      setPrediction(res.prediction);
      setBusy(false);
    });
  };

  useEffect(() => {
    setMinDate(startDates[intervalo]);
    setstart_date(startDates[intervalo]);

    getLast(urlBack + urlArray[intervalo] + "/Last").then((response) => {
      setMaxDate(new Date(response._id));
      setend_date(new Date(response._id));
    });
  }, [intervalo]);

  return (
    <>
      <Box sx={{ mx: "auto" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ m: 0.5 }}>
            <DesktopDatePicker
              views={["year", "month", "day"]}
              label="Fecha inicio"
              inputFormat="MM/dd/yyyy"
              minDate={minDate}
              maxDate={maxDate}
              value={start_date}
              inputRef={(props) => {
                if (props === null) return;
                props.disabled = true;
              }}
              onChange={(date) => {
                if (startLessThanEnd(date, end_date)) setstart_date(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <br />
          <Box sx={{ m: 0.5 }}>
            <DesktopDatePicker
              views={["year", "month", "day"]}
              label="Fecha limite"
              inputFormat="MM/dd/yyyy"
              minDate={minDate}
              maxDate={maxDate}
              value={end_date}
              inputRef={(props) => {
                if (props === null) return;
                props.disabled = true;
              }}
              onChange={(dateN) => {
                if (endgreaterThanStart(start_date, dateN)) setend_date(dateN);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <Box sx={{ m: 0.8 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Temporalidad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            defaultValue={"hora"}
            id="demo-simple-select"
            value={intervalo}
            label="Temporalidad"
            onChange={(e) => {
              setIntervalo(e.target.value);
            }}
          >
            <MenuItem value={0}>Hora</MenuItem>
            <MenuItem value={1}>Día</MenuItem>
            <MenuItem value={2}>Semana</MenuItem>
            <MenuItem value={3}>Mes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <p>Clasificar posibles señales de tendencias</p>
      </Box>
      <Box sx={{ m: 0 }}>
        <Button variant="contained" onClick={train}>
          Clasificar
        </Button>
      </Box>
      <Box sx={{ m: 0 }}>
        <p className="maxWidth200">
          A partir de cualquier vela dentro dentro de una zona coloreada, la
          posible continuación de tendencia se podrá confirmar a lo más, después
          de <strong> {tolerancia[intervalo]} velas</strong>.
        </p>
      </Box>
    </>
  );
};

export default DatePickersTrain;
