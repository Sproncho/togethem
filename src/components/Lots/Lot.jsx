import "./Lot.css";
import { useHistory, withRouter } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { deleteLotByid } from "../../services/card-data-servcie";
import { unsubscribeFromLot } from "../../services/card-data-servcie";
import * as Actions from "../../redux/userInfoStore/actionCreators";
import { connect } from "react-redux";

export function Lot({
  soloPrice,
  title,
  description,
  amount,
  totalAmount,
  imageId,
  id,
  sellerId,
  deleteCallback,
  unsubscribeCallback,
  role,
  UID,
}) {
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
  console.log("my role is :", role);
  return (
    <div className="Lots">
      <div className="img" onClick={() => history.push(`/fullCard/${id}`)}>
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
          <div
            className="title"
            onClick={() => history.push(`/fullCard/${id}`)}
          >
            {cutTitle(title)}
          </div>
          <hr />
          <div
            className="description"
            onClick={() => history.push(`/fullCard/${id}`)}
          >
            {cutDescription(description)}
          </div>
        </div>
        <div className="digitInf">
          <div
            className="price"
            onClick={() => history.push(`/fullCard/${id}`)}
          >
            Price: {soloPrice}$
          </div>
          <hr />
          <div
            className="count"
            onClick={() => history.push(`/fullCard/${id}`)}
          >
            Amount: {amount}/{totalAmount}
          </div>
        </div>
      </div>

      <div className="buttons">
        {role === "Seller" && (
          <button
            className="button"
            onClick={() => {
              deleteCallback(sellerId, id);
            }}
          >
            remove
          </button>
        )}
        {role === "Consumer" && (
          <button
            className="button"
            onClick={() => {
              console.log("UID", UID);
              unsubscribeCallback(UID, id);
            }}
          >
            Unsubscribe
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    role: state.userInfo.role,
    UID: state.userInfo.UID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRole: (role) => dispatch(Actions.setRole(role)),
    setUID: (uid) => dispatch(Actions.setUID(uid)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lot));
