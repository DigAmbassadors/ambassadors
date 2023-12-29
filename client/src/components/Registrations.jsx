import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/map.css';

const Registrations = (props) => {
	const { selectedPosition } = props;
	const navigate = useNavigate();

	//url定義-----------------------------------------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

	// スポット名---------------------------------------------------------------
	const [spotName, setSpotName] = useState(false);

	// エリア選択欄を作成--------------------------------------------------------
	const [areas, setAreas] = useState(['']);
	useEffect(() => {
		const getFetch = async () => {
			try {
				const response = await fetch(url + `/api/areas`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});

				if (!response.ok) {
					console.error('Network response was not ok');
					return;
				}

				const areas = await response.json();
				areas.unshift('新エリア名を記入');
				if (areas.length > 0) {
					setAreas(areas);
					setSelectedArea(areas[0]);
				}
			} catch (error) {
				console.error('Error during get trips:', error);
				return;
			}
		};
		getFetch();
	}, []);

	const makeAreaSelect = () => {
		return (
			<select value={selectedArea} onChange={handleAreaChange}>
				{areas.map((area, idx) => (
					<option key={idx} value={area}>
						{area}
					</option>
				))}
			</select>
		);
	};

	// 選択されたエリアを検知
	const [selectedArea, setSelectedArea] = useState(false);
	const handleAreaChange = (e) => {
		setSelectedArea(e.target.value);
		if (e.target.value === '新エリア名を記入') {
			setNewName(false);
		}
	};

	// 新エリア名の入力欄
	const [newName, setNewName] = useState(false);

	// ミッション２-----------------------------------------------------------------
	const [mission2, setMission2] = useState(false);

	// 画像選択-----------------------------------------------------------------
	const [spotPhoto, setSpotPhoto] = useState('');
	const refPhoto = React.useRef();
	const handleClickPhoto = () => refPhoto.current.click();
	const handleSetPhoto = (e, setfunc) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setfunc(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// 登録ボタン---------------------------------------------------------------
	const handleSubmit = async () => {
		// エリア名を検出
		let areaFinal = false;
		if (selectedArea === '新エリア名を記入') {
			areaFinal = newName;
		} else {
			areaFinal = selectedArea;
		}

		//未入力チェック
		console.log('スポット名', spotName);
		console.log('エリア選択', areaFinal);
		console.log('ミッション２', mission2);
		console.log('画像', spotPhoto ? true : false);
		console.log('緯度経度', selectedPosition);
		if (!spotName || !areaFinal || !spotPhoto) {
			console.log('未入力だよ');
			window.alert('入力内容に不備があるよ！');
			return;
		}

		//送信
		try {
			const response = await fetch(url + '/api/newspot', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: spotName,
					area: areaFinal,
					mission: mission2,
					photo: spotPhoto,
					longitude: selectedPosition.lng,
					latitude: selectedPosition.lat,
				}),
			});

			if (response.ok) {
				window.alert('登録しました！');
				navigate('/usertop');
			} else {
				window.alert('登録に失敗しました！');
			}
		} catch (error) {
			console.log(error);
		}
	};

	// `戻るボタン---------------------------------------------------------------
	const handleBack = () => {
		navigate('/usertop');
	};

	//表示 --------------------------------------------------------------------
	return (
		<div>
			<section>
				<p>スポット名</p>
				<input type='text' onChange={(e) => setSpotName(e.target.value)} />
			</section>

			<section>
				<p>エリア選択</p>
				{makeAreaSelect()}
				{selectedArea === '新エリア名を記入' && (
					<input type='text' placeholder='新エリア名' onChange={(e) => setNewName(e.target.value)} />
				)}
			</section>

			<section>
				<p>ミッション２</p>
				<input type='text' onChange={(e) => setMission2(e.target.value)} />
			</section>

			<section>
				<p>スポット写真</p>
				<button className='vertical-button' onClick={handleClickPhoto}>画像を選択</button>
				<input
					type='file'
					style={{ display: 'none' }}
					ref={refPhoto}
					onChange={(e) => handleSetPhoto(e, setSpotPhoto)}
				/>
				{spotPhoto && <img className='spotImg' src={spotPhoto} alt='スポット写真'></img>}
			</section>

			<button className='vertical-button' onClick={handleSubmit}>上記の内容で保存する</button>
		</div>
	);
};

export default Registrations;
