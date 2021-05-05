import "./Header.css";
import bigLogo from "./LogoNew.svg";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { fb } from "../../config/firebase-config";
import { useEffect, useState } from "react";
import * as Actions from "../../redux/userInfoStore/actionCreators";
import { SearchBox } from "react-instantsearch-dom";
function Header({ setRole, role, location }) {
  const history = useHistory();
  console.log("HEader location", location);
  return (
    <div className="Header">
      <img
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
      <div className="btnHolder">
        {fb.auth().currentUser &&
          role === "Consumer" &&
          (<div className="btnHolder"></div>)(
            location !== "/register" || location !== "/login"
          ) && (
            <button className="mainBtn">
              <div
                onClick={() => {
                  history.push("/consumerLots");
                }}
              >
                Groups
              </div>
            </button>
          )}
        {fb.auth().currentUser && role === "Seller" && (
          <button className="mainBtn">
            <div
              onClick={() => {
                history.push("/sellerLots");
              }}
            >
              Lots
            </div>
          </button>
        )}
        {!fb.auth().currentUser && (
          <button className="mainBtn">
            <div
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </div>
          </button>
        )}
        {fb.auth().currentUser && (
          <button className="mainBtn">
            <div
              onClick={() => {
                history.push("/profile");
              }}
            >
              Profile
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
