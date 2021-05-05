import "./RegistrationPage.css";
import {
  login,
  register,
  logout,
  setRoleandNickName,
} from "../../services/auth-service";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { connect } from "react-redux";
import * as Actions from "../../redux/userInfoStore/actionCreators";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("The email address is badly formatted.")
    .required("Required field."),
  userName: yup
    .string()
    .min(3, "Username is too short.")
    .required("Required field."),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\/\\@$!%*#?&]).{6,}$/,
      "Must Contain 6 Characters, One Uppercase and One number."
    )
    .required("Required field."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

function RegistrationPage({ setUID, setRole, UID, role, setInit }) {
  const [state, setState] = useState({});
  const [userChoice, setUserChoice] = useState("Consumer");
  return (
    <div className="RegistrationPage">
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          logout();
          register(values.email, values.password)
            .then((response) => {
              return login(values.email, values.password);
            })
            .then((response) => {
              setUID(response.user.uid);
              setRole(userChoice);
              setRoleandNickName(userChoice, values.userName, values.email);
              setInit();
              console.log("role and uid:", role, " ", UID);
            })
            .catch((error) => {
              console.log(error);
              setState({ error: error });
            });
        }}
        validationSchema={schema}
      >
        {(props) => {
          console.log(props);

          return (
            <form onSubmit={props.handleSubmit}>
              <div className="roleSelect">
                <button
                  type="button"
                  className="arrow leftArrow"
                  onClick={() => {
                    if (userChoice === "Seller") {
                      setUserChoice("Consumer");
                    } else {
                      setUserChoice("Seller");
                    }
                  }}
                >
                  &lt;
                </button>
                {userChoice === "Consumer" && (
                  <div className="role">CONSUMER</div>
                )}
                {userChoice === "Seller" && <div className="role">SELLER</div>}
                <button
                  type="button"
                  className="arrow rightArrow"
                  onClick={() => {
                    if (userChoice === "Seller") {
                      setUserChoice("Consumer");
                    } else {
                      setUserChoice("Seller");
                    }
                  }}
                >
                  &gt;
                </button>
              </div>
              <div className="inputs">
                <input
                  autocomplete="off"
                  className={
                    props.errors.email && props.touched.email
                      ? "is-invalid"
                      : ""
                  }
                  type="text"
                  name="email"
                  placeholder="type E-mail"
                  value={props.values.email}
                  onChange={props.handleChange}
                />

                {state.error &&
                  (state.error.code === "auth/invalid-email" ||
                    state.error.code === "auth/email-already-in-use") &&
                  props.touched.email && (
                    <span style={{ color: "red" }}>{state.error.message}</span>
                  )}

                {!state.error && props.errors.email && props.touched.email && (
                  <span style={{ color: "red" }}>{props.errors.email}</span>
                )}
                <input
                  autocomplete="off"
                  className={
                    props.errors.userName && props.touched.userName
                      ? "is-invalid"
                      : ""
                  }
                  type="text"
                  name="userName"
                  placeholder="type username"
                  maxLength="20"
                  value={props.values.userName}
                  onChange={props.handleChange}
                />
                {props.errors.userName && props.touched.userName && (
                  <span style={{ color: "red" }}>{props.errors.userName}</span>
                )}
                <input
                  autocomplete="off"
                  className={
                    props.errors.password && props.touched.password
                      ? "is-invalid"
                      : ""
                  }
                  type="password"
                  name="password"
                  placeholder="type password"
                  maxLength="25"
                  value={props.values.password}
                  onChange={props.handleChange}
                />
                {props.errors.password && props.touched.password && (
                  <span style={{ color: "red" }}>{props.errors.password}</span>
                )}
                <input
                  autocomplete="off"
                  className={
                    props.errors.confirmPassword &&
                    props.touched.confirmPassword
                      ? "is-invalid"
                      : ""
                  }
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  maxLength="25"
                  value={props.values.confirmPassword}
                  onChange={props.handleChange}
                />
              </div>
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <span style={{ color: "red" }}>
                    {props.errors.confirmPassword}
                  </span>
                )}
              <br />
              <div className="buttons">
                <button type="" id="registerButton">
                  Register
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    UID: state.userInfo.UID,
    role: state.userInfo.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUID: (uid) => dispatch(Actions.setUID(uid)),
    setRole: (role) => dispatch(Actions.setRole(role)),
    setInit: () => dispatch(Actions.setInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
