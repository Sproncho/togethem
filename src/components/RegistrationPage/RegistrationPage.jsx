import "./RegistrationPage.css";
import {
  login,
  register,
  logout,
  setRoleandNickName,
} from "../../services/auth-service";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Required field"),
  userName: yup
    .string()
    .min(3, "Username is too short")
    .required("Required field"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\/\\@$!%*#?&]).{6,}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, and One number"
    )
    .required("Required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  userChoise: yup
    .string()
    .matches(/^(Seller)|(Consumer)$/, "You have not chosen a role")
    .required("Required field"),
});

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
          register(values.email, values.password)
            .then(() => {
              login(values.email, values.password);
            })
            .then(() => {
              setRoleandNickName(values.userChoise, values.userName);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }}
        validationSchema={schema}
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
              <br />
              <select
                name="userChoise"
                id=""
                onChange={props.handleChange}
                className={props.errors.userChoise ? "is-invalid" : ""}
                required
              >
                <option select="selected">Choose your role</option>
                <option value="Consumer">Consumer</option>
                <option value="Seller">Seller</option>
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
