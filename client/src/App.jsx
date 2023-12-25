import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRout';
import Login from './Login';
import LoginCB from './LoginCB';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/cog' element={<LoginCB />} />
				{/* <Route path='/main' element={<ProtectedRoute><MainPage /></ProtectedRoute>}/> */}
			</Routes>
		</AuthProvider>
	);
}

export default App;
