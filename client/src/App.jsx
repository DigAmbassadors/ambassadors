import { useState } from "react";
import "./assets/style/App.css";
import Header from "./Header";
import Navbar from "./Navbar";
import MainBody from "./MainBody";
import Footer from "./Footer";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(false);

  return (
    <div>
      <Header />
      <Navbar setLoading={setLoading} setPlan={setPlan} />
      <MainBody loading={loading} plan={plan} />
      <Footer />
    </div>
  );
}

export default App;
