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
  const [dataBaseKeyLeft, setdataBaseKeyLeft] = useState(-1);
  const [dataBaseKeyRight, setdataBaseKeyRight] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const [dataLeft, setDataLeft] = useState([]);
  const [searchQueryLeft, setsearchQueryLeft] = useState("");
  const [filteredDataLeft, setfilteredDataLeft] = useState([]);
  const [dataRight, setDataRight] = useState([]);
  const [searchQueryRight, setsearchQueryRight] = useState("");
  const [filteredDataRight, setfilteredDataRight] = useState([]);

  let defaultDateKey = -1;
  let defaultDateKeyRight = -1;

  useEffect(() => {
    setpageRefreshed(true);

    const fetchDataLeft = async () => {
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
    };

    const fetchDataRight = async () => {
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

    const fetchKeyLeft = async () => {
      const snapshotKeyLeft = await firebase
        .database()
        .ref("keys/leftKeys")
        .once("value");
      if (snapshotKeyLeft.val() !== null) {
        const fetchedKeyLeft = snapshotKeyLeft.val().fetchedKeyLeft;
        setdataBaseKeyLeft(fetchedKeyLeft);
      } else return;
    };

    const fetchKeyRight = async () => {
      const snapshotKeyRight = await firebase
        .database()
        .ref("keys/rightKeys")
        .once("value");
      if (snapshotKeyRight.val() !== null) {
        const fetchedKeyRight = snapshotKeyRight.val().fetchedKeyRight;
        setdataBaseKeyRight(fetchedKeyRight);
      } else return;
    };

    fetchDataLeft();
    fetchDataRight();
    fetchKeyLeft();
    fetchKeyRight();
  }, []);

  useEffect(() => {
    const fetchDataSearchLeft = async () => {
      const snapshotSearchLeft = await firebase
        .database()
        .ref("cards/left/content/")
        .once("value");
      if (snapshotSearchLeft.val() !== null) {
        const fetchedDataLeft = snapshotSearchLeft.val();
        setDataLeft(fetchedDataLeft);
      } else return;
    };

    const fetchDataSearchRight = async () => {
      const snapshotSearchRight = await firebase
        .database()
        .ref("cards/right/content/")
        .once("value");
      if (snapshotSearchRight.val() !== null) {
        const fetchedDataRight = snapshotSearchRight.val();
        setDataRight(fetchedDataRight);
      } else return;
    };

    fetchDataSearchLeft();
    fetchDataSearchRight();

    setleftCardAddInView(false);
    setrightCardAddInView(false);
  }, []);

  useEffect(() => {
    const filteredResults = dataLeft.filter((item) => {
      return item.value.toLowerCase().includes(searchQueryLeft.toLowerCase());
    });
    setfilteredDataLeft(filteredResults);
  }, [dataLeft, searchQueryLeft]);

  useEffect(() => {
    const filteredResultsRight = dataRight.filter((item) => {
      return item.value.toLowerCase().includes(searchQueryRight.toLowerCase());
    });
    setfilteredDataRight(filteredResultsRight);
  }, [dataRight, searchQueryRight]);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    setdataBaseKeyLeft(defaultDateKey);
    setdataBaseKeyRight(defaultDateKeyRight);

    firebase.database().ref().remove();
    window.location.reload(false);
  };

  const [leftCardAddInView, setleftCardAddInView] = useState(false);
  const [rightCardAddInView, setrightCardAddInView] = useState(false);

  const addCardLeft = () => {
    if (!leftCardAddInView) {
      const localStorageDatekeyNew = dataBaseKeyLeft + 1;
      const cardRef = firebase.database().ref(`keys/leftKeys`);
      cardRef.set({ fetchedKeyLeft: localStorageDatekeyNew });
      setdataBaseKeyLeft(localStorageDatekeyNew);

      setpageRefreshed(true);
      setdynamicCardLeft([
        ...dynamicCardLeft,
        <CardLeft
          editModeLeftDate={true}
          editModeLeftContent={true}
          cardRef="left"
          keyLeft={dataBaseKeyLeft + 1}
        />,
      ]);
      setleftCardAddInView(!leftCardAddInView);
    }
  };

  const addCardRight = () => {
    if (!rightCardAddInView) {
      const localStorageDatekeyNewRight = dataBaseKeyRight + 1;
      const cardRef = firebase.database().ref(`keys/rightKeys`);
      cardRef.set({ fetchedKeyRight: localStorageDatekeyNewRight });
      setdataBaseKeyLeft(localStorageDatekeyNewRight);

      setpageRefreshed(true);
      setdynamicCardRight([
        ...dynamicCardRight,
        <CardRight
          editModeRightDate={true}
          editModeRightContent={true}
          cardRef="right"
          keyRight={dataBaseKeyRight + 1}
        />,
      ]);
      setrightCardAddInView(!rightCardAddInView);
    }
  };

  return (
    <div className="outer-container bg-[#2B2B2B]">
      <div className="mainCard bg-[#47ABAB] rounded-[20px]">
        <div className="line"></div>
        <TopPart></TopPart>
        <div className="middlePart">
          <div className="leftOut">
            <input
              className="searchField"
              type="text"
              placeholder="Search text..."
              value={searchQueryLeft}
              onChange={(e) => setsearchQueryLeft(e.target.value)}
            />

            {!(dynamicCardLeft.length === 0 && pageRefreshed) ? (
              dynamicCardLeft.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))
            ) : dateReadFromDB != null && filteredDataLeft === null ? (
              contentReadFromDB.map((comp, index) => (
                <CardLeft
                  dateFromDB={dateReadFromDB[index].value}
                  contentFromDB={contentReadFromDB[index].value}
                  editModeLeftDate={true}
                  editModeLeftContent={true}
                  cardRef="left"
                  keyLeft={index}
                />
              ))
            ) : filteredDataLeft !== null ? (
              filteredDataLeft.map((item, index) => (
                <CardLeft
                  dateFromDB={dateReadFromDB[index].value}
                  contentFromDB={item.value}
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
            <input
              className="searchField"
              type="text"
              placeholder="Search text..."
              value={searchQueryRight}
              onChange={(e) => setsearchQueryRight(e.target.value)}
            />
            {!(dynamicCardRight.length === 0 && pageRefreshed) ? (
              dynamicCardRight.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))
            ) : dateReadFromDBRight != null && filteredDataRight === null ? (
              contentReadFromDBRight.map((comp, index) => (
                <CardRight
                  dateFromDB={dateReadFromDBRight[index].value}
                  contentFromDB={contentReadFromDBRight[index].value}
                  editModeRightDate={true}
                  editModeRightContent={true}
                  cardRef="right"
                  keyRight={index}
                />
              ))
            ) : filteredDataRight !== null ? (
              filteredDataRight.map((item, index) => (
                <CardRight
                  dateFromDB={dateReadFromDBRight[index].value}
                  contentFromDB={item.value}
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
