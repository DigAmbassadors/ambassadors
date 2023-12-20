function Navbar() {
  return (
    <nav>
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
        <button type="submit">ランダム作成</button>
      </form>
    </nav>
  );
}

export default Navbar;
