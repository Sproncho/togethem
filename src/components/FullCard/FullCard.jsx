import "./FullCard.css";
import { useHistory , useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { Carousel } from "react-responsive-carousel";
import { getLots } from "../../services/card-data-servcie";
import { useEffect, useState } from "react";
import Good from "../Good/Good.jsx";

export default function FullCard({ imageId }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    console.log('НАШ АЙДИШНИК', id)
    getLots().then((response) => {
      setLots(response);
    });
    setLoading(false);
  }, []);

//   const renderCustomThumbs = () => {
//     const thumblist = uploadedFiles.map((file) => (
//       <img key={file.public_id} src={file.url} />
//     ));
//     return thumblist;
//   };

  return (
    <div className="FullCard">
      <div className="mainDiv">
        {/* <Carousel
              renderThumbs={renderCustomThumbs}
              onChange={getCurrentPhoto}
            >
              {uploadedFiles.map((file) => (
                <div key={file.public_id}>
                  <Image
                    cloudName={
                      process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME
                    }
                    publicId={file.public_id}
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
            </Carousel> */}
      </div>

      <div className="mainDiv">
        <div>Title</div>
        <hr />
        <div>Description</div>
        <hr />
        <div>Price</div>
        <hr />
        <div className="GroupAndAmount">
          <span>GROUP BUY</span>
          <span>Amount in group</span>
        </div>
      </div>
      <div className="similarLots">
        {loading && <h2>Loading...</h2>}
        {!loading &&
          lots.map((lot) => (
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
