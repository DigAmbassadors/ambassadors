import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRout';
import Login from './components/Login';
import LoginCallback from './components/LoginCallback';
import UserTop from './components/UserTop';
import UserTopTest from './components/UserTopTest';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/cognito' element={<LoginCallback />} />
                    <Route path='/usertop' element={<ProtectedRoute><UserTop /></ProtectedRoute>}/>
                    <Route path='/usertopsub' element={<UserTop />}/>
                    <Route path='/usertoptest' element={<UserTopTest />}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
