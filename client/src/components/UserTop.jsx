import Header from './Header';
import { Link } from 'react-router-dom';

const UserTop = () => {
	return (
		<div>
			<Header show={false} />
			<div className='user-menu-content'>
				<ul className='user-menu-list'>
					<li>
						<Link to='/tripstart'>📸　冒険に出かける</Link>
					</li>
					<li>
						<Link to='/newspot'>📮　おもしろスポットを投稿する＠</Link>
					</li>
					<li>
						<Link to='/imgpreview'>👫　みんなの冒険写真を見る＠</Link>
					</li>
					<li>
						<Link to='/ranking'>🏆　ランキング＠</Link>
					</li>
					<li>
						<Link to='/spotpreview'>👫　スポット一覧を見る＠</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserTop;
