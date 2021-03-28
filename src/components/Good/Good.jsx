import "./Good.css";
import { useHistory } from "react-router-dom";
import bigLogo from "./LOGO2.png";

export default function Good() {
  const history = useHistory();
  return (
    <div className="Good">
      <img src={bigLogo} alt="Photo of good" />
      <h1>Title</h1>
      <p className="price">Normal price: $100</p>
      <p className="price">Tandem price: $80</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat explicabo obcaecati voluptatibus sequi minus totam error maiores saepe magnam quidem.</p>
        <p><button>Buy</button></p>
    </div>
  )
}
