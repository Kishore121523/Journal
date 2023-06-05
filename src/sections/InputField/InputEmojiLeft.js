import React, { useState } from "react";
import "./InputEmojiLeft.css";

const InputEmojiLeft = () => {
  const [value, setValue] = useState("😉");
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    console.log("Value saved:", value);
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
  ) : (
    <p className="mood leftMood" onClick={handleDoubleClick}>
      {value ? value : "😉"}
    </p>
  );
};

export default InputEmojiLeft;
