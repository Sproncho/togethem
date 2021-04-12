import "./CardAdder.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {fb} from '../../config/firebase-config'
import {connect} from 'react-redux'
import * as Actions from '../../redux/userInfoStore/actionCreators'
import InputBox from "./InputBox";


const schema = yup.object().shape({
  title: yup.string().required("Required field."),
  description: yup.string().required("Required field."),
  soloPrice: yup.string().required("Required field."),
  amount: yup.string().required("Required field."),
});

 function CardAdder({UID}) {
  const history = useHistory();
  const [hashtags, setHashtags] = useState([]);
  const [hashtag, setHashtag] = useState("");
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!hashtag.includes('#')) {
    setHashtag('#' + hashtag)
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        }}
        validationSchema={schema}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <div className="mainDiv">
                <div className="gallery">
                  <InputBox />
                </div>
                <span>
                  <input
                    className={
                      props.errors.title && props.touched.title
                        ? "is-invalid"
                        : ""
                    }
                    name="title"
                    type="text"
                    placeholder="Type title"
                    value={props.values.title}
                    onChange={props.handleChange}
                  />
                  {props.errors.title && props.touched.title && (
                    <span style={{ color: "red" }}>{props.errors.title}</span>
                  )}
                  <br />
                  <textarea
                    className={
                      props.errors.description && props.touched.description
                        ? "is-invalid"
                        : ""
                    }
                    name="description"
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
              <div className="mainDiv">
                <span>
                  <input
                    className={
                      props.errors.soloPrice && props.touched.soloPrice
                        ? "is-invalid"
                        : ""
                    }
                    name="soloPrice"
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
                    name="amount"
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
              <div className="mainDiv">
                <span>
                  <input
                    name="hashtags"
                    type="text"
                    placeholder="Type tags"
                    value={hashtag}
                    onChange={(e) => 
                      setHashtag(e.target.value)}
                  />
                </span>
                <span style={{display: "flex", flexWrap: "wrap"}}>
                  Hashatags:{" "}
                  {hashtags.map((h, i) => (
                    <span className="hashtag" key={i} style={{margin: "2px 2px", width: "auto"}}>
                      {h}
                    </span>
                  ))}
                </span>
              </div>
              <div className="mainDiv">
                <span>
                  <button
                    className="mainButton"
                    type="button"
                    id="addButton"
                    onClick={() => setHashtags([...hashtags, hashtag])}
                  >
                    Add hashtag
                  </button>
                </span>
                <span>
                  <button type="submit" className="mainButton" id="submitButton">
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
const mapStateToProps  = (state)=>{
  return {
    UID:state.userInfo.UID,
    role:state.userInfo.role
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    // setUID:(uid)=>dispatch(Actions.setUID(uid)),
    // setRole:(role)=>dispatch(Actions.setRole(role)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardAdder)