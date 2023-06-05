import React from "react";
import { motion } from "framer-motion";
import { InputField, InputFieldContent } from "../";

const CardLeft = (props) => {
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
      />
    </motion.div>
  );
};

export default CardLeft;
