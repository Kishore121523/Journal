import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { InputEmojiLeft, InputEmojiRight } from "..";
import firebase from "../../firebaseConfig";
import ying from "../../assets/ying.png";

const TopPart = () => {
  const [emojiLeft, setemojiLeft] = useState("😉");
  const [emojiRight, setemojiRight] = useState("😉");
  const [picVisible, setpicVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageInDB, setimageInDB] = useState(null);
  const fileInputRef = useRef(null);
  //emojiLeft
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase
        .database()
        .ref("topPart/leftEmoji/")
        .once("value");
      const fetchedData = snapshot.val();
      fetchedData ? setemojiLeft(fetchedData) : setemojiLeft("");
      //emojiRight
      const snapshotRight = await firebase
        .database()
        .ref("topPart/rightEmoji/")
        .once("value");
      const fetchedDataRight = snapshotRight.val();
      fetchedDataRight ? setemojiRight(fetchedDataRight) : setemojiRight("");
      //image
      const database = firebase.database();
      const imageRef = database.ref("images");

      imageRef
        .once("value")
        .then((snapshot) => {
          const images = snapshot.val();
          setimageInDB(images);
          setImageUrl(images.image);
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });
    };
    fetchData();
  }, []);

  const handleImageUpload = (event) => {
    setpicVisible(!picVisible);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;
      setImageUrl(base64Image);
      uploadImageToFirebase(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = (base64Image) => {
    const database = firebase.database();
    const imageRef = database.ref("images");

    imageRef
      .set({
        image: base64Image,
      })
      .then(() => {
        console.log("Image uploaded successfully!");
        window.location.reload(false);
      })
      .catch((error) => {
        alert("Error Uploading Image" + error);
      });
  };

  const handleChooseImage = () => {
    fileInputRef.current.click();
  };

  const picDoubeClicked = () => {
    setpicVisible(!picVisible);
    fileInputRef.current.click();
  };

  return (
    <div className="topPart">
      <div className="name1Div">
        <InputEmojiLeft
          emojiFromDB={emojiLeft.value ? emojiLeft.value : "😉"}
          cardRef="leftEmoji"
        />

        <p className="name name1">Kishoouure</p>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        <button
          className={imageInDB !== null ? "hidden" : "picInput"}
          onDoubleClick={handleChooseImage}
        >
          <img src={ying} alt="" className="ying" />
        </button>

        {imageUrl && (
          <motion.img
            src={imageUrl}
            onDoubleClick={picDoubeClicked}
            className={imageInDB !== null ? "pic cursor-pointer" : "hidden"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.3 }}
            alt=""
          />
        )}
      </div>

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
