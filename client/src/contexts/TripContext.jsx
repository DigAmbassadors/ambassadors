import React, { createContext, useContext, useState } from 'react';

// コンテキストの作成
const TripsContext = createContext();

// データを提供するコンポーネント
export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState([]);
  const [spot, setSpot] = useState([]);
  const [finFlag, setFinFlag] = useState([]);
  const [execUserId, setExecUserId] = useState(); //実際に使うuserIdのこと。loginIdとは別。グループIdが割り当てられる可能性あり。

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
        execUserId,
        setExecUserId,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

// データを使用するカスタムフック
export const useTrips = () => useContext(TripsContext);
