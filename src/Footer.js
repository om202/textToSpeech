import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <div className="font-weight-bold mb-3" style={{ fontSize: "18px" }}>
          <img src="logo.png" width={32} alt="logo" /> Voice Guru
        </div>
        <div className="mb-3">
          <span className="text-muted">Created with <i class="bi bi-heart-fill" style={{color: "red"}}></i> in Colorado, USA.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
