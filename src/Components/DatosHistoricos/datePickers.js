import { useEffect, useState } from "react";
import { startDates, urlArray } from "../Common/FechasInicio";
import Button from "@mui/material/Button";

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

import { endgreaterThanStart, startLessThanEnd } from "../Common/DateValidator";
const urlBack = "https://tt2-backend.herokuapp.com/";

const DatePickers = ({ setDatos, busy, setBusy, setModify }) => {
  const [start_date, setstart_date] = useState(new Date("01/01/2000"));
  const [end_date, setend_date] = useState(new Date());
  const [intervalo, setIntervalo] = useState(0);
  const [minDate, setMinDate] = useState(new Date("01/01/2000"));
  const [maxDate, setMaxDate] = useState(new Date());

  const getDatosGrafica = () => {
    if (busy) return;
    setBusy(true);
    setDatos([]);
    let fechas = {
      end_date: end_date.toISOString(),
      start_date: start_date.toISOString(),
    };
    getData(urlBack + urlArray[intervalo] + "/Range", fechas).then((res) => {
      setDatos(res);
      if(intervalo === 0) setModify(true);
      else setModify(false);
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

      <Box sx={{ m: 0.5 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Temporalidad</InputLabel>
          <Select
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

      <Box sx={{ m: 0.5 }}>
        <Button variant="contained" onClick={getDatosGrafica}>
          Obtener datos
        </Button>
      </Box>
    </>
  );
};

export default DatePickers;
