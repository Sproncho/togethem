import "./Good.css";
import { useHistory } from "react-router-dom";
import bigLogo from "./LOGO2.png";
import { Image, Transformation } from "cloudinary-react";

export default function Good({ title, soloPrice, description, imageId, id}) {
  const history = useHistory();
  const cutDescription = (description) => {
    if(description.length > 70){
      description = description.substring(0, 70)+'...';
    }
    return description;
  }
  return (
    <div className="Good">
      {/* <img src={imageSrc} alt="Photo of good" /> */}
      <Image
        cloudName={process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME}
        publicId={imageId}
        alt={bigLogo}
      >
        <Transformation
          height="480"
          width="720"
          background=""
          crop="pad"
          format="PNG"
        />
      </Image>
      <h1 className="title">{title}</h1>
      <p className="price">price: {soloPrice}</p>
      <p className="description"> {cutDescription(description)}</p>
      <p><button
      onClick={() => history.push(`/fullCard/${id}`)}
      >Buy</button></p>
      
    </div>
  );
}
