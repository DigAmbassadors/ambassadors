import React, { createContext, useContext, useState } from 'react';

// コンテキストの作成
const TripsContext = createContext();

// データを提供するコンポーネント
export const TripsProvider = ({ children }) => {
	const [trips, setTrips] = useState([]); // ここでデータを管理

	return <TripsContext.Provider value={{ trips, setTrips }}>{children}</TripsContext.Provider>;
};

// データを使用するカスタムフック
export const useTrips = () => useContext(TripsContext);
