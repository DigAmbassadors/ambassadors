import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import morikoroImg from "./assets/image/morikoro.jpg";
import morikoroMapImg from "../assets/image/morikoroMap.jpg";
import legoLandMapImg from "../assets/image/legoLandMap.jpg";
import irakoMapImg from "../assets/image/irakoMap.jpg";
import iconMapImg from "../assets/image/iconMap.jpg";
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

        <img
          src={morikoroMapImg}
          alt="#"
          className="tripsummary-content-image"
        />
        <br />
        <img
          src={iconMapImg}
          alt="#"
          className="tripsummary-content-image-icon"
        />
        <p>モリコロパーク</p>

        <br />
        <br />

        <div className="tripsummary-content-hatching">
          <img
            src={legoLandMapImg}
            alt="#"
            className="tripsummary-content-image"
          />
          <br />
          <img
            src={iconMapImg}
            alt="#"
            className="tripsummary-content-image-icon"
          />
          <p>レゴランド</p>
        </div>
        <br />
        <br />
        <div className="tripsummary-content-hatching">
          <img
            src={irakoMapImg}
            alt="#"
            className="tripsummary-content-image"
          />
          <br />
          <img
            src={iconMapImg}
            alt="#"
            className="tripsummary-content-image-icon"
          />
          <p>伊良子岬</p>
        </div>
      </div>
    </>
  );
}
export default TripSummary;
