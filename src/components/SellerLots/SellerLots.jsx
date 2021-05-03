import "./SellerLots.css";
import { useHistory } from "react-router-dom";
import Lot from "../Lots/Lot";
import plusIcon from "./free-icon-plus-149688.svg";
import { getMyLots } from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteLotByid } from "../../services/card-data-servcie";
import * as Actions from "../../redux/userInfoStore/actionCreators";

function SellerLots({ UID }) {
  const history = useHistory();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeLots, setActiveLots] = useState("opened");
  useEffect(() => {
    console.log(lots);

    setLoading(true);
    getMyLots(UID).then((response) => {
      console.log("SellerLots:", response);
      setLots(response);
      setLoading(false);
    });
  }, []);
  const deleteLotCallback = async (sellerId, id) => {
    deleteLotByid(sellerId, id);
    setLots(lots.filter((lot) => lot.id !== id));
  };

  return (
    //Todo check if lot not undef!!!!
    <div className="SellerLots">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button className="mainBtn" onClick={() => setActiveLots("closed")}>
          Closed Lots
        </button>
        <button className="mainBtn" onClick={() => setActiveLots("opened")}>
          Opened Lots
        </button>
      </div>
      {loading && <h2>Loading...</h2>}

      {!loading &&
        activeLots === "opened" &&
        lots.map((lot, i) => {
          if (!lot.finished) {
            return (
              <Lot
                key={i}
                soloPrice={lot.soloPrice}
                title={lot.title}
                description={lot.description}
                amount={lot.amount}
                totalAmount={lot.totalAmount}
                imageId={lot.photoIDs[0]}
                id={lot.id}
                sellerId={lot.sellerId}
                deleteCallback={deleteLotCallback}
              />
            );
          }
        })}

      {!loading &&
        activeLots === "closed" &&
        lots.map((lot, i) => {
          if (lot.finished) {
            return (
              <Lot
                key={i}
                soloPrice={lot.soloPrice}
                title={lot.title}
                description={lot.description}
                amount={lot.amount}
                totalAmount={lot.totalAmount}
                imageId={lot.photoIDs[0]}
                id={lot.id}
                sellerId={lot.sellerId}
                deleteCallback={deleteLotCallback}
              />
            );
          }
        })}
      {!loading && (
        <img
          className="addLotsButton"
          src={plusIcon}
          onClick={() => {
            history.push("/addCard");
          }}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    UID: state.userInfo.UID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerLots);
