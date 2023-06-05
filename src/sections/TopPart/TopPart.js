import React from "react";
// import img1 from "../../assets/img1.PNG";
import { motion } from "framer-motion";
import { InputEmojiLeft, InputEmojiRight } from "..";

const TopPart = () => {
  return (
    <div className="topPart">
      <div className="name1Div">
        <InputEmojiLeft />
        <p className="name name1">Kishoouure</p>
      </div>
      <motion.img
        className="pic cursor-pointer	"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        drag
        dragSnapToOrigin
        whileDrag={{ scale: 1.3 }}
        src="s"
        alt=""
      />
      <div className="name2Div">
        <p className="name name2">Kishoree</p>
        <InputEmojiRight />
      </div>
    </div>
  );
};

export default TopPart;
