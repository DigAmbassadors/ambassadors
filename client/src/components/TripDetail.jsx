import { Link } from "react-router-dom";
import Header from "./Header";

import Img from "../assets/image/kabirawan.jpg";

function TripDetail() {
  const detailInfo = {
    name: "モリコロ",
    mission1: "現地でボタンを押そう！",
    mission2: "〇〇している写真を撮ろう！",
    photo: Img,
  };
  return (
    <>
      <Header />
      <div className="trip-detail-content">
        <ul className="trip-detail-list">
          <li>{detailInfo.name}</li>
          <div className="trip-detail-img">
            <img src={detailInfo.photo} alt="仮の画像" />
          </div>
          <li>
            <div className="trip-detail-mission">
              <div>ミッション１</div>
              <div>
                <input type="button" value="来たぜ！" />
              </div>
            </div>
            <p>{detailInfo.mission1}</p>
          </li>
          <li>
            <div className="trip-detail-mission">
              <div>ミッション２</div>
              <div>
                <input type="button" value="写真を選択" />
              </div>
            </div>
            <p>{detailInfo.mission2}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TripDetail;
