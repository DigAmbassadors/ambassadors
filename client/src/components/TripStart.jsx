import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTrips } from '../contexts/TripContext';
import Header from './Header';
import pageBackImg from '../assets/image/pageBackButton.jpg';

function TripStart() {
	// 汎用フックス-------------------------------
	const { userId } = useAuth();
	const navigate = useNavigate();
	const { trips, setTrips } = useTrips();

	//url定義-----------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

	//新しい冒険----------------------------------
	const NewTrip = async () => {
		try {
      console.log('selectedArea',selectedArea);
			//新規トリップを作成(fetch)
			const response = await fetch(url + `/api/trips/new/${userId}/${selectedArea}`, {
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
      console.log('trips', trips)

			// tripsの最終要素のトリップを選んでトリップ開始
			navigate(`/tripsummary/${newTrpis[newTrpis.length - 1]}`);
		} catch (error) {
			console.error('Error during get trips:', error);
			return;
		}
	};

	//エリア選択--------------------------------
	const [areas, setAreas] = useState(['']);
	const [selectedArea, setSelectedArea] = useState('');

	const handleAreaChange = (e) => {
		setSelectedArea(e.target.value);
	};

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

	//過去の冒険--------------------------------
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

				//areasも作る(エリア名を重複なく抜き出す)
        const displayArea = Array.from(new Set(data.map((dt) => dt.area)));
				setAreas(displayArea);
        if (displayArea.length > 0){
          setSelectedArea(displayArea[0]);
        }
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

					return (
						<div key={tripId}>
							<button onClick={() => handleTripClick(tripId)}>旅行 {tripId}</button>
							<p>{tripSummary.area}</p>
							<p>{tripSummary.created_at}</p>
						</div>
					);
				})}
			</div>
		);
	};

	//lender---------------------------------
	return (
		<>
			<Header />
			<Link to='/usertop'>
				<img src={pageBackImg} alt='#' className='content-pageBackImg' />
			</Link>
			<div className='tripstart-content'>
				<p>新しい冒険を始める</p>
				{makeAreaSelect()}
				<br />

				<button className='tripstart-button' onClick={NewTrip}>
					冒険スタート
				</button>

				<br />
				<br />
				<br />
				<br />
				<br />
				<p>途中から始める</p>
				{makePrevTrip()}
			</div>
		</>
	);
}

export default TripStart;
