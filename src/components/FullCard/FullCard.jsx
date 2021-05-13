import "./FullCard.css";
import { useHistory, useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { Carousel } from "react-responsive-carousel";
import ProgressBar from "../ProgressBar/ProgressBar";
import {
  getLots,
  getLotById,
  subscribeOnLot,
  checkBuying,
} from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { getUserInfo } from "../../services/auth-service";

function FullCard({ UID, role }) {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [bought, setBought] = useState(false);
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
    getLotById(id)
      .then((response) => {
        setLot(response);
        console.log("НАШ РЕСПОНЗИК", response);
        return getUserInfo(response.sellerId);
      })
      .then((response) => {
        setEmail(response);
        console.log("НАШ РЕСПОНС 2", response);
      });
    console.log("НАШ ЛОТ", lot);
    setLoading(false);
  }, []);
  const renderCustomThumbs = () => {
    const thumblist = lot.photoIDs.map((id) => (
      <img
        key={id}
        src={`https://res.cloudinary.com/togethem/image/upload/${id}`}
      />
    ));
    return thumblist;
  };
  console.log("НАШ ЛОТ2", lot.photoIDs);
  console.log("КОЛИЧЕСТВО ДОСТУПНЫХ ЛОТОВ", amountToPurchase);
  console.log("Наш айдишник", UID);

  return (
    <div className="FullCard">
      <div className="description">
        <p>DESCRIPTION</p>
        <div className="descriptionText">{lot.description}</div>
      </div>
      <div className="gallery">
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
      <div className="lotInfo">
        <div className="title">{lot.title}</div>
        <div className="price">PRICE:{lot.soloPrice}$</div>
        <div className="amount">
          <p>AMOUNT IN GROUP:</p>
          <ProgressBar
            amount={lot.amount}
            totalAmount={lot.totalAmount}
            bgcolor="acd34a"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="buttons">
        {bought && <button className="mainBtn inActive">Subscribed</button>}
        {UID.length === 0 && (
          <button className="mainBtn" onClick={() => history.push("/login")}>
            Login or Register to buy!
          </button>
        )}
        {!bought && UID.length > 0 && role !== "Seller" && (
          <Popup
            className="Popup"
            modal
            overlayStyle={{ background: "rgba(68,68,68,0.7" }}
            trigger={(open) => (
              <button className="mainBtn" open={open}>
                GROUP BUY {lot.amount}/{lot.totalAmount}
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
              onChange={(e) => {
                if(e.target.value !== ""){
                  e.target.value > amountToPurchase() || e.target.value <= 0
                  ? setAmount(amountToPurchase())
                  : setAmount(e.target.value);
                }else{
                  setAmount(1);
                }
              }}
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

        <Popup
          className="Popup2"
          nested
          position="right"
          trigger={(open) => (
            <button className="mainBtn" open={open}>
              Seller's Contacts
            </button>
          )}
          closeOnDocumentClick
        >
          <span>Seller's Email: {email.email}</span>
        </Popup>
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
