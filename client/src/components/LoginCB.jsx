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
            // バックエンドに認可コードを送信し、トークンを取得
            // fetch('/api/token-exchange', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ code: code })
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     return response.json();
            // })
            // .then(tokens => {
            //     // トークンを受け取った後の処理（保存、状態更新等）
            //     console.log(tokens);
            //     navigate('/main');
            // })
            // .catch(error => {
            //     console.error('Error during token exchange:', error);
            // });

            // serverでの処理をひとまず飛ばしてユーザートップページへ移動
            login();
            navigate('/usertop');
        }
    }, [navigate]);

    return <div>認証中...</div>;
};

export default LoginCB;
