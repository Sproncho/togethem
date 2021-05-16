import miniPhoto from "./cartoonPhoto.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Test() {
  return (
    <div>
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
    </div>
  );
}
