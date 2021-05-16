import "./Profile.css";
import { Formik } from "formik";
import * as yup from "yup";
import {
  changePassword,
  changeUserame,
  logout,
} from "../../services/auth-service";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username is too short.")
    .required("Required field."),
});

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("Required field."),
  newPassword: yup
    .string()
    .required("Required field.")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\/\\@$!%*#?&]).{6,}$/,
      "Must Contain 6 Characters, One Uppercase and One number."
    ),
  confirmPassword: yup
    .string()
    .required("Required field.")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match."),
});

function Profile({ UID }) {
  const [errors, setErrors] = useState({});
  const [passwordDone, setPasswordDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const history = useHistory();
  return (
   <div className="profileBackGround">
      <div className="Profile">
        <div className="NickName">
          <div>
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={nameSchema}
              onSubmit={(values) => {
                setNameDone(false);
                console.log("submitting", values);
                changeUserame(UID, values.name).then(() => {
                  console.log("submitted");
                  values.name = "";
                });
                setNameDone(true);
              }}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <input
                      className={
                        props.errors.name && props.touched.name
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type new Nickname"
                      type="text"
                      name="name"
                      value={props.values.name}
                      onChange={props.handleChange}
                    />
                    <br />
                    <button className="SubmitButton" type="">
                      CONFIRM
                    </button>
                    {nameDone && (
                      <span style={{ color: "green", marginLeft: "15px" }}>
                        Done
                      </span>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className="Password">
          <div>
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={(values) => {
                console.log("passwords change", values);
                setPasswordDone(false);
                changePassword(values.oldPassword, values.newPassword)
                  .then(() => {
                    values.oldPassword = "";
                    values.newPassword = "";
                    values.confirmPassword = "";
                    setErrors({});
                    setPasswordDone(true);
                  })
                  .catch((error) => {
                    console.log("The error durong relogin", error.code);
                    setErrors({ error: error });
                  });
              }}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <input
                      className={
                        props.errors.oldPassword && props.touched.oldPassword
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type old password"
                      type="password"
                      name="oldPassword"
                      value={props.values.oldPassword}
                      onChange={props.handleChange}
                    />
                    {!errors.error &&
                      props.errors.oldPassword &&
                      props.touched.oldPassword && (
                        <span style={{ color: "red" }}>
                          {props.errors.oldPassword}
                        </span>
                      )}
  
                    {errors.error &&
                      errors.error.code === "auth/wrong-password" && (
                        <span style={{ color: "red" }}>Wrong password</span>
                      )}
  
                    <br />
                    <input
                      className={
                        props.errors.newPassword && props.touched.newPassword
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type new password"
                      type="password"
                      name="newPassword"
                      value={props.values.newPassword}
                      onChange={props.handleChange}
                    />
                    {props.errors.newPassword && props.touched.newPassword && (
                      <span style={{ color: "red" }}>
                        {props.errors.newPassword}
                      </span>
                    )}
                    <br />
                    <input
                      className={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                          ? "is-invalid"
                          : ""
                      }
                      placeholder="Type new password again"
                      type="password"
                      name="confirmPassword"
                      value={props.values.confirmPassword}
                      onChange={props.handleChange}
                    />
                    {props.errors.confirmPassword &&
                      props.touched.confirmPassword && (
                        <span style={{ color: "red" }}>
                          {props.errors.confirmPassword}
                        </span>
                      )}
                    <br />
                    <button
                      className="SubmitButton"
                      type=""
                      onClick={() => console.log(props.errors)}
                    >
                      CONFIRM
                    </button>
                    {passwordDone && (
                      <span style={{ color: "green", marginLeft: "15px" }}>
                        Done
                      </span>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
  
        <div className="LogOut">
          <button className="logOutBtn"
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
   </div>
  );
}
const mapStateToProps = (state) => {
  return {
    UID: state.userInfo.UID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
