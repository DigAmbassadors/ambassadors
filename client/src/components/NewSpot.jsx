import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/map.css';
import Header from './Header';
import pageBackImg from '../assets/image/pageBackButton.jpg';
import Registrations from './Registrations';

const PostSpot = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState(null);

  const container = {
    width: '100%',
    height: '45vh',
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
      <Header show={true} />
      <h1>新スポット登録</h1>
      <div className="new-spot-container">
        <p>・位置情報</p>
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
        <div className="registrations-container">
          <Registrations selectedPosition={selectedPosition} />
        </div>
      </div>
    </>
  );
};

export default PostSpot;
