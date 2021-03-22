import "./RegistrationPage.css";
import {login, register,logout,setRoleandNickName} from '../../services/auth-service';
import { Formik } from "formik";

export default function RegistrationPage() {
  return (
    <div className="RegistrationPage">
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
          confirmPassword: "",
          userChoise: "",
        }}


        onSubmit={(values) => {
          logout();
          register(values.email,values.password)
          .then(() =>{
             login(values.email,values.password);
          })
          .then(() => {
            setRoleandNickName(values.userChoise,values.userName)
          })
          .catch((error)=>{
            console.log(error.message);
          })
        }}
        validate={(values) => {
          console.log("validate");
          const errors = {};
          if (values.userName === "") {
            errors.userName = "Fill the username line";
          } else if (values.userName.length < 3) {
            errors.userName = "Username is too short";
          }
          if (values.password.length < 6) {
            errors.password = "Your password must be at least 6 characters";
          }
          if(values.password.checkValidity)
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword =
              "The passwords you entered did not match, please try again";
          }
          if (
            values.userChoise === "" ||
            "Choose your role" === values.userChoise
          ) {
            errors.userChoise = "You have not chosen a role";
          }
          return errors;
        }}
      >
        {(props) => {
          console.log(props);

          return (
            <form action="#" method="post" onSubmit={props.handleSubmit}>
              <input
                className={props.errors.email ? "is-invalid" : ""}
                type="text"
                name="email"
                placeholder="type E-mail"
                value={props.values.email}
                onChange={props.handleChange}
              />
              {props.errors.email && (
                <span style={{ color: "red" }}>{props.errors.email}</span>
              )}
              <input
                className={props.errors.userName ? "is-invalid" : ""}
                type="text"
                name="userName"
                placeholder="type username"
                maxLength="20"
                value={props.values.userName}
                onChange={props.handleChange}
              />
              {props.errors.userName && (
                <span style={{ color: "red" }}>{props.errors.userName}</span>
              )}
              <input
                className={props.errors.password ? "is-invalid" : ""}
                type="password"
                name="password"
                placeholder="type password"
                maxLength="25"
                pattern="[A-Za-z]{1,}[0-9]{1,}"
                value={props.values.password}
                onChange={props.handleChange}
              />
              {props.errors.password && (
                <span style={{ color: "red" }}>{props.errors.password}</span>
              )}
              <input
                className={props.errors.confirmPassword ? "is-invalid" : ""}
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                maxlength="25"
                value={props.values.confirmPassword}
                onChange={props.handleChange}
              />
              {props.errors.confirmPassword && (
                <span style={{ color: "red" }}>
                  {props.errors.confirmPassword}
                </span>
              )}
              <select
                name="userChoise"
                id=""
                onChange={props.handleChange}
                className={props.errors.userChoise ? "is-invalid" : ""}
                required
              >
                <option select="selected">Choose your role</option>
                <option value="consumer">Consumer</option>
                <option value="seller">Seller</option>
              </select>
              {props.errors.userChoise && (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  {props.errors.userChoise}
                </span>
              )}
              <br />
              <button type="" id="registerButton" disabled={!props.isValid}>
                Register
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
