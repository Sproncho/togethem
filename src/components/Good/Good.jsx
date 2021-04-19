import "./Good.css";
import { useHistory } from "react-router-dom";
import bigLogo from "./LOGO2.png";
import { Image, Transformation } from "cloudinary-react";


export default function Good({title,soloPrice,tandemPrice,description,imageId}) {
  const history = useHistory();
  return (
    <div className="Good">
      {/* <img src={imageSrc} alt="Photo of good" /> */}
      <Image
                cloudName={
                  process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME
                }
                publicId={imageId}
                alt = {bigLogo}
              >
                <Transformation
                  height="480"
                  width="720"
                  background=""
                  crop="pad"
                  format="PNG"
                />
                
              </Image>
      <h1>{title}</h1>
      <p className="price">price: {soloPrice}</p>
      <p>{description}</p>
        <p><button>Buy</button></p>
    </div>
  )
}
