import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <div className="user-menu-content">
      <ul className="user-menu-list">
        <li>
          <Link to="/tripstart">📸　冒険に出かける</Link>
        </li>
        <li>
          <Link>👀　過去の冒険を見る＠</Link>
        </li>
        <li>
          <Link>👫　みんなの冒険を見る＠</Link>
        </li>
        <li>
          <Link>📮　おもしろスポットを投稿する＠</Link>
        </li>
        <li>
          <Link>🏆　ランキング＠</Link>
        </li>
        <li>
          <Link>ー以下、開発用リンクー</Link>
        </li>
        <li>
          <Link to="/tripdetail">(to tripDetail)</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
