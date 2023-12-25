// /client/src/Login.jsx
import { useEffect } from 'react';

const redirectToCognito = () => {
	const clientId = import.meta.env.VITE_clientId;
	const redirectUri = encodeURIComponent(import.meta.env.VITE_redirectUri);
	const responseType = 'code';
	const scope = import.meta.env.VITE_scope;
	const cognitoDomain = import .meta.env.VITE_cognitoDomain;

	const loginUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
    // console.log(loginUrl);

	window.location.href = loginUrl;
};

const Login = () => {
	useEffect(() => {
		redirectToCognito();
	}, []);

	return <div>リダイレクト中...</div>;
};

export default Login;
