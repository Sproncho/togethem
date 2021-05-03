import "./FullCard.css";
import { useHistory, useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { Carousel } from "react-responsive-carousel";
import {
  getLots,
  getLotById,
  subscribeOnLot,
  checkBuying,
} from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
import Good from "../Good/Good.jsx";

import Popup from "reactjs-popup";
import { connect } from "react-redux";

function FullCard({ UID }) {
  const history = useHistory();
  const [bought, setBought] = useState(false);
  // const [lots, setLots] = useState([]);
  const [lot, setLot] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [amount, setAmount] = useState(1);
  const amountToPurchase = () => lot.totalAmount - lot.amount;
  useEffect(() => {
    setLoading(true);
    checkBuying(UID, id).then((response) => {
      setBought(response);
    });
    console.log("НАШ АЙДИШНИК", id);
    // getLots().then((response) => {
    //   setLots(response);
    // });
    getLotById(id).then((response) => {
      setLot(response);
      console.log("НАШ ЛОТ", response);
    });
    
    setLoading(false);
  }, []);
  const renderCustomThumbs = () => {
    const thumblist = lot.photoIDs.map((id) => (
      <img key={id} src={`https://res.cloudinary.com/togethem/image/upload/${id}`} />
    ));
    return thumblist;
  };
  console.log("НАШ ЛОТ2", lot.photoIDs);
  console.log("КОЛИЧЕСТВО ДОСТУПНЫХ ЛОТОВ", amountToPurchase);
  console.log("Наш айдишник", UID);

  return (
    <div className="FullCard">
      <div className="mainDiv">
        {lot.photoIDs && (
          <Carousel renderThumbs={renderCustomThumbs}>
            {lot.photoIDs.map((id) => (
              <div key={id}>
                <Image
                  cloudName={
                    process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME
                  }
                  publicId={id}
                >
                  <Transformation
                    height="480"
                    width="720"
                    background=""
                    crop="pad"
                    format="PNG"
                  />
                </Image>
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="mainDiv">
        <div className="title">{lot.title}</div>
        <div className="hr" />
        <div className="price">${lot.soloPrice}</div>
        <div className="hr" />
        <div className="GroupAndAmount">
          <span>
            {bought && <button className="mainBtn inActive">Subscribed</button>}
            {UID.length === 0 && (
              <button
                className="mainBtn"
                onClick={() => history.push("/login")}
              >
                Login or Register to buy!
              </button>
            )}
            {!bought && UID.length > 0 && (
              <Popup
                className="Popup"
                modal
                overlayStyle={{ background: "rgba(68,68,68,0.7" }}
                trigger={(open) => (
                  <button className="mainBtn" open={open}>
                    Group Buy {lot.amount}/{lot.totalAmount}
                  </button>
                )}
                position="right center"
                closeOnDocumentClick
              >
                <span className="buyInf">How much do you want to buy?</span>
                <br />
                <span className="buyInf">
                  the remaining amount for purchase: {amountToPurchase()}
                </span>
                <hr />
                <input
                  className="calculatedAmount"
                  type="number"
                  max={amountToPurchase()}
                  min={1}
                  value={amount}
                  onChange={(e) =>
                    e.target.value > amountToPurchase() || e.target.value <= 0
                      ? setAmount(amountToPurchase())
                      : setAmount(e.target.value)
                  }
                />
                <button
                  className="PopupSubmitBtn"
                  onClick={() => {
                    subscribeOnLot(UID, id, amount);
                    setBought(true);
                  }}
                >
                  Submit
                </button>
              </Popup>
            )}
          </span>
        </div>
      </div>
      <div className="hr" />
      <div className="description">{lot.description}</div>
      <div className="hr" />
      <div className="similarLots">
        {loading && <h2>Loading...</h2>}
        {/* {!loading &&
          lots
            .slice(0, 3)
            .map((lot) => (
              <Good
                className="Good"
                title={lot.title}
                soloPrice={lot.soloPrice}
                description={lot.description}
                imageId={lot.photoIDs[0]}
              />
            ))} */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    UID: state.userInfo.UID,
    role: state.userInfo.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(FullCard);
