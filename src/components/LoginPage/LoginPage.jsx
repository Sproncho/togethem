import "./LoginPage.css";
import { useState } from "react";
import { login, getUserInfo } from "../../services/auth-service";
import { useHistory } from "react-router-dom";
import * as Actions from "../../redux/userInfoStore/actionCreators";
import { connect } from "react-redux";
function LoginPage({ setUID, setRole, setInit }) {
  const history = useHistory();
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  return (
    <div className="loginPage">
      <div className="loginDiv">
        <div className="login">Login</div>
      </div>
      <div className="inputs">
      {errors.error && (
        <span className="error"style={{ color: "red" }}>
          {"Inavlid email or password. Please try again."}
        </span>
      )}
        <input
          autocomplete="off"
          type="text"
          value={state.email}
          name="E-mail"
          placeholder="type E-mail"
          onChange={(e) => {
            setState((s) => ({ ...s, email: e.target.value }));
          }}
        />
        <input
          autocomplete="off"
          type="password"
          value={state.password}
          name="password"
          placeholder="type password"
          onChange={(e) => {
            setState((s) => ({ ...s, password: e.target.value }));
          }}
        />
      </div>
      <div className="buttons">
        <button id="registerButton" onClick={() => history.push("/register")}>
          REGISTER
        </button>
        <button
          id="loginButton"
          onClick={() => {
            login(state.email, state.password)
              .then((response) => {
                setUID(response.user.uid);
                return getUserInfo(response.user.uid);
              })
              .then((response) => {
                setRole(response.role);
                setInit();
              })
              .catch((error) => {
                console.log(error.message);
                setErrors({ error: error });
              });
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUID: (uid) => dispatch(Actions.setUID(uid)),
    setRole: (role) => dispatch(Actions.setRole(role)),
    setInit: () => dispatch(Actions.setInit()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
