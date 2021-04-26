import "./Lot.css";
import { useHistory } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import {deleteLotByid} from "../../services/card-data-servcie";
export default function Lot({soloPrice,title,description,amount,totalAmount,imageId,id,sellerId,deleteCallback}) {
  const history = useHistory();
  const cutTitle = (title) => {
    if (title.length > 40) {
      title = title.substring(0, 40) + "...";
    }
    return title;
  };
  const cutDescription = (description) => {
    if (description.length > 80) {
      description = description.substring(0, 80) + "...";
    }
    return description;
  };
  return (
    <div className="Lots">
      <div className="img">
        <Image
          cloudName={process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME}
          public_id={imageId}
        >
          <Transformation
            height="200"
            width="250"
            background=""
            crop="pad"
            format="PNG"
          />
        </Image>
      </div>
      <div className="mainDiv">
        <div className="textInf">
          <div className="title">{cutTitle(title)}</div>
          <hr />
          <div className="description">{cutDescription(description)}</div>
        </div>
        <div className="digitInf">
          <div className="price">Price: {soloPrice}$</div>
          <hr />
          <div className="count">
            Amount: {amount}/{totalAmount}
          </div>
        </div>

      </div>

      <div className="buttons">
        <button className="button" onClick={() =>{deleteCallback(sellerId,id)}}>exit or close</button>
      </div>
    </div>
  );
}
