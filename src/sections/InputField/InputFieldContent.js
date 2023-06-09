import React, { useState, useEffect } from "react";
import "./InputFieldContent.css";
import firebase from "../../firebaseConfig";

const InputFieldContent = (props) => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [addBtnClickedField, setaddBtnClickedField] = useState();

  useEffect(() => {
    if (props.donebtnclicked) {
      if (value) window.location.reload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.donebtnclicked]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value) {
      const cardRef = firebase
        .database()
        .ref(`cards/${props.cardRef}/content/${props.keyContent}`);
      cardRef.update({ value });
    }

    setaddBtnClickedField(!props.addBtnClicked);
    // window.location.reload(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return isEditing ? (
    <textarea
      type="text"
      value={value ? value : props.contentFromDB}
      placeholder={"How was your day?"}
      onBlur={handleBlur}
      onChange={handleChange}
      autoFocus
      style={{ backgroundColor: "transparent", color: "white", border: "none" }}
    />
  ) : props.contentFromDB && !addBtnClickedField ? (
    <p className="content" onClick={handleDoubleClick}>
      {props.contentFromDB ? props.contentFromDB : "How was your day?"}
    </p>
  ) : (
    <p className="content" onClick={handleDoubleClick}>
      {value ? value : "How was your dayyy?"}
    </p>
  );
};

export default InputFieldContent;
