import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import morikoroImg from "./assets/image/morikoro.jpg";
import morikoroImg from "../assets/image/morikoroEntrance.jpg";
import legoLandImg from "../assets/image/legoLandEntrance.jpg";
import irakoImg from "../assets/image/irakoEntrance.jpg";
import iconMapImg from "../assets/image/iconMap.jpg";
import keyIconCloseImg from "../assets/image/keyIconClose.jpg";
import pageBackImg from "../assets/image/pageBackButton.jpg";
import Header from "./Header";

function TripSummary() {
  //   useEffect(() => {}, []);
  // const navigate = useNavigate();
  // navigate("/TripSummary");

  const place0 = {
    name: "モリコロ",
    photo: morikoroImg,
  };
  const place1 = {
    name: "レゴランド",
    photo: legoLandImg,
  };
  const place2 = {
    name: "伊良子岬",
    photo: irakoImg,
  };

  const [clearFlg1, setClearFlg1] = useState(false);
  const controlClearFlg1 = () => {
    clearFlg1 ? setClearFlg1(false) : setClearFlg1(true);
  };

  const [clearFlg2, setClearFlg2] = useState(false);
  const controlClearFlg2 = () => {
    clearFlg2 ? setClearFlg2(false) : setClearFlg2(true);
  };

  return (
    <>
      <Header />
      <Link to="/tripstart">
        <img src={pageBackImg} alt="#" className="content-pageBackImg" />
      </Link>
      <div className="tripsummary-content">
        <br />
        {clearFlg1 ? <></> : <p>次の行き先はここだ！！</p>}
        <br />
        <br />

        <Link to="/tripdetail">
          <img
            src={place0.photo}
            alt="#"
            className="tripsummary-content-image"
          />
          <br />
        </Link>
        <button onClick={controlClearFlg1}>クリアフラグ1</button>
        <br />
        <br />
        {clearFlg1 ? (
          <>
            {clearFlg2 ? <></> : <p>次の行き先はここだ！！</p>}
            <Link to="/tripdetail">
              <img
                src={place1.photo}
                alt="#"
                className="tripsummary-content-image"
              />
            </Link>
          </>
        ) : (
          <>
            <div className="tripsummary-content-wrapped">
              <img
                src={place1.photo}
                alt="#"
                className="tripsummary-content-image-filter"
              />
              <img
                src={keyIconCloseImg}
                alt="#"
                className="tripsummary-content-image-keyclose"
              />
            </div>
            <br />
            <img
              src={iconMapImg}
              alt="#"
              className="tripsummary-content-image-icon"
            />
            <p>前のミッションをクリアするまで表示できません</p>
          </>
        )}
        <button onClick={controlClearFlg2}>クリアフラグ2</button>
        <br />
        <br />
        {clearFlg2 ? (
          <>
            {clearFlg1 ? <p>次の行き先はここだ！！</p> : <></>}
            <Link to="/tripdetail">
              <img
                src={place2.photo}
                alt="#"
                className="tripsummary-content-image"
              />
            </Link>
          </>
        ) : (
          <>
            <div className="tripsummary-content-wrapped">
              <img
                src={place2.photo}
                alt="#"
                className="tripsummary-content-image-filter"
              />
              <img
                src={keyIconCloseImg}
                alt="#"
                className="tripsummary-content-image-keyclose"
              />
            </div>
            <br />
            <img
              src={iconMapImg}
              alt="#"
              className="tripsummary-content-image-icon"
            />
            <p>前のミッションをクリアするまで表示できません</p>
          </>
        )}
      </div>
    </>
  );
}
export default TripSummary;
