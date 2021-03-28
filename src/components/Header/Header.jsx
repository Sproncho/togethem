import "./Header.css";
import bigLogo from "./LogoNew.svg";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { fb } from "../../config/firebase-config";

import {getUserInfo} from '../../services/auth-service';
import {useEffect} from 'react';
import * as Actions from '../../redux/userInfoStore/actionCreators'
import { useAuthState } from 'react-firebase-hooks/auth';
function Header({ setRole,role, location }) {


  // const [user, loading, error] = useAuthState(fb.auth());
  // console.log("header reloaded");
  // if(user){
  //   getUserInfo(user.uid).then(response =>{
  //     setRole(response.role);
  //   })
  // }
  const history = useHistory();
  // useEffect(() =>{
    
  //   // fb.auth().onAuthStateChanged(function(user) {
  //   //   if (user) {
        
  //   //   }
  //   // });
  //   if(loading){
  //     console.log("loading:loading",loading);
  //   }else if(user){
  //     console.log(user);
  //   }

  // },[]);
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
        { fb.auth().currentUser && role === "Consumer" &&
          (location !== "/register" || location !== "/login") && (
            <button>Groups</button>
          )}
        {fb.auth().currentUser && role === "Seller" &&
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

const mapDispatchToProps = (dispatch) => {
  return{
    setRole:(role)=>dispatch(Actions.setRole(role))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
