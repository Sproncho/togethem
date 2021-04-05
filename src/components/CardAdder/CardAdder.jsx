import "./CardAdder.css";
import { useHistory } from "react-router-dom";
import miniPhoto from "./cartoonPhoto.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export default function CardAdder() {
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="CardAdder">
      <Carousel>
        <div>
          <img src={miniPhoto} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={miniPhoto} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={miniPhoto} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
      <div>
        <div className="gallery">
          {/* <img src={miniPhoto} alt="Photo" /> */}
          <input type="file" />
        </div>
        <span>
          <input type="text" placeholder="Type tittle" />
          <br />
          <input type="textarea" placeholder="Type description" />
        </span>
      </div>
      <div>
        <span>
          <input type="text" placeholder="Type price for one" />
        </span>
        <span>
          <input type="number" min="0" placeholder="" />
        </span>
      </div>
      <div>
        <span>
          <input type="text" placeholder="Type hashtags" />
        </span>
        <span>###Hashtags</span>
      </div>
      <button type="button">Submit</button>
    </div>
  );
}
