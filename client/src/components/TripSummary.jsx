import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import morikoroImg from "./assets/image/morikoro.jpg";
import morikoroMapImg from "../assets/image/morikoroMap.jpg";
import morikoroImg from "../assets/image/morikoroEntrance.jpg";
import legoLandMapImg from "../assets/image/legoLandMap.jpg";
import legoLandImg from "../assets/image/legoLandEntrance.jpg";
import irakoMapImg from "../assets/image/irakoMap.jpg";
import irakoImg from "../assets/image/irakoEntrance.jpg";
import iconMapImg from "../assets/image/iconMap.jpg";
import keyIconCloseImg from "../assets/image/keyIconClose.jpg";
import keyIconOpenImg from "../assets/image/keyIconOpen.jpg";
import Header from "./Header";

function TripSummary() {
  //   useEffect(() => {}, []);
  const navigate = useNavigate();
  navigate("/TripSummary");
  return (
    <>
      <Header />
      <div className="tripsummary-content">
        <br />
        <br />
        <br />
        <br />
        <p>次の行き先はここだ！！</p>
        <br />
        <br />
        {/* <img src={morikoroImg} alt="#" /> */}

        <Link to="/TripDetail">
          <img
            src={morikoroImg}
            alt="#"
            className="tripsummary-content-image"
          />
          <br />
          {/* <img
            src={iconMapImg}
            alt="#"
            className="tripsummary-content-image-icon"
          />
          <p>モリコロパーク</p> */}
        </Link>

        <br />
        <br />

        <div className="tripsummary-content-hatching">
          <img
            src={legoLandImg}
            alt="#"
            className="tripsummary-content-image"
          />
          <br />
          {/* <img
            src={iconMapImg}
            alt="#"
            className="tripsummary-content-image-icon"
          />
          <p>レゴランド</p> */}
        </div>
        <br />
        <br />

        <div className="tripsummary-content-hatching">
          <div className="irakoImg-wrraped">
            <img src={irakoImg} alt="#" className="tripsummary-content-image" />
            <img
              src={keyIconCloseImg}
              alt="#"
              className="tripsummary-content-image-keyclose"
            />
            <br />
            <img
              src={iconMapImg}
              alt="#"
              className="tripsummary-content-image-icon"
            />
            <p>前のミッションをクリアするまで表示できません</p>
          </div>
          <br />
          {/* <img
            src={iconMapImg}
            alt="#"
            className="tripsummary-content-image-icon"
          />
          <p>伊良子岬</p> */}
        </div>
      </div>
    </>
  );
}
export default TripSummary;
