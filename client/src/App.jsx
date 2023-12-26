import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRout";
import Login from "./components/Login";
import LoginCallback from "./components/LoginCallback";
import UserTop from "./components/UserTop";
import TripStart from "./components/TripStart";
import TripSummary from "./components/TripSummary";
import TripDetail from "./components/TripDetail";
import "./assets/style/App.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/cog' element={<LoginCallback />} />
                    <Route path='/usertop' element={<ProtectedRoute><UserTop /></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

// import { useState, useEffect } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import '../assets/style/App.css';
// import { AuthProvider } from '../contexts/AuthContext';
// import Home from './Home';
// // import Login from './component/Login';
// // import Signin from './component/Signin';
// import Navber from './Navber';
// import Search from './Search';
// import Result from './Result';
// import ResultStore from './ResultStore';
// import Footer from './Footer';

// function App() {
//     return (
//         <div className='App'>
//             <AuthProvider>
//                 <Navber></Navber>
//                 <Routes>
//                     <Route path='/' element={<Home></Home>} />
//                     <Route path='/search' element={<Search></Search>} />
//                     <Route path='/result/store' element={<Result></Result>} />
//                     <Route path='/result/store/:storeId' element={<ResultStore></ResultStore>} />
//                     {/* <Route path="/customer" element={<Customer></Customer>} /> */}
//                 </Routes>
//                 <Footer></Footer>
//             </AuthProvider>
//         </div>
//     );
// }

// export default App;
