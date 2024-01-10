import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import iconMapImg from '../assets/image/iconMap.jpg';
import keyIconCloseImg from '../assets/image/keyIconClose.jpg';
import pageBackImg from '../assets/image/pageBackButton.jpg';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';
import { useTrips } from '../contexts/TripContext';
import { colors } from '@mui/material';

function TripSummary() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { tripId } = useParams();
  const { trip, setTrip, finFlag, setFinFlag } = useTrips();
  const { setSpot } = useTrips();
  const [finishSpot, setFinishSpot] = useState([]); // ここでデータを管理

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

    const getFinishSpot = async () => {
      try {
        // url + `/api/trips/${userId}?tripId=${tripId}`
        const response = await fetch(url + `/api/users/record/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await response.json();
        setFinishSpot(data); //[{},{},{}]
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
    getFinishSpot();
  }, []);

  let finishSpotId = finishSpot.map((obj) => obj.spot_id) || [];

  return (
    <>
      <Header show={true} />
      <div className="trip-summary-body">
        <h1>探検一覧</h1>
        {trip.map((e, index) => {
          const dir = index % 2 === 0 ? 'left' : 'right';

          return finishSpotId.includes(e.id) ? (
            <div className={`trip-summary-content-${dir}`}>
              <p style={{ color: '#FAC710' }}>⭐️完了</p>
              <div className="trip-summary-spot">
                <Link to={`/tripdetail/${e.id}`}>
                  <img
                    src={e.photo}
                    alt="#"
                    className="trip-summary-content-image"
                    onClick={() => {
                      setSpot(e);
                    }}
                  />
                </Link>

                {index === trip.length - 1 ? (
                  <></>
                ) : (
                  <div className={`arrow-${dir}`}></div>
                )}
              </div>
            </div>
          ) : index === 0 ? (
            <div className={`trip-summary-content-${dir}`}>
              <p style={{ color: 'white' }}>次はここ！</p>
              <div className="trip-summary-spot">
                <Link to={`/tripdetail/${e.id}`}>
                  <img
                    src={e.photo}
                    alt="#"
                    className="trip-summary-content-image"
                    onClick={() => {
                      setSpot(e);
                    }}
                  />
                  <br />
                </Link>
                {index === trip.length - 1 ? (
                  <></>
                ) : (
                  <div className={`arrow-${dir}`}></div>
                )}
              </div>
            </div>
          ) : finishSpotId.includes(trip[0].id) &&
            finishSpotId.includes(trip[index - 1].id) ? (
            <div className={`trip-summary-content-${dir}`}>
              <p style={{ color: 'white' }}>次はここ！</p>
              <div className="trip-summary-spot">
                <Link to={`/tripdetail/${e.id}`}>
                  <img
                    src={e.photo}
                    alt="#"
                    className="trip-summary-content-image"
                    onClick={() => {
                      setSpot(e);
                    }}
                  />
                  <br />
                </Link>
                {index === trip.length - 1 ? (
                  <></>
                ) : (
                  <div className={`arrow-${dir}`}></div>
                )}
              </div>
            </div>
          ) : (
            <div className={`trip-summary-content-${dir}`}>
              <div className="trip-summary-spot">
                <div className="trip-summary-content-wrapped">
                  <img
                    src={e.photo}
                    alt="#"
                    className="trip-summary-content-image-filter"
                  />
                  <img
                    src={keyIconCloseImg}
                    alt="#"
                    className="trip-summary-content-image-keyclose"
                  />
                  <p>
                    前のミッションをクリアするまで
                    <br />
                    表示できません
                  </p>
                </div>
                {index === trip.length - 1 ? (
                  <></>
                ) : (
                  <div className={`arrow-${dir}`}></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default TripSummary;
