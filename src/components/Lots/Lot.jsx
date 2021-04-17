import "./Lot.css";
import { useHistory } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

export default function Lot() {
  const history = useHistory();

  return (
    <div className="Lots">
      <div className="img">
        <Image
          cloudName={process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME}
          public_id="fvkskq5fuba7zxdr5dit"
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
        <div className="title">Дохуя крутой титульник для чего то там</div>
        <hr/>
        <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet consequatur possimus voluptatum eius cum voluptatem, quasi blanditiis voluptate veritatis adipisci!</div>
      </div>
      <div className="digitInf">
        <div className="price">Price</div>
        <div className="count">Count</div>
      </div>
      <div className="buttons">
        <button className="button">exit or close</button>
      </div>
    </div>
  );
}
