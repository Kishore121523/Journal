import React from "react";
import { motion } from "framer-motion";
import { InputField, InputFieldContent } from "../";

const CardRight = (props) => {
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
      />
    </motion.div>
  );
};

export default CardRight;
