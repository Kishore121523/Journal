import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import { TopPart, CardLeft, CardRight } from "./sections";
import { motion } from "framer-motion";
import firebase from "./firebaseConfig";

const App = () => {
  const [dynamicCardLeft, setdynamicCardLeft] = useState([]);
  const [dynamicCardRight, setdynamicCardRight] = useState([]);
  const [dateReadFromDB, setdateReadFromDB] = useState([{}]);
  const [contentReadFromDB, setcontentReadFromDB] = useState([{}]);
  const [dateReadFromDBRight, setdateReadFromDBRight] = useState([{}]);
  const [contentReadFromDBRight, setcontentReadFromDBRight] = useState([{}]);
  const [pageRefreshed, setpageRefreshed] = useState(false);
  const [localStorageDatekey, setlocalStorageDatekey] = useState(0);
  const [localStorageDatekeyRight, setlocalStorageDatekeyRight] = useState(0);
  const [showModal, setShowModal] = useState(false);

  let defaultDateKey = 0;
  let defaultDateKeyRight = 0;

  useEffect(() => {
    setpageRefreshed(true);

    const fetchData = async () => {
      const snapshot = await firebase
        .database()
        .ref("cards/left/date/")
        .once("value");
      const fetchedData = snapshot.val();
      setdateReadFromDB(fetchedData);

      const snapshotContent = await firebase
        .database()
        .ref("cards/left/content/")
        .once("value");
      const fetchedContent = snapshotContent.val();
      setcontentReadFromDB(fetchedContent);

      const snapshotRight = await firebase
        .database()
        .ref("cards/right/date/")
        .once("value");
      const fetchedDataRight = snapshotRight.val();
      setdateReadFromDBRight(fetchedDataRight);

      const snapshotContentRight = await firebase
        .database()
        .ref("cards/right/content/")
        .once("value");
      const fetchedContentRight = snapshotContentRight.val();
      setcontentReadFromDBRight(fetchedContentRight);
    };

    fetchData();

    const storedValue = localStorage.getItem("dateLocalStorageKey");
    if (storedValue) {
      setlocalStorageDatekey(parseInt(storedValue));
    }
    const storedValueRight = localStorage.getItem("dateLocalStorageKeyRight");
    if (storedValueRight) {
      setlocalStorageDatekeyRight(parseInt(storedValueRight));
    }
  }, []);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    setlocalStorageDatekey(defaultDateKey);
    setlocalStorageDatekeyRight(defaultDateKeyRight);
    localStorage.setItem("dateLocalStorageKey", defaultDateKey.toString());
    localStorage.setItem(
      "dateLocalStorageKeyRight",
      defaultDateKeyRight.toString()
    );
    firebase.database().ref().remove();
    window.location.reload(false);
  };

  const addCardLeft = () => {
    let localStorageDatekeyNew = localStorageDatekey + 1;
    setlocalStorageDatekey(localStorageDatekeyNew);
    localStorage.setItem(
      "dateLocalStorageKey",
      localStorageDatekeyNew.toString()
    );
    setpageRefreshed(true);
    setdynamicCardLeft([
      ...dynamicCardLeft,
      <CardLeft cardRef="left" keyLeft={localStorageDatekey} />,
    ]);
  };
  const addCardRight = () => {
    let localStorageDatekeyNewRight = localStorageDatekeyRight + 1;
    setlocalStorageDatekeyRight(localStorageDatekeyNewRight);
    localStorage.setItem(
      "dateLocalStorageKeyRight",
      localStorageDatekeyNewRight.toString()
    );
    setpageRefreshed(true);
    setdynamicCardRight([
      ...dynamicCardRight,
      <CardRight cardRef="right" keyRight={localStorageDatekeyRight} />,
    ]);
  };

  return (
    <div className="outer-container bg-[#2B2B2B]">
      <div className="mainCard bg-[#47ABAB] rounded-[20px]">
        <div className="line"></div>
        <TopPart></TopPart>
        <div className="middlePart">
          <div className="leftOut">
            {!(dynamicCardLeft.length === 0 && pageRefreshed) ? (
              dynamicCardLeft.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))
            ) : dateReadFromDB != null ? (
              contentReadFromDB.map((comp, index) => (
                <CardLeft
                  dateFromDB={dateReadFromDB[index].value}
                  contentFromDB={contentReadFromDB[index].value}
                  cardRef="left"
                  keyLeft={index}
                />
              ))
            ) : (
              <div className="text-center	pt-6 addNoteText">
                Press Add Note button to get started
              </div>
            )}
          </div>

          <div className="rightOut">
            {!(dynamicCardRight.length === 0 && pageRefreshed) ? (
              dynamicCardRight.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))
            ) : dateReadFromDBRight != null ? (
              contentReadFromDBRight.map((comp, index) => (
                <CardRight
                  dateFromDB={dateReadFromDBRight[index].value}
                  contentFromDB={contentReadFromDBRight[index].value}
                  cardRef="right"
                  keyRight={index}
                />
              ))
            ) : (
              <div className="text-center	pt-6 addNoteText">
                Press Add Note button to get started
              </div>
            )}
          </div>
        </div>
        <div className="bottomPart">
          <div className="bottomLeft">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="leftAddBtn"
              onClick={addCardLeft}
            >
              Add Note
            </motion.button>
          </div>
          <div className="bottomRight">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rightAddBtn"
              onClick={addCardRight}
            >
              Add Note
            </motion.button>
          </div>
        </div>
        <div className="btnResetDiv">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rightAddBtn btnReset"
            onClick={handleDeleteClick}
          >
            Reset
          </motion.button>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="font-bold text-rose-500">Confirm Delete</h2>
              <p>Are you sure you want to delete all the data?</p>
              <div className="button-container">
                <button onClick={handleConfirmDelete}>Delete</button>
                <button onClick={handleCancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
