import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Img from '../assets/image/kabirawan.jpg';
import morikoroMapImg from '../assets/image/morikoroMap.jpg';
import loadingGif from '../assets/image/loading.gif';
// import FileInputComponent from "react-file-input-previews-base64";
import { useState, useRef } from 'react';
import { positions } from '@mui/system';

import pageBackImg from '../assets/image/pageBackButton.jpg';
import irakoMapImg from '../assets/image/irakoMap.jpg';
import legoLandMapImg from '../assets/image/legoLandMap.jpg';

import { useAuth } from '../contexts/AuthContext';

function TripDetail() {
  const { tripsId } = useParams();
  const inputRef = useRef(null);
  const { userId } = useAuth();
  console.log('ユーザID', userId);

  //url定義
  let url;
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    url = 'https://ambassadors-btc5.com';
  } else {
    url = 'http://localhost:3000';
  }

  const handleSpotCheck = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(url + `/api/mission/gps/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            // latitude: 35.1654,
            // longitude: 136.899,
            spot_id: 9,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('エラー');
            }
            console.log(response.body);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
      (error) => {
        //失敗した場合
        console.log('失敗');
      }
    );

    // alert("来たぜボタンクリックされました！実装はまだです🙏");
  };

  const getFileAsBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(filePath);
      // ここまでで「resolve(e.target.result)」でbase64化された画像ファイルデータが返却される。
      // https://fujiten3.hatenablog.com/entry/2019/07/10/133132
      //
      // input type=fileとFileReader()の使い方は↓当たりも参照。
      // ここではreadAsDataURL()でBase64モードで読み込んだが、
      // テキストデータならreadAsText()でもよい。
      // https://into-the-program.com/javascript-read-the-file/
    });
  };

  const handleSelectPicture = async (e) => {
    const base64string = await getFileAsBase64(e.target.files[0]);
    // console.log("ここ2", inputRef.current.files[0].name);

    fetch(url + `/api/mission/photo/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ photo: base64string, spot_id: 9 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('エラー');
        }
        console.log(response.body);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const detailInfo = {
    name: 'モリコロ',
    mission1: '現地でボタンを押そう！',
    mission2: '〇〇している写真を撮ろう！',
    photo: morikoroMapImg,
  };

  const [clearFlg, setClearFlg] = useState(false);
  const controlClearFlg = () => {
    clearFlg ? setClearFlg(false) : setClearFlg(true);
  };

  return (
    <>
      <Header />
      <Link to="/tripsummary">
        <img src={pageBackImg} alt="#" className="content-pageBackImg" />
      </Link>
      <div className="trip-detail-content">
        <ul className="trip-detail-list">
          <li>
            <div className="trip-detail-mission">
              <div>{detailInfo.name}</div>

              <button onClick={controlClearFlg}>クリアフラグ</button>
              {clearFlg ? (
                <div>
                  <StarIcon sx={{ color: 'red' }} fontSize="large" />
                </div>
              ) : (
                <></>
              )}
              {/* <div>
                達成したら→



                <StarIcon sx={{ color: "red" }} fontSize="large" />
              </div> */}
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
                {/* スマホの場合はカメラ起動、PCの場合は画像選択 */}
                <Button variant="contained" component="label">
                  写真を撮る
                  <input
                    type="file"
                    capture="environment"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={inputRef}
                    onChange={handleSelectPicture}
                  />
                </Button>

                {/* 以下はカメラ起動が実装できれば不要 */}
                {/* <FileInputComponent
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
                /> */}
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
