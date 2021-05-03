import Img from "./ProfileImage";
import "./Profile.css";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  Name: yup
    .string()
    .min(3, "Username is too short.")
    .required("Required field."),
  OldPassword: yup.string(),
  NewPassword: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\/\\@$!%*#?&]).{6,}$/,
      "Must Contain 6 Characters, One Uppercase and One number."
    )
    .required("Required field."),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

export default function Profile() {
  return (
    <div className="Profile">
      <div className="MainDiv">
        <div className="Img">
          <Img />
        </div>
        <div className="NickName">
          <div>NickName</div>
          <div>
            <Formik
              initialValues={{
                Name: "",
              }}
              onSubmit={(values) => {
                ///////////////////////////////////////////////////////////////////////
              }}
              validationSchema={schema}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <input
                      className={
                        props.errors.Name && props.touched.Name
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type new Nickname"
                      type="text"
                      value={props.values.Name}
                      onChange={props.handleChange}
                    />
                    <br />
                    <button className="SubmitButton" type="submit">
                      Submit Changes
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <div className="MainDiv">
        <div className="LogOut">
          <button className="SubmitButton">Logout</button>
        </div>
        <div className="Password">
          <div>
            <Formik
              initialValues={{
                OldPassword: "",
                NewPassword: "",
                ConfirmPassword: "",
              }}
              onSubmit={(values) => {
                ///////////////////////////////////////////////////////////////////////////////
              }}
              validationSchema={schema}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <input
                      className={
                        props.errors.OldPassword && props.touched.OldPassword
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type current password"
                      type="password"
                      value={props.values.email}
                      onChange={props.handleChange}
                    />
                    <br />
                    <input
                      className={
                        props.errors.NewPassword && props.touched.NewPassword
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type new password"
                      type="password"
                      value={props.values.email}
                      onChange={props.handleChange}
                    />
                    <br />
                    <input
                      className={
                        props.errors.ConfirmPassword &&
                        props.touched.ConfirmPassword
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type new password again"
                      type="password"
                      value={props.values.email}
                      onChange={props.handleChange}
                    />
                    <br />
                    <button className="SubmitButton" type="submit">
                      Submit Changes
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
