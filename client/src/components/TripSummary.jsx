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
import pageBackImg from "../assets/image/pageBackButton.jpg";
import Header from "./Header";

function TripSummary() {
  //   useEffect(() => {}, []);
  // const navigate = useNavigate();
  // navigate("/TripSummary");

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
        <p>次の行き先はここだ！！</p>
        <br />
        <br />

        <Link to="/tripdetail">
          <img
            src={morikoroImg}
            alt="#"
            className="tripsummary-content-image"
          />
          <br />
        </Link>

        <button onClick={controlClearFlg1}>クリアフラグ1</button>

        {/* <Link to="/TripDetail">
          <img
            src={morikoroImg}
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
        </Link> */}

        {/* {clearFlg1 ? (
          <Link to="/TripDetail">
            <img
              src={legoLandImg}
              alt="#"
              className="tripsummary-content-image"
            />
            <br />
          </Link>
        ) : (
          <>
            <img
              src={legoLandImg}
              alt="#"
              className="tripsummary-content-image-filter"
            />
            <br />
          </>
        )} */}

        {/* <div className="tripsummary-content-hatching">
          <img
            src={legoLandImg}
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
        </div> */}
        <br />
        <br />

        {clearFlg1 ? (
          <Link to="/TripDetail">
            <img
              src={legoLandImg}
              alt="#"
              className="tripsummary-content-image"
            />
          </Link>
        ) : (
          <>
            <div className="tripsummary-content-wrapped">
              <img
                src={legoLandImg}
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
          <Link to="/TripDetail">
            <img src={irakoImg} alt="#" className="tripsummary-content-image" />
          </Link>
        ) : (
          <>
            <div className="tripsummary-content-wrapped">
              <img
                src={irakoImg}
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

        {/* <div className="tripsummary-content-hatching">
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
        </div> */}
      </div>
    </>
  );
}
export default TripSummary;
