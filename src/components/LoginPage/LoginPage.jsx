import "./LoginPage.css";
import { useState } from "react";
import { login,getUserInfo} from "../../services/auth-service";
import { useHistory } from "react-router-dom";
import * as Actions from '../../redux/userInfoStore/actionCreators'
import  { connect } from "react-redux";
function LoginPage({setUID,setRole,setInit}) {
  const history = useHistory();
  const [state, setState] = useState({ email: "", password: "" });
  return (
    <div className="loginPage">
      <input
        type="text"
        value={state.email}
        name="E-mail"
        placeholder="type E-mail"
        onChange={(e) => {
          setState((s) => ({ ...s, email: e.target.value }));
        }}
      />
      <input
        type="password"
        value={state.password}
        name="password"
        placeholder="type password"
        onChange={(e) => {
          setState((s) => ({ ...s, password: e.target.value }));
        }}
      />
      <button id="registerButton" onClick={() => history.push("/register")}>
        Register
      </button>
      <button
        id="loginButton"
        onClick={() => {
          login(state.email, state.password)
          .then((response) =>{
            setUID(response.user.uid);
            return getUserInfo(response.user.uid);
          })
          .then(response =>{
            setRole(response.role);
            setInit();
          })
          .catch(error =>{
            console.log(error.message);
          })
        }}
      >
        Login
      </button>
    </div>
  );
}
const mapStateToProps =  (state) =>{
  return{}
}

const mapDispatchToProps = (dispatch) => {
  return{
    setUID:(uid)=>dispatch(Actions.setUID(uid)),
    setRole:(role)=>dispatch(Actions.setRole(role)),
    setInit: () => dispatch(Actions.setInit()),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
