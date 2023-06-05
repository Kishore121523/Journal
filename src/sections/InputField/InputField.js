import React, { useState } from "react";
import "./InputField.css";
import firebase from "../../firebaseConfig";

const InputField = (props) => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);

    if (value) {
      const cardRef = firebase
        .database()
        .ref(`cards/${props.cardRef}/date/${props.keyDate}`);
      cardRef.update({ value });
    }

    // window.location.reload(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };
  const formatDateDB = (formatDateDB) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDateDB = new Date(formatDateDB).toLocaleDateString(
      undefined,
      options
    );
    return formattedDateDB;
  };

  const formattedDate = formatDate(value);
  const formattedDateDB = formatDateDB(props.dateFromDB);

  return isEditing ? (
    <input
      type="date"
      value={value ? value : props.dateFromDB}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder="Enter Date"
      style={{ backgroundColor: "transparent", color: "white", border: "none" }}
    />
  ) : formattedDateDB === "Invalid Date" ? (
    <p className="date" onClick={handleDoubleClick}>
      {formattedDate !== "Invalid Date" ? formattedDate : "Enter Date"}
    </p>
  ) : (
    <p className="date" onClick={handleDoubleClick}>
      {formattedDateDB ? formattedDateDB : "Enter Date"}
    </p>
  );
};

export default InputField;
