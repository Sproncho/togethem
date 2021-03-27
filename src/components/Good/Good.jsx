import "./Good.css";
import { useHistory } from "react-router-dom";
import bigLogo from "./LOGO2.png";

export default function Good() {
  const history = useHistory();
  return (
    <div className="Good">
      <img src={bigLogo} alt="Photo of good" />
      <br />
      <hr />
      <span>
        <h3>Normal price: 100$</h3>
        <h3>Tandem price: 80$</h3>
      </span>
      <span>
        <button>BUY</button>
      </span>
    </div>
  );
}
