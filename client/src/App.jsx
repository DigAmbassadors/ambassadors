import { useState } from "react";
import "./assets/style/App.css";
import Header from "./Header";
import Navbar from "./Navbar";
import MainBody from "./MainBody";
import Footer from "./Footer";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(false);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/nav"
          element={<Navbar setLoading={setLoading} setPlan={setPlan}></Navbar>}
        ></Route>
        <Route
          path="/main"
          element={<MainBody loading={loading} plan={plan}></MainBody>}
        ></Route>
      </Routes>
      {/* <Navbar setLoading={setLoading} setPlan={setPlan} /> */}
      {/* <MainBody loading={loading} plan={plan} /> */}
      <Footer />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/nav">Nav</Link>
        </li>
      </ul>
    </div>
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
