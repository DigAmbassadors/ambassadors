import { Link } from "react-router-dom";
import Header from "./Header";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import Img from "../assets/image/kabirawan.jpg";
import loadingGif from "../assets/image/loading.gif";
// import { alpha } from "@mui/material";
import FileInputComponent from "react-file-input-previews-base64";

function TripDetail() {
  const handleSpotCheck = () => {
    alert("来たぜボタンクリックされました！実装はまだです🙏");
  };

  // const handleSelectPicture = () => {
  //   alert("写真を選択ボタンクリックされました！実装はまだです🙏");
  // };

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
          <li>
            <div className="trip-detail-mission">
              <div>{detailInfo.name}</div>
              <div>
                達成したら→
                <StarIcon sx={{ color: "red" }} fontSize="large" />
              </div>
            </div>
          </li>
          <div className="trip-detail-img">
            <img src={detailInfo.photo} alt="仮の画像" />
          </div>
          <li>
            <div className="trip-detail-mission">
              <div>Mission 1</div>
              <div>
                {/* <input type="button" value="来たぜ！" /> */}
                <Button variant="contained" onClick={handleSpotCheck}>
                  来たぜ！
                </Button>
              </div>
            </div>
            <p>{detailInfo.mission1}</p>
          </li>
          <li>
            <div className="trip-detail-mission">
              <div>Mission 2</div>
              <div>
                {/* <Button variant="contained" onClick={handleSelectPicture}>
                  写真を選択
                </Button> */}
                <FileInputComponent
                  parentStyle={{}} //スタイル
                  labelStyle={{ display: "none" }}
                  imagePreview={true} //ファイルのプレビュー
                  multiple={false} //複数ファイル選択
                  callbackFunction={(file) => {
                    //選択後のコールバック関数、表示しているが別途保存が必要
                    console.log(file);
                  }}
                  buttonComponent={
                    //クリック時に選択ダイアログを開くコンポーネント
                    <Button variant="contained">写真を選択</Button>
                  }
                  accept="image/*" //許可するファイルのtype
                />
              </div>
            </div>
            <p>{detailInfo.mission2}</p>
          </li>
        </ul>
      </div>
      {/* <img src={loadingGif} alt="仮の画像" /> */}
    </>
  );
}

export default TripDetail;
