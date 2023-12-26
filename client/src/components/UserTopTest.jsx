import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserTopTest = () => {
	const { userId } = useAuth();

	const getTrips = () => {
		//url定義
		let url;
		if (import.meta.env.VITE_NODE_ENV === 'production') {
			url = import.meta.env.VITE_deploy_url;
		} else {
			url = 'http://localhost:3000';
		}

		fetch(url + `/api/trips/${userId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Token might be expired or invalid');
				}
				return response.json();
			})
			.then((trips) => {
				console.log('trips', trips);
				// 応答データを処理
			})
			.catch((error) => {
				console.error('Error:', error);
				if (error.message === 'Token expired') {
					// リフレッシュトークンを使用して新しいアクセストークンを取得
					fetch(url + '/api/refresh-token', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
					})
						.then((response) => response.json())
						.then((data) => {
							localStorage.setItem('accessToken', reply.access_token);
							localStorage.setItem('refreshToken', reply.refresh_token);
							// リクエストを再試行
							getTrips();
						})
						.catch((refreshError) => {
							console.error('Refresh Token Error:', refreshError);
							// リフレッシュトークンも期限切れの場合、ログインページにリダイレクト
							navigate('/login');
						});
				} else {
					navigate('/login');
				}
			});
	};

	useEffect(() => {
		getTrips();
	}, []);
};
export default UserTopTest;
