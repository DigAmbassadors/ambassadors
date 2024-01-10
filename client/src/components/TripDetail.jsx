import { Link, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from './Header';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { useState, useRef, useEffect } from 'react';
import { useTrips } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';
import Achieve from '../assets/image/achieve.jpg';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function TripDetail() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { userId } = useAuth();
  const { spot } = useTrips();
  const { tripsId } = useParams();
  const [singleRecord, setSingleRecord] = useState([]);

  // 達成時のイベント
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //url定義
  let url;
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    url = 'https://ambassadors-btc5.com';
  } else {
    url = 'http://localhost:3000';
  }

  //googlemap設定
  const container = {
    width: '100%',
    height: '80vw',
  };

  const selectedPosition = {
    lat: Number(spot.latitude),
    lng: Number(spot.longitude),
  };

  //Mission1:GPSの登録
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
            spot_id: spot.id,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('エラー');
            }
            getSingleRecord();
            setOpen(true);
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
  };

  //Mission2:写真時のBase64変換
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

  const getFileAsBase64_2 = (e) => {
    return new Promise((resolve, reject) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('ファイルが選択されていません。'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 400; // 最大サイズ
          let width = img.width;
          let height = img.height;

          // アスペクト比を保持しながらサイズを調整
          if (width > height && width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          } else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL()); // DataURLをPromiseとして返す
        };
        img.onerror = () => {
          reject(new Error('画像の読み込みに失敗しました。'));
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        reject(new Error('ファイルの読み込みに失敗しました。'));
      };
      reader.readAsDataURL(file);
    });
  };

  //Mission2:写真の登録
  const handleSelectPicture = async (e) => {
    // const base64string = await getFileAsBase64(e.target.files[0]);
    const base64string = await getFileAsBase64_2(e);

    fetch(url + `/api/mission/photo/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ photo: base64string, spot_id: spot.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('エラー');
        }
        getSingleRecord();
        setOpen(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('写真登録エラー');
      });
  };

  //達成状況の取得
  const getSingleRecord = async () => {
    try {
      const response = await fetch(
        url + `/api/users/${userId}/record/${spot.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      const data = await response.json();
      setSingleRecord(data); //[{},{},{}]
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    getSingleRecord();
  }, []);

  return (
    <>
      <Header show={true} />
      <h1>{spot.name}</h1>
      <div className="trip-detail-fin">
        {singleRecord[0]?.finish ? (
          <div>
            <StarIcon sx={{ color: 'yellow' }} fontSize="large" />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="trip-detail-content">
        <img
          className="trip-detail-img"
          src={spot.photo}
          alt={`${spot.name}の画像`}
        />

        <LoadScript googleMapsApiKey={import.meta.env.VITE_APIkey}>
          <GoogleMap
            mapContainerStyle={container}
            center={selectedPosition}
            zoom={15}
          >
            <Marker position={selectedPosition} />
          </GoogleMap>
        </LoadScript>

        <div className="trip-detail-mission">
          <p className="mission-title">Mission 1</p>
          <p className="mission-content">現地に行った記録を残そう！</p>
          {singleRecord[0]?.arrived ? (
            <div className="trip-detail-fin-button">
              <Button variant="contained">完了</Button>
            </div>
          ) : (
            <div className="trip-detail-button1">
              <Button variant="contained" onClick={handleSpotCheck}>
                来たぜ！
              </Button>
            </div>
          )}
        </div>

        <div className="trip-detail-mission">
          <p className="mission-title">Mission 2</p>
          <p className="mission-content">{spot.mission}</p>
          {singleRecord[0]?.photo ? (
            <div className="trip-detail-button2">
              <Button
                variant="contained"
                component="label"
                style={{ backgroundColor: '#959595' }}
              >
                完了(再撮影)
                <input
                  type="file"
                  capture="environment"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={inputRef}
                  onChange={handleSelectPicture}
                />
              </Button>
            </div>
          ) : (
            <div className="trip-detail-button2">
              {/* スマホの場合はカメラ起動、PCの場合は画像選択 */}

              <Button
                variant="contained"
                component="label"
                style={{ backgroundColor: '#ec2761' }}
              >
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
          )}
        </div>
        {singleRecord[0]?.photo ? (
          <>
            <p
              style={{
                fontSize: '20px',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              {'- 投稿した写真 -'}
            </p>
            <img
              className="trip-detail-img"
              src={singleRecord[0]?.photo}
              alt={`${spot.name}で撮影した画像`}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img
            src={Achieve}
            alt="Your Image"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TripDetail;
