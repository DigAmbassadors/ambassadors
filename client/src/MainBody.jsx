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
                <h2>
                  １０：００ <span className="small">(30分)</span>
                </h2>
                <h3>　新石垣空港　</h3>
                <br />
                <div className="timeline-content-child">
                  <p>
                    新石垣空港(しんいしがきくうこう、英: New Ishigaki
                    Airport)は、沖縄県石垣市(石垣島東部)にある地方管理空港である。2021年現在、定期便が発着する空港としては日本最南端である[注
                    1]。2006年10月に着工し、2013年3月7日に開港した[1]。愛称は「南ぬ島
                    石垣空港」(ぱいぬしま いしがきくうこう)[2]。
                  </p>
                  <img src={portImg} alt="" className="timeline-content-img" />
                </div>
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>
                  移動(レンタカー)　<span className="small">(30分)</span>
                </p>
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <h2>
                  １１：００ <span className="small">(60分)</span>
                </h2>
                <h3>　川平湾</h3>
                <br />
                <div className="timeline-content-child">
                  <p>
                    湾内の海は、光の加減や潮の満ち引きにより刻々とその色を変え、石垣島を代表する景勝地と評される。
                    湾口をふさぐように横たわる小島（くじま）をはじめとする小さな島が湾内に点在し、海中には数多くの種類の造礁サンゴが群落を形成している。
                  </p>
                  <img
                    src={kabirawanImg}
                    alt=""
                    className="timeline-content-img"
                  />
                </div>
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <p>
                  移動(レンタカー)　<span className="small">(30分)</span>
                </p>
              </div>
            </li>
            <li>
              <p class="timeline-date"></p>
              <div class="timeline-content">
                <br />
                <h2>
                  １２：３０ <span className="small">(60分)</span>
                </h2>
                <h3>　島唄三味線ライブ居酒屋　結風</h3>
                <br />
                <div className="timeline-content-child">
                  <p>
                    チャンプルーは沖縄を代表する家庭料理の一つ。沖縄方言で豆腐と野菜などを油で炒め合わせた料理を意味する[1][2][3]。
                    その種類は豊富で、豆腐と炒め合わせる主な野菜の名前を頭につけて「ゴーヤーチャンプルー」「タマナーチャンプルー」などと呼ばれる[4][5]。
                  </p>
                  <img src={goya} alt="" className="timeline-content-img" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <p>データなし</p>
      )}
    </div>
  );
}

export default MainBody;
