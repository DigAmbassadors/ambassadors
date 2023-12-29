import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import pageBackImg from '../assets/image/pageBackButton.jpg';
import '../assets/style/spot.css'

const SpotPreview = () => {
	// 汎用フックス-------------------------------
	const { userId } = useAuth();
  const navigate = useNavigate();

  //url定義-----------------------------------------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

	//spot取得------------------------
	const [spots, setSpots] = useState([]);
	useEffect(() => {
		const getFetch = async () => {
			try {
				const response = await fetch(url + `/api/spots/${userId}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});

				if (!response.ok) {
					console.error('Network response was not ok');
					return;
				}

				const spots = await response.json();
				setSpots(spots);
			} catch (error) {
				console.error('Error during get trips:', error);
				return;
			}
		};
		getFetch();
	}, []);

	//spot表示------------------------
	const showSpots = () => {
		return (
			<>
				{spots.map((spot, idx) => {
					if (spot.finish) {
						return (
							<div key={idx} className='spotContainer'>
								<img className='spotImg' src={spot.photo} alt='img' />
								<p>{spot.name}</p>
							</div>
						);
					} else {
						return (
							<div key={idx} className='spotContainer'>
								<img className='spotImg' src={spot.photo} alt='img' />
								<p>？？？</p>
							</div>
						);
					}
				})}
			</>
		);
	};

	return (
		<>
			<Header show={true} />
      <h2>スポット一覧</h2>
      {showSpots()}
		</>
	);
};
export default SpotPreview;
