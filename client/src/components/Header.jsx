import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import portImg from '../assets/image/ishigakiAirport.jpg';
import iconImg from '../assets/image/icon.png';
import pageBackImg from '../assets/image/pageBackButton.jpg';

function Header(props) {
	const { show } = props;
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const goHome = () => {
		navigate('/usertop');
	};

	return (
		<header>
			{/* <div className="user-icon">
        <img src={iconImg} alt="仮の画像" />
      </div> */}
			{show && (
				<img
					src={pageBackImg}
					alt='#'
					className='content-pageBackImg'
					onClick={() => {
						navigate(-1);
					}}
				/>
			)}
			<div className='logo' onClick={goHome}>
				AMBASSADORS
			</div>
			<div className='hamburger-menu'>
				<MenuIcon onClick={handleDrawerOpen} fontSize='large' />
			</div>

			<Drawer
				anchor='right'
				open={open}
				onClose={handleDrawerClose}
				PaperProps={{
					style: { width: '35%', backgroundColor: 'rgba(255,215,0,0.8)' },
				}}
			>
				<div className='ham-close-icon'>
					<CloseIcon onClick={handleDrawerClose} />
				</div>
				<ul className='ham-menu'>
					<li>
						<Link to='/usertop' onClick={handleDrawerClose}>
							<strong>TOP MENU</strong>
						</Link>
					</li>
					<li>
						<Link to={`#`} onClick={handleDrawerClose}>
							<strong>LOGOUT</strong>
							<br />
							(リンク未)
						</Link>
					</li>
				</ul>
			</Drawer>
		</header>
	);
}

export default Header;
