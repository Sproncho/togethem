import "./FullCard.css";
import { useHistory, useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { Carousel } from "react-responsive-carousel";
import { getLots, getLotById } from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
import Good from "../Good/Good.jsx";
import Popup from "reactjs-popup";

export default function FullCard() {
  const [lots, setLots] = useState([]);
  const [lot, setLot] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const amountToPurchase = () => lot.totalAmount - lot.amount;
  useEffect(() => {
    setLoading(true);
    console.log("НАШ АЙДИШНИК", id);
    getLots().then((response) => {
      setLots(response);
    });
    getLotById(id).then((response) => {
      setLot(response);
    });
    console.log("НАШ ЛОТ", lot);
    setLoading(false);
  }, []);
  // const renderCustomThumbs = () => {
  //   const thumblist = uploadedFiles.map((file) => (
  //     <img key={lot.imageId} src={file.url} />
  //   ));
  //   return thumblist;
  // };
  console.log("НАШ ЛОТ2", lot.photoIDs);
  console.log("КОЛИЧЕСТВО ДОСТУПНЫХ ЛОТОВ", amountToPurchase);
  return (
    <div className="FullCard">
      <div className="mainDiv">
        {lot.photoIDs && (
          <Carousel>
            {lot.photoIDs.map((id) => (
              <div key={id}>
                <Image
                  cloudName={
                    process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME
                  }
                  publicId={id}
                >
                  {/* <Transformation
                      height="480"
                      width="720"
                      background=""
                      crop="pad"
                      format="PNG" */}
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
            <Popup className="Popup"
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
              <br/>
              <span className="buyInf">the remaining amount for purchase: {amountToPurchase()}</span>
              <hr />
              <input
                className="calculatedAmount"
                type="number"
                max={amountToPurchase()}
                onChange={(e) => e.target.value > amountToPurchase() ? e.target.value = amountToPurchase() : null}

              />
              <button className="PopupSubmitBtn">Submit</button>
            </Popup>
          </span>
        </div>
      </div>
      <div className="hr" />
      <div className="description">{lot.description}</div>
      <div className="hr" />
      <div className="similarLots">
        {loading && <h2>Loading...</h2>}
        {!loading &&
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
            ))}
      </div>
    </div>
  );
}
