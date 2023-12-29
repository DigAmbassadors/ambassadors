import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TripsProvider } from './contexts/TripContext';
import ProtectedRoute from './components/ProtectedRout';
import Login from './components/Login';
import LoginCallback from './components/LoginCallback';
import UserTop from './components/UserTop';
import TripStart from './components/TripStart';
import TripSummary from './components/TripSummary';
import TripDetail from './components/TripDetail';
import NewSpot from './components/NewSpot';
import './assets/style/App.css';
import ImgPreview from './components/ImgPreview';

function App() {
	return (
		<AuthProvider>
			<TripsProvider>
				<Routes>
					<Route path='/' element={<Login />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/cognito' element={<LoginCallback />} />
					<Route
						path='/usertop'
						element={
							<ProtectedRoute>
								<UserTop />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/tripstart'
						element={
							<ProtectedRoute>
								<TripStart />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/tripsummary/:tripId'
						element={
							<ProtectedRoute>
								<TripSummary />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/tripdetail/:spotId'
						element={
							<ProtectedRoute>
								<TripDetail />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/newspot'
						element={
							<ProtectedRoute>
								<NewSpot />
							</ProtectedRoute>
						}
					></Route>
					<Route
						path='/imgpreview'
						element={
							<ProtectedRoute>
								<ImgPreview />
							</ProtectedRoute>
						}
					></Route>
				</Routes>
			</TripsProvider>
		</AuthProvider>
	);
}

export default App;
