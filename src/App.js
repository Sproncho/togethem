import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import SellerLots from "./components/SellerLots/SellerLots";
import Test from "./components/testComponent/testComponent";
import * as Actions from "./redux/userInfoStore/actionCreators";
import CardAdder from "./components/CardAdder/CardAdder";
import { connect } from "react-redux";
import { fb } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserInfo } from "./services/auth-service";
import { useEffect, useState } from "react";

function App({ setRole, setUID, setInit, init, UID, role }) {
  // console.log(init);
  // const [user, loading, error] = useAuthState(fb.auth());
  const [state, setState] = useState({ loading: true, user: null });
  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    // const user = fb.auth().currentUser;
    fb.auth().onAuthStateChanged((user) => {
      if (user == null) {
        console.log("USER NOT EXIST");
        // fb.auth().signInWithEmailAndPassword("dan.zaborov@gmail.com",'Aa1234')
        // .then((user) => {
        //   setState(state => ({...state, loading:false,user: user.uid}));
        // });
        setState((state) => ({ ...state, loading: false }));
      } else {
        console.log("USER EXIST");

        getUserInfo(user.uid)
          .then((response) => {
            console.log("USER response:", response);
            if (response) {
              setRole(response.role);
              setUID(user.uid);
            }

            setState((state) => ({ ...state, loading: false, user: user.uid }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, []);

  // if(!init){
  //   if(user){
  //     getUserInfo(user.uid).then(response =>{
  //       setRole(response.role);
  //       setUID(user.uid);
  //       setInit();
  //     })
  //   }
  // }
  // console.log("UID before redirect: ",UID)
  // console.log("role before redirect: ",role)
  return (
    <div className="App">
      <Route path="/" component={Header} />
      {state.loading && <h2>Loading...</h2>}
      {!state.loading && <h2>{state.user}</h2>}
      {!state.loading && (
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/test" exact component={Test} />
          <Route path="/login" component={LoginPage}>
            {state.user && <Redirect from="/login" to="/" />}
          </Route>
          <Route path="/register" component={RegistrationPage}>
            {state.user && <Redirect from="/register" to="/" />}
          </Route>
          <Route path="/addCard" component={CardAdder}>
            {role !== "Seller" && <Redirect from="/addCard" to="/" />}
          </Route>
          <Route path="/sellerLots" component={SellerLots}></Route>
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    init: state.userInfo.init,
    UID: state.userInfo.UID,
    role: state.userInfo.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRole: (role) => dispatch(Actions.setRole(role)),
    setUID: (uid) => dispatch(Actions.setUID(uid)),
    setInit: () => dispatch(Actions.setInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
