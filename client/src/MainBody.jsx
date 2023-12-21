import portImg from "./assets/image/ishigakiAirport.jpg";
import kabirawanImg from "./assets/image/kabirawan.jpg";
import goya from "./assets/image/goyachample.jpg";
import "./assets/style/App.css";
import loadingImg from "./assets/image/loading.gif";

function MainBody(props) {
  const { loading, plan } = props;

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <img className="loadingImg" src={loadingImg} alt="ロード中の画像" />
        </div>
      ) : plan ? (
        <div className="MainBody">
          {/* <a href="/">MainBody</a> */}
          <ul class="timeline">
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>１０：００</p>
                <p>　新石垣島空港　３０分</p>
                <img src={portImg} alt="" className="timeline-content-img" />
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>移動　３０分</p>
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>１１：００</p>
                <p>　川平湾　６０分</p>
                <img
                  src={kabirawanImg}
                  alt=""
                  className="timeline-content-img"
                />
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>移動　３０分</p>
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>１２：３０</p>
                <p>　島唄三味線ライブ居酒屋　結風　６０分</p>
                <img src={goya} alt="" className="timeline-content-img" />
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default MainBody;
