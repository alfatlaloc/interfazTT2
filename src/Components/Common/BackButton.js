import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const history = useHistory();

  return (
    <button className="bkButton" onClick={history.goBack}>
      <ArrowBackIcon />

    </button>
  );
};

export default BackButton;
