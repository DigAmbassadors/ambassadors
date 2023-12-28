import React, { createContext, useContext, useState } from 'react';

// コンテキストの作成
const TripsContext = createContext();

// データを提供するコンポーネント
export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]); // ここでデータを管理
  const [trip, setTrip] = useState([]); // ここでデータを管理
  const [spot, setSpot] = useState([]);
  const [finFlag, setFinFlag] = useState([]);

  return (
    <TripsContext.Provider
      value={{
        trips,
        setTrips,
        trip,
        setTrip,
        spot,
        setSpot,
        finFlag,
        setFinFlag,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

// データを使用するカスタムフック
export const useTrips = () => useContext(TripsContext);
