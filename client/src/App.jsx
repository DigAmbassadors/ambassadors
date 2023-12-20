import { useState } from 'react';
import './assets/style/App.css';
import Header from './Header';
import Navbar from './Navbar';
import MainBody from './MainBody';
import Footer from './Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Navbar />
      <MainBody />
      <Footer />
    </div>
  );
}

export default App;
