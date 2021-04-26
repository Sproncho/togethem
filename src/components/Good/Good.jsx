import "./Good.css";
import { useHistory } from "react-router-dom";
import bigLogo from "./LOGO2.png";
import { Image, Transformation } from "cloudinary-react";
import {connect} from "react-redux"
import {subscribeOnLot,unsubscribeFromLot} from '../../services/card-data-servcie'
function Good({ title, soloPrice, description, imageId,UID,id }) {
  const history = useHistory();
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
      <p className="description"> {description}</p>
      <p><button onClick={() =>{subscribeOnLot(UID,id,1).catch(error => console.log(error))}}>Buy</button></p>
      
    </div>
  );
}
const mapStateToProps  = (state)=>{
  return {
    UID:state.userInfo.UID,
    role:state.userInfo.role
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Good)