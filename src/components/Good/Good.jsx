import "./Good.css";
import { useHistory } from "react-router-dom";
import bigLogo from "./LOGO2.png";
import { Image, Transformation } from "cloudinary-react";
import ProgressBar from "../ProgressBar/ProgressBar";
export default function Good({ hit }) {
  const history = useHistory();
  return (
    <div
      className="Good"
      onClick={() => history.push(`/fullCard/${hit.objectID}`)}
    >
      {/* <img src={imageSrc} alt="Photo of good" /> */}
      <Image
        cloudName={process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME}
        publicId={hit.photoIDs[0]}
        alt={bigLogo}
      >
        <Transformation
          height="1080"
          width="1920"
          background=""
          crop="pad"
          format="PNG"
        />
      </Image>
      <div className="content">
        <div className="title">
          <span>{hit.title}</span>
        </div>
        <ProgressBar
          amount={hit.amount}
          totalAmount={hit.totalAmount}
          bgcolor="acd34a"
          style={{ width: "100%" }}
        />
        <div className="price">price: ${hit.soloPrice}</div>
      </div>
      <p>
        <button onClick={() => history.push(`/fullCard/${hit.objectID}`)}>
          BUY 
        </button>
      </p>
    </div>
  );
}
