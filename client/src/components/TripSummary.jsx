import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import iconMapImg from '../assets/image/iconMap.jpg';
import keyIconCloseImg from '../assets/image/keyIconClose.jpg';
import pageBackImg from '../assets/image/pageBackButton.jpg';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';

function TripSummary() {
  // const navigate = useNavigate();
  // navigate("/TripSummary");
  const { userId } = useAuth();
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]); // ここでデータを管理
  const [finishSpot, setFinishSpot] = useState([]); // ここでデータを管理

  const [clearFlg1, setClearFlg1] = useState(false);
  const controlClearFlg1 = () => {
    clearFlg1 ? setClearFlg1(false) : setClearFlg1(true);
  };
  const [clearFlg2, setClearFlg2] = useState(false);
  const controlClearFlg2 = () => {
    clearFlg2 ? setClearFlg2(false) : setClearFlg2(true);
  };

  let url;
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    url = 'https://ambassadors-btc5.com';
  } else {
    url = 'http://localhost:3000';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + `/api/trip?tripId=${tripId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await response.json();
        setTrip(data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    const getFinishSpotId = async () => {
      try {
        // url + `/api/trips/${userId}?tripId=${tripId}`
        const response = await fetch(url + `/api/users/record/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await response.json();
        setFinishSpot(data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
    getFinishSpotId();
  }, []);

  return (
    <>
      <Header />
      <Link to="/tripstart">
        <img src={pageBackImg} alt="#" className="content-pageBackImg" />
      </Link>
      {trip.map((e, index) => (
        <div className="tripsummary-content">
          <br />
          {finishSpot.includes(e.id) || index === 0 ? (
            <>
              <p>次の行き先はここだ！！</p>
              <Link to="/tripdetail">
                <img
                  src={e.photo}
                  alt="#"
                  className="tripsummary-content-image"
                />
                <br />
              </Link>
            </>
          ) : (
            <>
              <div className="tripsummary-content-wrapped">
                <img
                  src={e.photo}
                  alt="#"
                  className="tripsummary-content-image-filter"
                />
                <img
                  src={keyIconCloseImg}
                  alt="#"
                  className="tripsummary-content-image-keyclose"
                />
              </div>
              <br />
              <img
                src={iconMapImg}
                alt="#"
                className="tripsummary-content-image-icon"
              />
              <p>前のミッションをクリアするまで表示できません</p>
            </>
          )}
        </div>
      ))}
    </>
  );
}
export default TripSummary;
