import "./MainPage.css";
import Good from "../Good/Good.jsx";
import { useHistory } from "react-router-dom";
import { getLots } from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
export default function MainPage() {
  const history = useHistory();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getLots().then((response) => {
      setLots(response);
    });
    setLoading(false);
  }, []);
  const cutDescription = (description) => {
    if(description.length > 70){
      description = description.substring(0, 70)+'...';
    }
    return description;
  }
  return (
    <div className="MainPage">
      {loading && <h2>Loading...</h2>}
      {!loading &&
        lots.map((lot) => (
          <Good
            className="Good"
            title={lot.title}
            soloPrice={lot.soloPrice}
            description={cutDescription(lot.description)}
            imageId={lot.photoIDs[0]}
          />
        ))}
        {/* <div className="grow"></div> */}
    </div>
  );
}
