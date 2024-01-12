import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTrips } from '../contexts/TripContext';
import Header from './Header';
import Button from '@mui/material/Button';

function TripStart() {
	// 汎用フックス-------------------------------
	const { userId } = useAuth();
	const navigate = useNavigate();
	const { trips, setTrips } = useTrips();
  const [selectedGroup, setSelectedGroup] = useState(-1);

	//url定義-----------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

	// グループ選択 -------------------------------
  const [groups, setGroups] = useState(['個人']);
  useEffect(()=>{
    getJoinedGroup();
  },[])

  const getJoinedGroup = async () => {
		try {
			const response = await fetch(url + `/api/groups/${userId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});

			if (!response.ok) {
				window.alert('取得に失敗しました！');
			}

			const data = await response.json();
			setGroups(data);
		} catch (error) {
			console.log('error', error);
		}
	};

	const makeGroupSelect = () => {
		return (
			<select value={selectedGroup} onChange={handleGroupChange}>
				{groups.map((group, idx) => (
					<option key={idx} value={group.id}>
						{group.name}
					</option>
				))}
        <option value='-1'>個人</option>
			</select>
		);
	};

	const handleGroupChange = async (e) => {
		setSelectedGroup(Number(e.target.value));
	};

	//テーマ選択欄を作成----------------------------
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
			<>
				<select value={selectedArea} onChange={handleAreaChange}>
					{areas.map((area, idx) => (
						<option key={idx} value={area}>
							{area}
						</option>
					))}
				</select>
				<br />
				<select
					value={selectedNum}
					onChange={handleNumChange}
					style={{
						width: '50px',
					}}
				>
					{Array.from({ length: num }, (_, index) => index + 1).map((number, idx) => (
						<option key={idx} value={number}>
							{number}
						</option>
					))}
				</select>
				<a
					style={{
						fontSize: '16.6px',
					}}
				>
					このスポット数でプラン生成
				</a>
			</>
		);
	};

	//選択されたテーマを検知--------------------------
	const [selectedArea, setSelectedArea] = useState('');
	const [num, setNum] = useState(3);
	const [selectedNum, setSelectedNum] = useState(1);

	const handleAreaChange = async (e) => {
		setSelectedArea(e.target.value);
	};

	const handleNumChange = (e) => {
		setSelectedNum(e.target.value);
	};

	useEffect(() => {
		const getNum = async () => {
			try {
				const response = await fetch(url + `/api/spots/${userId}?area=${selectedArea}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});
				const data = await response.json();
				setNum(data.length);
			} catch (error) {
				console.error('データの取得に失敗しました:', error);
			}
		};
		getNum();
	}, [selectedArea]);

	//新しい探検----------------------------------
	const NewTrip = async () => {
		try {
			// console.log('selectedArea', selectedArea);
			//新規トリップを作成(fetch)
			const response = await fetch(url + `/api/trips/new/${userId}/${selectedArea}?num=${selectedNum}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				console.error('Network response was not ok');
				return;
			}

			// 新たなtripsデータを受信して登録
			const newTrpis = await response.json();
			setTrips(newTrpis);

			// tripsの最終要素のトリップを選んでトリップ開始
			navigate(`/tripsummary/${newTrpis[newTrpis.length - 1]}`);
		} catch (error) {
			console.error('Error during get trips:', error);
			return;
		}
	};

	//過去の探検--------------------------------
	const [summary, setSummary] = useState([]);
	useEffect(() => {
		const getFetch = async () => {
			try {
				const response = await fetch(url + `/api/tripsummary`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ trips: trips }),
				});

				if (!response.ok) {
					console.error('Network response was not ok');
					return;
				}

				const data = await response.json();
				setSummary(data);
			} catch (error) {
				console.error('Error during get trips:', error);
				return;
			}
		};
		getFetch();
	}, []);

	const handleTripClick = (tripId) => {
		console.log('Selected Trip ID:', tripId);
		navigate(`/tripsummary/${tripId}`);
	};

	const makePrevTrip = () => {
		return (
			<div>
				{trips.map((tripId, idx) => {
					// summary[idx] の存在を確認
					const tripSummary = summary[idx];
					if (!tripSummary) {
						return null; // またはローディング表示など
					}

					const date = new Date(tripSummary.created_at);

					return (
						<div key={tripId}>
							<div className='past-trip-button' onClick={() => handleTripClick(tripId)}>
								<div className='past-trip-center'>
									<p className='past-trip-area'>
										{idx + 1}:{tripSummary.area}
									</p>
									<p className='past-trip-date'>{date.toLocaleString()}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	//lender---------------------------------
	return (
		<>
			<Header show={true} />
			<div className='trip-start-content'>
				<h1>探検を始めよう！</h1>

				<div className='choseGroupContent'>
					<h2>参加グループを選ぶ</h2>
          {makeGroupSelect()}
				</div>

				<div className='new-trip-content'>
					<h2>新しい探検を始める</h2>
					{makeAreaSelect()}
					<br />
					<div className='trip-start-button'>
						<Button onClick={NewTrip}>探検スタート</Button>
					</div>
				</div>

				<div className='past-trip-content'>
					<h2>途中から始める</h2>
					{makePrevTrip()}
				</div>
			</div>
		</>
	);
}

export default TripStart;
