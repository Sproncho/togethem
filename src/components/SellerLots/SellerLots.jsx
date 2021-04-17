import "./SellerLots.css";
import { useHistory } from "react-router-dom";
import Lot from '../Lots/Lot';
import plusIcon from "./free-icon-plus-149688.svg"

export default function SellerLots() {
  const history = useHistory();
  return (
    <div className="SellerLots">
      <Lot/>
      <Lot/>
      <Lot/>
      <img className="addLotsButton" src={plusIcon} />
    </div>
  );
}
