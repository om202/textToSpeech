import React from "react";

const About = () => {
  return (
    <div
      className="container-fluid"
      style={{ maxWidth: "748px", marginTop: "90px" }}
    >
      <h1 className="card-title mb-4 display-6">
        <img
          src="logo.png"
          alt="logo"
          width={48}
          style={{ marginRight: "10px" }}
        />
        Voice Guru
      </h1>
      <p className="card-text">
        Voice Guru is a user-friendly online text-to-speech tool that allows
        users to convert written text into lifelike artificial
        intelligence-generated voices. With a simple interface, users can input
        any text, and the tool transforms it into spoken words, providing a
        natural and realistic voice experience.
      </p>
      <h3 className="mt-5">🔍 Usage Scenarios</h3>
      <p className="card-text">
        <ul style={{ listStyleType: "none" }}>
          <li>🎧 Create voiceovers for podcasts</li>
          <li>🎥 Generate audio for YouTube and TikTok </li>
          <li>📚 Create voiceovers for audiobooks</li>
          <li>📺 Create voiceovers for advertising</li>
        </ul>
      </p>
      <h3 className="mt-5">⚙️ Features</h3>
      <p className="card-text">
        <ul style={{ listStyleType: "none" }}>
          <li>⚡ Fast and easy to use</li>
          <li>🎛️ Adjust pitch and speed of audio</li>
          <li>💼 Free for commercial usage </li>
          <li>🌐 Supports multiple languages</li>
          <li>😄 Offers multiple emotions to select from</li>
        </ul>
      </p>
      <h3 className="mt-5">🔄 Updates</h3>
      <p className="card-text">
        We are continuously working on adding more features to Voice Guru 🚀.
      </p>
    </div>
  );
};

export default About;
