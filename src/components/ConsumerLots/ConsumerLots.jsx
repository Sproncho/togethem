import "./ConsumerLots.css";
import { useHistory } from "react-router-dom";
import Lot from "../Lots/Lot";
import { getMyGroups } from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { unsubscribeFromLot } from "../../services/card-data-servcie";
import * as Actions from "../../redux/userInfoStore/actionCreators";

function ConsumerLots({ UID }) {
  const history = useHistory();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeLots, setActiveLots] = useState("opened");
  useEffect(() => {
    setLoading(true);
    getMyGroups(UID).then((response) => {
      console.log("ConsumerLots:", response);
      setLots(response);
      setLoading(false);
      console.log("ЛОТЫ", lots);
    });
  }, []);
  const unsubscribeLotCallback = async (UID, id) => {
    unsubscribeFromLot(UID, id);
    setLots(lots.filter((lot) => lot.id !== id));
  };
  return (
    <div className="ConsumerLots">
      <div className="btnHolder">
        <button className="divConsumerLots"><div>MY LOTS</div></button>
        <button className="mainBtn" onClick={() => setActiveLots("closed")}>
          <div onClick={() => setActiveLots("closed")}>FINISHED</div>
        </button>
        <button className="mainBtn" onClick={() => setActiveLots("opened")}>
          <div onClick={() => setActiveLots("opened")}>ACTIVE</div>
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
                unsubscribeCallback={unsubscribeLotCallback}
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
                unsubscribeCallback={unsubscribeLotCallback}
              />
            );
          }
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerLots);
