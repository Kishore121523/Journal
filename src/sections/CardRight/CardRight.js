import React, { useState } from "react";
import { motion } from "framer-motion";
import { InputField, InputFieldContent } from "../";

const CardRight = (props) => {
  const [addBtnClicked, setaddBtnClicked] = useState(false);
  const confirmSubmit = () => {
    setaddBtnClicked(!addBtnClicked);
  };
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="right"
      id={props.keyRight}
    >
      <InputField
        dateFromDB={props.dateFromDB}
        cardRef={props.cardRef}
        keyDate={props.keyRight}
        className="date"
      />
      <InputFieldContent
        className="content"
        contentFromDB={props.contentFromDB}
        cardRef={props.cardRef}
        keyContent={props.keyRight}
        addBtnClicked={addBtnClicked}
        donebtnclicked={addBtnClicked}
      />
      {props.editModeRightDate && props.editModeRightContent ? (
        <button onClick={confirmSubmit} className="btnConfirmNote">
          Done
        </button>
      ) : (
        <button className="btnConfirmNote hidden">dsds</button>
      )}
    </motion.div>
  );
};

export default CardRight;
