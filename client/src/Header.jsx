import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import portImg from "./assets/image/ishigakiAirport.jpg";

function Header() {
  useEffect(() => {}, []);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <header>
      <div className="user-icon">
        <img src={portImg} alt="仮の画像" width="80px" />
      </div>
      <div className="logo">
        <a href="/">AMBASSADORS</a>
      </div>
      <div className="hamburger-menu">
        <MenuIcon onClick={handleDrawerOpen} />
      </div>

      {/* <div className="navigationbar">
        <ul>
          <li>
            <Link to={`#`}>MYPAGE</Link>
          </li>
          <li>
            <Link to={`#`}>LOGOUT</Link>
          </li>
        </ul>
      </div> */}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          style: { width: "45%", backgroundColor: "rgba(255,255,255,0.8)" },
        }}
      >
        <div className="ham-close-icon">
          <CloseIcon onClick={handleDrawerClose} />
        </div>
        <ul className="ham-menu">
          <li>
            <Link to="/" onClick={handleDrawerClose}>
              TOP MENU(リンク未)
            </Link>
          </li>
          <li>
            <Link to={`#`} onClick={handleDrawerClose}>
              LOGOUT(リンク未)
            </Link>
          </li>
        </ul>
      </Drawer>
    </header>
  );
}

export default Header;
