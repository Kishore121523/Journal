import React, { useState } from "react";
import { motion } from "framer-motion";
import { InputField, InputFieldContent } from "../";

const CardLeft = (props) => {
  const [addBtnClicked, setaddBtnClicked] = useState(false);
  const confirmSubmit = () => {
    setaddBtnClicked(!addBtnClicked);
  };
  return (
    <motion.div whileTap={{ scale: 0.95 }} className="left" id={props.keyLeft}>
      <InputField
        dateFromDB={props.dateFromDB}
        cardRef={props.cardRef}
        keyDate={props.keyLeft}
        className="date"
      />
      <InputFieldContent
        contentFromDB={props.contentFromDB}
        cardRef={props.cardRef}
        keyContent={props.keyLeft}
        className="content"
        addBtnClicked={addBtnClicked}
        donebtnclicked={addBtnClicked}
      />
      {props.editModeLeftDate && props.editModeLeftContent ? (
        <button onClick={confirmSubmit} className="btnConfirmNote">
          Done
        </button>
      ) : (
        <button className="btnConfirmNote hidden">dsds</button>
      )}
    </motion.div>
  );
};

export default CardLeft;
