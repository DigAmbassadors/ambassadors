import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <div className="user-menu-content">
      <ul className="user-menu-list">
        <li>
          <Link to="/tripstart">📸　冒険に出かける</Link>
        </li>
        <li>
          <Link to="/">📸　過去の冒険を見る</Link>
        </li>
        <li>
          <Link to="/">📸　みんなの冒険を見る</Link>
        </li>
        <li>
          <Link to="/">📸　おもしろスポットを投稿する</Link>
        </li>
        <li>
          <Link to="/">📸　ランキング</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
