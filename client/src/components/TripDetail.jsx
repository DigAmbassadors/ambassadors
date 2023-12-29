import { Link, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from './Header';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { useState, useRef } from 'react';
import { useTrips } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';

import pageBackImg from '../assets/image/pageBackButton.jpg';

function TripDetail() {
	const navigate = useNavigate();
	const inputRef = useRef(null);
	const { userId } = useAuth();
	const { spot } = useTrips();
	const { tripsId } = useParams();

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
						alert('登録が完了しました');
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
	//Mission2:写真の登録
	const handleSelectPicture = async (e) => {
		const base64string = await getFileAsBase64(e.target.files[0]);
		// console.log("ここ2", inputRef.current.files[0].name);

		fetch(url + `/api/mission/photo/${userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify({ photo: 'base64string', spot_id: spot.id }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('エラー');
				}
				alert('登録が完了しました');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const [clearFlg, setClearFlg] = useState(false);
	const controlClearFlg = () => {
		clearFlg ? setClearFlg(false) : setClearFlg(true);
	};

	return (
		<>
			<Header />
			<img
				src={pageBackImg}
				alt='#'
				className='content-pageBackImg'
				onClick={() => {
					navigate(-1);
				}}
			/>

			<div className='trip-detail-content'>
				<ul className='trip-detail-list'>
					<li>
						<div className='trip-detail-mission'>
							<div>{spot.name}</div>

							<button onClick={controlClearFlg}>クリアフラグ</button>
							{clearFlg ? (
								<div>
									<StarIcon sx={{ color: 'red' }} fontSize='large' />
								</div>
							) : (
								<></>
							)}
						</div>
					</li>
					<div className='trip-detail-img'>
						<img src={spot.photo} alt='仮の画像' />
					</div>
					<LoadScript googleMapsApiKey={import.meta.env.VITE_APIkey}>
						<GoogleMap mapContainerStyle={container} center={selectedPosition} zoom={15}>
							<Marker position={selectedPosition} />
						</GoogleMap>
					</LoadScript>
					<li>
						<div className='trip-detail-mission'>
							<div>Mission 1</div>
							<div>
								<Button variant='contained' onClick={handleSpotCheck}>
									来たぜ！
								</Button>
							</div>
						</div>
						<p>現地に行った記録を残そう！</p>
					</li>
					<li>
						<div className='trip-detail-mission'>
							<div>Mission 2</div>
							<div>
								{/* スマホの場合はカメラ起動、PCの場合は画像選択 */}
								<Button variant='contained' component='label'>
									写真を撮る
									<input
										type='file'
										capture='environment'
										accept='image/*'
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
						<p>{spot.mission}</p>
					</li>
				</ul>
			</div>
			{/* <img src={loadingGif} alt="仮の画像" /> */}
		</>
	);
}

export default TripDetail;
