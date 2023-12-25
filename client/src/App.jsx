import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRout';
import Login from './components/Login';
import LoginCB from './components/LoginCB';
import UserTop from './components/UserTop';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/cog' element={<LoginCB />} />
                    <Route path='/usertop' element={<ProtectedRoute><UserTop /></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
