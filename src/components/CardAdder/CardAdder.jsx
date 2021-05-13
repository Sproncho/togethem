import "./CardAdder.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { fb } from "../../config/firebase-config";
import { connect } from "react-redux";
import * as Actions from "../../redux/userInfoStore/actionCreators";
import InputBox from "./InputBox";
import {
  uploadLot,
  getLots,
  getMyLots,
} from "../../services/card-data-servcie";

const schema = yup.object().shape({
  title: yup.string().required("Required field."),
  description: yup.string().required("Required field."),
  soloPrice: yup
    .number()
    .min(0.01, "Price cannot be zero").positive("Price cannot be negative")
    .max(10000, "The price cannot be more than $10,000")
    .required("Required field."),
  amount: yup
    .number()
    .min(1, "The quantity of goods must not be equal to 0 or less")
    .max(10000, "The quantity of goods must be no more than 10.000")
    .positive("The amount must be greater than zero")
    .required("Required field."),
});

function CardAdder({ UID }) {
  const history = useHistory();
  const [hashtags, setHashtags] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [photos, setPhotos] = useState([]);
  const handlePhotosCallback = (photos) => {
    setPhotos(photos);
    console.log("photos from carder", photos);
  };
  return (
    <div className="CardAdder">
      <Formik
        initialValues={{
          title: "",
          description: "",
          soloPrice: "",
          amount: "",
        }}
        onSubmit={(values) => {
          console.log("SUBMITTING");
          uploadLot(
            values.title,
            values.description,
            values.soloPrice,
            values.amount,
            photos,
            hashtags,
            UID
          )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        validationSchema={schema}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <div className="firstDiv">
                <p>HASHTAGS</p>
                <span className="hashtagHolder">
                  {hashtags.map((h, index) => (
                    <div className="hashtag" key={index}>
                      {h}
                      <button
                        className="xButton_2"
                        type="button"
                        onClick={() =>
                          setHashtags(hashtags.filter((h, i) => i !== index))
                        }
                      >
                        x
                      </button>
                    </div>
                  ))}
                </span>
                <div style={{display: "flex", alignItems: "center"}}>
                  <input
                className="hashtagInput" 
                  name="hashtags"
                  type="text"
                  placeholder="Type key-words"
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                />
                <button
                  className="addBtn"
                  disabled={
                    hashtag.length === 0 || hashtags.length === 5
                      ? "true"
                      : ""
                  }
                  type="button"
                  id="addButton"
                  onClick={() => {
                    setHashtags([...hashtags, hashtag]);
                    setHashtag("");
                  }}
                >
                  Add
                </button>
                </div>
              </div>
              <div className="secondDiv">
                <div className="gallery">
                  <InputBox photosCallback={handlePhotosCallback} />
                </div>
                <input
                  className={
                    props.errors.title && props.touched.title
                      ? "is-invalid"
                      : "title"
                  }
                  name="title"
                  type="text"
                  placeholder="Type title"
                  maxLength="50"
                  value={props.values.title}
                  onChange={props.handleChange}
                />
                {props.errors.title && props.touched.title && (
                  <span style={{ color: "red" }}>{props.errors.title}</span>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
                  <div style={{width: "40%"}}>
                    <span>$</span>
                    <input
                      className={
                        props.errors.soloPrice && props.touched.soloPrice
                          ? "is-invalid"
                          : "price"
                      }
                      name="soloPrice"
                      type="number"
                      value={props.values.soloPrice}
                      onChange={props.handleChange}
                    />
                    {props.errors.soloPrice && props.touched.soloPrice && (
                      <span style={{ color: "red" }}>
                        {props.errors.soloPrice}
                      </span>
                    )}</div>
                  <div style={{width: "50%"}}>
                    <span>AMOUNT:</span>
                    <input
                      className={
                        props.errors.amount && props.touched.amount
                          ? "is-invalid"
                          : "amount"
                      }
                      name="amount"
                      type="number"
                      min="0"
                      value={props.values.amount}
                      onChange={props.handleChange}
                    />
                    {props.errors.amount && props.touched.amount && (
                      <span style={{ color: "red" }}>{props.errors.amount}</span>
                    )}</div>
                </div>
              </div>
              <div className="thirdDiv">
                <p>DESCRIPTION</p>
                <span>
                  <textarea
                    className={
                      props.errors.description && props.touched.description
                        ? "is-invalid"
                        : ""
                    }
                    name="description"
                    type="textarea"
                    placeholder="Type description"
                    maxLength="500"
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
              <div className="btnDiv">
                <span>
                  <button
                    type="submit"
                    className="mainButton"
                    id="submitButton"
                  >
                    Submit
                  </button>
                </span>
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
    // setUID:(uid)=>dispatch(Actions.setUID(uid)),
    // setRole:(role)=>dispatch(Actions.setRole(role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardAdder);
