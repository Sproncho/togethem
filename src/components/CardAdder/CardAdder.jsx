import "./CardAdder.css";
import { useHistory } from "react-router-dom";
import miniPhoto from "./cartoonPhoto.jpg"

export default function CardAdder() {
  const history = useHistory();
  return (
    <div className="CardAdder">
      <div>
        <span>
          <img src={miniPhoto} alt="Photo" />
          <input type="file"/>
        </span>
        <span>
          <input type="text" placeholder="Type tittle" />
          <br/>
          <input type="textarea" placeholder="Type description" />
        </span>
      </div>
      <div>
        <span>
          <input type="text" placeholder="Type price for one" />
        </span>
        <span>
          <input type="number" min="0" placeholder="" />
        </span>
      </div>
      <div>
        <span>
          <input type="text" placeholder="Type hashtags" />
        </span>
        <span>
            ###Hashtags
        </span>
      </div>
      <button type="button">Submit</button>
    </div>
  );
}
