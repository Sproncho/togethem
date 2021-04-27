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
import { connect } from "react-redux";
function FullCard({ UID }) {
  const [lots, setLots] = useState([]);
  const [lot, setLot] = useState({});
  const [loading, setLoading] = useState(true);
  const [bought, setBought] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    checkBuying(UID, id).then((response) => {
      setBought(response);
    });
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
                      format="PNG"
                    /> */}
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
            {!bought && (
              <button
                className="mainBtn"
                onClick={() => {
                  subscribeOnLot(UID, id, 1);
                  setBought(true);
                }}
              >
                Group Buy {lot.amount}/{lot.totalAmount}
              </button>
            )}
            {bought && <button className="mainBtn inActive" >Subscribed</button>}
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
