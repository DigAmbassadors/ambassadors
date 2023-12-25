// /client/src/Login.jsx
import { useEffect } from 'react';

const redirectToCognito = () => {
	//各種パラメータを設定
	const cognitoDomain = import.meta.env.VITE_cognitoDomain;
	const clientId = import.meta.env.VITE_clientId;
	const responseType = 'code';
	const scope = import.meta.env.VITE_scope;
	const redirectUri = encodeURIComponent(import.meta.env.VITE_redirectUri);

	//ログイン認証用URLを完成
	const loginUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
	console.log(loginUrl);

	//ログイン認証用URLにアクセス
	window.location.href = loginUrl;
};

const Login = () => {
	useEffect(() => {
		redirectToCognito();
	}, []);

	return <div>リダイレクト中...</div>;
};

export default Login;
