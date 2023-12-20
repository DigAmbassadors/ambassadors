function MainBody(props) {
  const { loading, plan } = props;

  return (
    <div>
      {loading ? (
        <p>ローディング中...</p>
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
      ) : (
        <p>何もない</p>
      )}
    </div>
  );
}

export default MainBody;
