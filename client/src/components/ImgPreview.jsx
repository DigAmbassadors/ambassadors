import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../assets/style/imgpreview.css';
import pageBackImg from '../assets/image/pageBackButton.jpg';

const ImgPreview = () => {
  const navigate = useNavigate();
  
	//url定義-----------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

	//画像を取得-----------------------------------
	const [imgs, setImgs] = useState([]);
	useEffect(() => {
		const getFetch = async () => {
			try {
				const response = await fetch(url + `/api/imgs`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});

				if (!response.ok) {
					console.error('Network response was not ok');
					return;
				}

				const imgs = await response.json();
				setImgs(imgs);
			} catch (error) {
				console.error('Error during get trips:', error);
				return;
			}
		};
		getFetch();
	}, []);

	return (
		<>
			<Header />
			<img
				src={pageBackImg}
				alt='#'
				className='content-pageBackImg'
				onClick={() => {
					navigate(-1);
				}}
			/>
			<h2>冒険の記録</h2>
			<div className='img_container'>
				{imgs.map((img, idx) => (
					<img key={idx} src={img} alt='img' className='image imageCell' onClick={() => {}} />
				))}
			</div>
		</>
	);
};
export default ImgPreview;
