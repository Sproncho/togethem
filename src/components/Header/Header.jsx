import "./Header.css";
import bigLogo from "./LogoNew.svg";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { fb } from "../../config/firebase-config";
import * as Actions from "../../redux/userInfoStore/actionCreators";
import { SearchBox } from "react-instantsearch-dom";
function Header({ setRole, role, location }) {
  const history = useHistory();
  console.log("HEader location", location);
  return (
    <div className="Header">
      <img className="logo"
        src={bigLogo}
        alt="photo"
        onClick={() => {
          history.push("/");
        }}
      />
      {location.pathname === "/" && (
        <SearchBox
          className="Searchbox"
          translations={{ placeholder: "Search for goods" }}
        />
      )}
      {location.pathname !== "/" && <div className="invisBox" />}
      <div className="btnHolder">
        {fb.auth().currentUser &&
          role === "Consumer" &&
          (location !== "/register" ||
          location !== "/login") && (
            <button
              className="mainBtn"
              onClick={() => {
                history.push("/consumerLots");
              }}
            >
              <div
                onClick={() => {
                  history.push("/consumerLots");
                }}
              >
                GROUPS
              </div>
            </button>
          )}
        {fb.auth().currentUser && role === "Seller" && (
          <button
            className="mainBtn"
            onClick={() => {
              history.push("/sellerLots");
            }}
          >
            <div
              onClick={() => {
                history.push("/sellerLots");
              }}
            >
              LOTS
            </div>
          </button>
        )}
        {!fb.auth().currentUser && (
          <button
            className="mainBtn loginBtn"
            onClick={() => {
              history.push("/login");
            }}
          >
            <div
              onClick={() => {
                history.push("/login");
              }}
            >
              LOGIN
            </div>
          </button>
        )}
        {fb.auth().currentUser && (
          <button
            className="mainBtn"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <div
              onClick={() => {
                history.push("/profile");
              }}
            >
              PROFILE
            </div>
          </button>
        )}
        <div className="whiteBox"></div>
      </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setRole: (role) => dispatch(Actions.setRole(role)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
