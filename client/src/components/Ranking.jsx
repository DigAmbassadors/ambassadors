import { useState, useEffect } from 'react';
import Header from './Header';
import '../assets/style/spot.css'

const Ranking = () => {
    	//url定義-----------------------------------------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

  //user情報--------------------------------------------------------------------
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const getFetch = async () => {
			try {
				const response = await fetch(url + `/api/ranking`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});

				if (!response.ok) {
					console.error('Network response was not ok');
					return;
				}

				const reply = await response.json();
        console.log('users',reply);
				setUsers(reply);
			} catch (error) {
				console.error('Error during get trips:', error);
				return;
			}
		};
		getFetch();
	}, []);

	const showRanking = () => {
		return (
			<>
				{users.map((user, idx) => (
					<div key={idx} className='spotContainer'>
            <p>{idx + 1}位</p>
						<p>{user.name}</p>
						<p>{user.num_record}件</p>
					</div>
				))}
			</>
		);
	};

	return (
		<>
			<Header show={true}/>
      <h2>ランキング</h2>
      {showRanking()}
		</>
	);
};
export default Ranking;
