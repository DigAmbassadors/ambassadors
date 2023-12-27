import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTrips } from '../contexts/TripContext';

const LoginCallback = () => {
	//各種フックス
	const navigate = useNavigate();
	const { login, setUserId, setUserName } = useAuth();
	const { setTrips } = useTrips();

	// バックエンドに認可コードを送信し、ログイン情報を入手
	const getAuthData = async (url, code) => {
		try {
			const response = await fetch(url + '/api/token-exchange', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code: code }),
			});

			if (!response.ok) {
				console.error('Network response was not ok');
				return false;
			}

			const reply = await response.json();
			return reply;
		} catch (error) {
			console.error('Error during token exchange:', error);
			return false;
		}
	};

	// ユーザidにまつわるtripsデータを取得
	const getTrips = async (url, userId) => {
		try {
			const response = await fetch(url + `/api/trips/${userId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});

			if (!response.ok) {
				console.error('Network response was not ok');
				return false;
			}

			const reply = await response.json();
			return reply;
		} catch (error) {
			console.error('Error during get trips:', error);
			return false;
		}
	};

	useEffect(() => {
		//認可コード取得
		const queryParams = new URLSearchParams(window.location.search);
		const code = queryParams.get('code');
		if (!code) {
			return;
		}

		//url定義
		let url;
		if (import.meta.env.VITE_NODE_ENV === 'production') {
			url = 'https://ambassadors-btc5.com';
		} else {
			url = 'http://localhost:3000';
		}

		//実行関数定義
		const fetchData = async () => {
			// バックエンドに認可コードを送信し認証情報を入手
			const authData = await getAuthData(url, code);
			if (!authData) {
				return;
			}

			// トークンを保存
			localStorage.setItem('accessToken', authData.access_token);
			localStorage.setItem('refreshToken', authData.refresh_token);

			// ユーザー名、ユーザーIDを保存
			setUserName(authData.name);
			setUserId(authData.id);
			console.log('user', authData.name, authData.id);

			//tripsデータを入手して保存
			const trips = await getTrips(url, authData.id);
			if (!trips) {
				return;
			}
			setTrips(trips);
			console.log('trips', trips);

			// ログインしてユーザートップページにリダイレクト
			login();
			navigate('/usertop');
		};

		fetchData();
	}, []);

	return <div>認証中...</div>;
};

export default LoginCallback;
