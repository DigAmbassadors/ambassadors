import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  useEffect(() => {}, []);

  return (
    <header>
      <div className="logo">
        <a href="/">AMBASSADORS</a>
      </div>

      <div className="navigationbar">
        <ul>
          <li>
            <Link to={`#`}>MYPAGE</Link>
          </li>
          <li>
            <Link to={`#`}>LOGOUT</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
