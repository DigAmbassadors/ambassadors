import mainImg from './assets/image/main.jpg';

function Navbar(props) {
  const { setLoading, setPlan } = props;

  const handleSearch = () => {
    setLoading(true);

    // ここでランダムなプランを生成する処理を行う
    setTimeout(() => {
      setPlan(true);
      setLoading(false);
    }, 5000); // 3秒後にプランを表示
  };

  return (
    <div className="img-container">
      <img className="mainImg" src={mainImg} alt="マップの画像" />
      <nav>
        <h1>旅行プランを作成しよう！</h1>

        <form>
          <div>
            <label>出発地</label>
            <input type="text" placeholder="愛知(中部国際空港)" />
          </div>
          <div>
            <label>目的地</label>
            <input type="text" placeholder="沖縄(新石垣空港)" />
          </div>
          <div>
            <label>人数</label>
            <input type="number" placeholder="4" />
          </div>
          <div>
            <label>目的地までの移動手段</label>
            <input type="text" placeholder="飛行機" />
          </div>
          <div>
            <label>目的地での移動手段</label>
            <input type="text" placeholder="レンタカー" />
          </div>
          <div>
            <label>出発日</label>
            <input type="date" />
          </div>
          <div>
            <label>帰着日</label>
            <input type="date" />
          </div>
          <div>
            <label>予算(総額)</label>
            <input type="number" placeholder="200000" />
          </div>
          <button type="button" onClick={handleSearch}>
            ランダム作成
            {/* ボタンを押すとレンダリングするためsubmitからbuttonに変更 */}
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
