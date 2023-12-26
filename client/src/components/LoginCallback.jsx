import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginCB = () => {
	const navigate = useNavigate();
	const { login, setUserId, setUserName } = useAuth();

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const code = queryParams.get('code');

		if (code) {
			//url定義
			let url;
			if (import.meta.env.VITE_NODE_ENV === 'production') {
				url = import.meta.env.VITE_deploy_url;
			} else {
				url = 'http://localhost:3000';
			}

			// バックエンドに認可コードを送信し、トークンを取得------------------
			fetch(url + '/api/token-exchange', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code: code }),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((reply) => {
					console.log('reply', reply);

					// トークンを保存
					localStorage.setItem('accessToken', reply.access_token);
					localStorage.setItem('refreshToken', reply.refresh_token);

					// 必要なユーザー情報を設定（例：ユーザー名、ユーザーID）
					setUserName(reply.name);
					setUserId(reply.id);

					// 認証状態を更新
					login();

					// ユーザートップページにリダイレクト
					navigate('/usertop');
				})
				.catch((error) => {
					console.error('Error during token exchange:', error);
				});
		}
	}, [navigate]);

	return <div>認証中...</div>;
};

export default LoginCB;
