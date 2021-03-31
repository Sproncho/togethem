import "./CardAdder.css";
import { useHistory } from "react-router-dom";
import miniPhoto from "./cartoonPhoto.jpg"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function CardAdder() {
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="CardAdder">
      <Slider style={{display:"block"}} {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
      <div>
        <span>
          {/* <img src={miniPhoto} alt="Photo" /> */}
          <input type="file"/>
        </span>
        <span>
          <input type="text" placeholder="Type tittle" />
          <br/>
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
        <span>
            ###Hashtags
        </span>
      </div>
      <button type="button">Submit</button>
    </div>
  );
}
