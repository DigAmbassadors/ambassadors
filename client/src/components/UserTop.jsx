import Header from './Header';
import { Link } from 'react-router-dom';

const UserTop = () => {
  return (
    <div>
      <Header show={false} />
      <div className="title-box">TAKE ME</div>
      <div className="user-menu-content">
        <ul className="user-menu-list">
          <li>
            <Link to="/tripstart">探検に出かける</Link>
          </li>
          <li>
            <Link to="/grouping">グループ設定</Link>
          </li>
          <li>
            <Link to="/newspot">スポットを投稿する</Link>
          </li>
          <li>
            <Link to="/imgpreview">みんなの探検写真を見る</Link>
          </li>
          <li>
            <Link to="/ranking">ランキングを見る</Link>
          </li>
          <li>
            <Link to="/spotpreview">スポット図鑑を見る</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserTop;
