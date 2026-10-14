export default function LoadingScreen({ visible }) {
  return (
    <div className={`loading-screen ${visible ? "" : "loading-hidden"}`}>
      <div className="loading-logo">
        <span className="loading-logo-icon">
          <span className="bracket">&lt;</span>
        </span>
        <span className="display loading-logo-text">
          A
          <span className="logo-r-wrap loading-r-wrap">
            R<span className="logo-r-tail loading-r-tail" />
          </span>
          GAA<span className="loading-logo-accent">/&gt;</span>
        </span>
      </div>
      <div className="loading-spinner" />
      <div className="mono loading-label">LOADING...</div>
    </div>
  );
}
