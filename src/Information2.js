import React from "react";

const Information2 = ({ insights }) => {
  return (
    <div
      className="information-card"
      style={{ marginTop: "4rem", background: "white" }}
    >
      <h1>Free for commercial use</h1>
      <h5>Use generated audio across multiple platforms</h5>
      <ul>
        <li><i className="bi bi-youtube me-2"></i>Youtube</li>
        <li><i className="bi bi-facebook me-2"></i>Facebook</li>
        <li><i className="bi bi-instagram me-2"></i>Instagram</li>
        <li><i className="bi bi-twitch me-2"></i>Twitch</li>
        <li><i className="bi bi-twitter me-2"></i>Twitter</li>
      </ul>
      and many more...
    </div>
  );
};

export default Information2;
