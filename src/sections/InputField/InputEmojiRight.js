import React, { useState } from "react";
import "./InputEmojiLeft.css";

const InputEmojiRight = () => {
  const [value, setValue] = useState("😁");
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
      className="emojiRightInput"
      style={{ backgroundColor: "transparent", color: "white", border: "none" }}
    />
  ) : (
    <p className="mood rightMood" onClick={handleDoubleClick}>
      {value ? value : "😉"}
    </p>
  );
};

export default InputEmojiRight;
