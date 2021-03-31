import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import * as Actions from './redux/userInfoStore/actionCreators';
import {connect} from 'react-redux';
import { fb } from "./config/firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import {getUserInfo} from './services/auth-service'
function App({setRole, setUID, setInit,init}) {

  const [user, loading, error] = useAuthState(fb.auth());

  if(!init){
    if(user){
      getUserInfo(user.uid).then(response =>{
        setRole(response.role);
        setUID(response.uid); 
        setInit();
      })
    }
  }
  return<div className="App">
    <Route path="/" component={Header}/>
     <Switch>
         <Route path="/" exact component={MainPage}/>
         <Route path="/login" component={LoginPage}>
            {user && <Redirect from="/login"to="/"/>}
         </Route>
         <Route path="/register" component={RegistrationPage}>
            {user && <Redirect from="/register"to="/"/>}
         </Route>
       
     </Switch>
   </div>

}

const mapStateToProps = (state) =>{
  return {
    init:state.userInfo.init
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setRole: (role) => dispatch(Actions.setRole(role)),
    setUID: (uid) => dispatch(Actions.setUID(uid)), 
    setInit: () => dispatch(Actions.setInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


