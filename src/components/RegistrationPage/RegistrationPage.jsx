import "./RegistrationPage.css";
import {login, register,logout} from '../../services/auth-service';
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
          register(values.email,values.password).then(() =>{
             logout();
             login(values.email,values.password);
          }).catch((error)=>{
            console.log(error.message);
          })
        }}

        validate={values => {
          //console.log("validate")
          const errors = {}
          return errors
        }}
      >
        {(props) => {
          //console.log(props)
          return (
            <form
              method="post"
              onSubmit={props.handleSubmit}
            >
              <input
                type="text"
                name="email"
                placeholder="type E-mail"
                value={props.values.email}
                onChange={props.handleChange}
              />
              <input 
                type="text" 
                name="userName" 
                placeholder="type username" 
                value={props.values.userName}
                onChange={props.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="type password"
                value={props.values.password}
                onChange={props.handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                value={props.values.confirmPassword}
                onChange={props.handleChange}
              />
              <select name="userChoise" id="" onChange={props.handleChange} required>
                <option
                  value="consumer">Consumer</option>
                <option
                  value="seller">Seller</option>
              </select>
              <br />
              <button id="registerButton">Register</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
