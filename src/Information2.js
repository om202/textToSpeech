import React from "react";

const Information2 = ({ insights }) => {
  return (
    <div
      className="information-card"
      style={{ marginTop: "4rem", background: "white", padding: "0" }}
    >
      <h1>Free for commercial use</h1>
      <h5>Use generated audio across multiple platforms</h5>
      <ul>
        <li>
          <i className="bi bi-youtube me-2"></i>
          <a href="https://www.youtube.com/" style={{ color: "inherit" }}>
            Youtube
          </a>
        </li>
        <li>
          <i className="bi bi-facebook me-2"></i>
          <a href="https://www.facebook.com/" style={{ color: "inherit" }}>
            Facebook
          </a>
        </li>
        <li>
          <i className="bi bi-instagram me-2"></i>
          <a href="https://www.instagram.com/" style={{ color: "inherit" }}>
            Instagram
          </a>
        </li>
        <li>
          <i className="bi bi-twitch me-2"></i>
          <a href="https://www.twitch.tv/" style={{ color: "inherit" }}>
            Twitch
          </a>
        </li>
        <li>
          <i className="bi bi-twitter me-2"></i>
          <a href="https://twitter.com/" style={{ color: "inherit" }}>
            Twitter
          </a>
        </li>
      </ul>
      and many more...
    </div>
  );
};

export default Information2;
