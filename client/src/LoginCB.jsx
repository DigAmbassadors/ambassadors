import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCB = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const code = queryParams.get('code');

		if (code) {
			// ここでバックエンドにcodeを送り、トークンと交換する
			// 簡単のため、ここでは直接メインページにリダイレクト
			console.log('to_main');
			navigate('/main');
		}
	}, [navigate]);

	return <div>認証中...</div>;
};

export default LoginCB;
