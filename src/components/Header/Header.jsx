import "./Header.css";
import bigLogo from "./bigLogo.png";

export default function Header() {
  return (
    <div className="Header">
      <img src={bigLogo} alt="photo" />
      <span>
        {/* <Будущий компонент> */}
        <button>Profile</button>
      </span>
    </div>
  );
}
