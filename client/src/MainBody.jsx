import loadingImg from './assets/image/loading.gif';

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
              <p class="timeline-date">2019年04月</p>
              <div class="timeline-content">
                <br />
                <p>入社</p>
              </div>
            </li>
            <li>
              <p class="timeline-date">2019年04月</p>
              <div class="timeline-content">
                <br />
                <p>入社</p>
              </div>
            </li>
            <li>
              <p class="timeline-date">2019年04月</p>
              <div class="timeline-content">
                <br />
                <p>入社</p>
              </div>
            </li>
            <li>
              <p class="timeline-date">2019年04月</p>
              <div class="timeline-content">
                <br />
                <p>入社</p>
              </div>
            </li>
            <li>
              <p class="timeline-date">2019年04月</p>
              <div class="timeline-content">
                <br />
                <p>入社</p>
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default MainBody;
