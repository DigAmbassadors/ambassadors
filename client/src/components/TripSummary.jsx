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
      <div>
        <br />
        <br />
        <br />
        <br />
        <p>次の行き先はここだ！！</p>
        {/* <img src={morikoroImg} alt="#" /> */}
        <img src={morikoroMapImg} alt="#" />
        <br />
        <img src={iconMapImg} alt="#" />
        <p>モリコロパーク</p>
        <br />
        <img src={legoLandMapImg} alt="#" />
        <br />
        <img src={iconMapImg} alt="#" />
        <p>レゴランド</p>
        <br />

        <img src={irakoMapImg} alt="#" />
        <br />
        <img src={iconMapImg} alt="#" />
        <p>伊良子岬</p>
      </div>
    </>
  );
}
export default TripSummary;
