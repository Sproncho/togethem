import "./Lot.css";
import { useHistory } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import {deleteLotByid} from "../../services/card-data-servcie"
export default function Lot({soloPrice,title,description,amount,totalAmount,imageId,id,sellerId,deleteCallback}) {
  const history = useHistory();

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
      <div className="textInf">
        <div className="title">{title}</div>
        <hr/>
        <div className="description">{description}</div>
      </div>
      <div className="digitInf">
        <div className="price">Price:{soloPrice}$</div>
        <div className="count">{amount}/{totalAmount}</div>
      </div>
      <div className="buttons">
        <button className="button" onClick={() =>{deleteCallback(sellerId,id)}}>exit or close</button>
      </div>
    </div>
  );
}
