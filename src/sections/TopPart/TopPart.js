import React, { useState, useEffect } from "react";
// import img1 from "../../assets/img1.PNG";
import { motion } from "framer-motion";
import { InputEmojiLeft, InputEmojiRight } from "..";
import firebase from "../../firebaseConfig";

const TopPart = () => {
  const [emojiLeft, setemojiLeft] = useState("😉");
  const [emojiRight, setemojiRight] = useState("😉");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase
        .database()
        .ref("topPart/leftEmoji/")
        .once("value");
      const fetchedData = snapshot.val();
      fetchedData ? setemojiLeft(fetchedData) : setemojiLeft("");

      const snapshotRight = await firebase
        .database()
        .ref("topPart/rightEmoji/")
        .once("value");
      const fetchedDataRight = snapshotRight.val();
      fetchedDataRight ? setemojiRight(fetchedDataRight) : setemojiRight("");
    };
    fetchData();
  }, []);
  return (
    <div className="topPart">
      <div className="name1Div">
        <InputEmojiLeft
          emojiFromDB={emojiLeft.value ? emojiLeft.value : "😉"}
          cardRef="leftEmoji"
        />

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
        <InputEmojiRight
          emojiFromDB={emojiRight.value ? emojiRight.value : "😉"}
          cardRef="rightEmoji"
        />
      </div>
    </div>
  );
};

export default TopPart;
