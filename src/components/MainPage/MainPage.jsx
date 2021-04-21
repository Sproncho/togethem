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
  return (
    <div className="MainPage">
      {loading && <h2>Loading...</h2>}
      {!loading &&
        lots.map((lot) => (
          <Good
            className="Good"
            title={lot.title}
            soloPrice={lot.soloPrice}
            description={(lot.description)}
            imageId={lot.photoIDs[0]}
            id={lot.id}
          />
        ))}
        {/* <div className="grow"></div> */}
    </div>
  );
}
