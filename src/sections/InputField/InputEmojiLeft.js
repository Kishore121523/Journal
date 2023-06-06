import React, { useState } from "react";
import "./InputEmojiLeft.css";
import firebase from "../../firebaseConfig";

const InputEmojiLeft = (props) => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    if (value) {
      const cardRef = firebase.database().ref(`topPart/${props.cardRef}`);
      cardRef.update({ value });
    }
    window.location.reload(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      autoFocus
      className="emojiLeftInput"
      style={{ backgroundColor: "transparent", color: "white", border: "none" }}
    />
  ) : props.emojiFromDB ? (
    <p className="mood leftMood" onClick={handleDoubleClick}>
      {props.emojiFromDB ? props.emojiFromDB : ""}
    </p>
  ) : (
    <p className="mood leftMood" onClick={handleDoubleClick}>
      {value ? value : "s"}
    </p>
  );
};

export default InputEmojiLeft;
