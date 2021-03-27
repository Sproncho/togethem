import "./Header.css";
import bigLogo from "./LOGO2.png";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { fb } from "../../config/firebase-config";

function Header({ role, location }) {
  const history = useHistory();
  return (
    <div className="Header">
      <img
        src={bigLogo}
        alt="photo"
        onClick={() => {
          history.push("/");
        }}
      />
      {console.log("my role is :", role)}
      <span>
        {role === "Consumer" &&
          (location !== "/register" || location !== "/login") && (
            <button>Groups</button>
          )}
        {role === "Seller" &&
          (location !== "/register" || location !== "/login") && (
            <button>Lots</button>
          )}
        {!fb.auth().currentUser && location.pathname === "/" && (
          <button
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        )}
        {fb.auth().currentUser &&
          (location !== "/register" || location !== "/login") && (
            <button>Profile</button>
          )}
      </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state from header", state);
  console.log("map role", state.userInfo.role);
  return {
    role: state.userInfo.role,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
