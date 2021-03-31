import "./CardAdder.css";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import miniPhoto from "./cartoonPhoto.jpg";

const schema = yup.object().shape({
  tittle: yup.string().required("Required field."),
  description: yup.string().required("Required field."),
  soloPrice: yup.string().required("Required field."),
  amount: yup.string().required("Required field."),
  hashtags: yup.string().required("Required field."),
});

export default function CardAdder() {
  const history = useHistory();
  return (
    <div className="CardAdder">
      <Formik
        initialValues={{
          tittle: "",
          description: "",
          soloPrice: "",
          amount: "",
          hashtags: "",
        }}
        validationSchema={schema}
      >
        {(props) => {
          console.log(props);
          return (
            <form action="#" method="post" onSubmit={props.handleSubmit}>
              <div>
                <span>
                  <img src={miniPhoto} alt="Photo" />
                  <input type="file" name="file" />
                </span>
                <span>
                  <input
                    className={
                      props.errors.tittle && props.touched.tittle
                        ? "is-invalid"
                        : ""
                    }
                    type="text"
                    placeholder="Type tittle"
                    value={props.values.tittle}
                    onChange={props.handleChange}
                  />
                  {props.errors.tittle && props.touched.tittle && (
                    <span style={{ color: "red" }}>
                      {props.errors.userName}
                    </span>
                  )}
                  <br />
                  <input
                    className={
                      props.errors.description && props.touched.description
                        ? "is-invalid"
                        : ""
                    }
                    type="textarea"
                    placeholder="Type description"
                    value={props.values.description}
                    onChange={props.handleChange}
                  />
                  {props.errors.description && props.touched.description && (
                    <span style={{ color: "red" }}>
                      {props.errors.description}
                    </span>
                  )}
                </span>
              </div>
              <div>
                <span>
                  <input
                    className={
                      props.errors.soloPrice && props.touched.soloPrice
                        ? "is-invalid"
                        : ""
                    }
                    type="text"
                    placeholder="Type price for one"
                    value={props.values.soloPrice}
                    onChange={props.handleChange}
                  />
                  {props.errors.soloPrice && props.touched.soloPrice && (
                    <span style={{ color: "red" }}>
                      {props.errors.soloPrice}
                    </span>
                  )}
                </span>
                <span>
                  <input
                    className={
                      props.errors.amount && props.touched.amount
                        ? "is-invalid"
                        : ""
                    }
                    type="number"
                    min="0"
                    placeholder="amount"
                    value={props.values.amount}
                    onChange={props.handleChange}
                  />
                  {props.errors.amount && props.touched.amount && (
                    <span style={{ color: "red" }}>{props.errors.amount}</span>
                  )}
                </span>
              </div>
              <div>
                <span>
                  <input
                    className={
                      props.errors.hashtags && props.touched.hashtags
                        ? "is-invalid"
                        : ""
                    }
                    type="text"
                    placeholder="Type hashtags"
                    value={props.values.hashtags}
                    onChange={props.handleChange}
                  />
                  {props.errors.hashtags && props.touched.hashtags && (
                    <span style={{ color: "red" }}>
                      {props.errors.hashtags}
                    </span>
                  )}
                </span>
                <span>###Hashtags</span>
              </div>
              <button type="button">Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
