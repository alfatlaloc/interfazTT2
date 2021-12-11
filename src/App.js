import Home from "./Components/Home";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/Common/NavBar"
import Footer from "./Components/Common/Footer";
import Sugerencia from "./Components/Sugerencia/Sugerencia";
import DatosHistoricos from "./Components/DatosHistoricos/DatosHistoricos";
import Backtesting from "./Components/Backtesting/Backtesting";
import Train from "./Components/Train/Train";


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="pagina">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Resultados" component={Sugerencia} />
        <Route path="/datosh" component={DatosHistoricos} />
        <Route path="/Backtesting" component={Backtesting} />
        <Route path="/Train" component={Train} />
      </Switch>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
