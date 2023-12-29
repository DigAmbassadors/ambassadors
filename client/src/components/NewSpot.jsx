import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import '../assets/style/map.css';
import Registrations from './Registrations';

const PostSpot = () => {
	const [selectedPosition, setSelectedPosition] = useState(null);

	const container = {
		width: '90%',
		height: '50vh',
	};

	const defaultPosition = {
		lat: 35.1703849,
		lng: 136.8847196,
	};

	const handleMapClick = (event) => {
		const newPosition = {
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		};
		setSelectedPosition(newPosition);
	};

	return (
		<>
			<h2>新スポット登録</h2>
			<div className='wrap'>
				<LoadScript googleMapsApiKey={import.meta.env.VITE_APIkey}>
					<GoogleMap
						mapContainerStyle={container}
						center={selectedPosition || defaultPosition} // クリックした地点、またはデフォルトの位置を中心に設定
						zoom={15}
						onClick={handleMapClick}
					>
						{selectedPosition && <Marker position={selectedPosition} />}
					</GoogleMap>
				</LoadScript>
				<div className='registrations-container'>
					<Registrations selectedPosition={selectedPosition} />
				</div>
			</div>
		</>
	);
};

export default PostSpot;
