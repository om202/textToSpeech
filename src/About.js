import React from "react";

const About = () => {
  return (
    <div
      className="container-fluid"
      style={{ maxWidth: "748px", marginTop: "90px" }}
    >
      <h1 className="mb-3 my-title">
        <img src="logo.png" alt="logo" width={"48px"} className="me-2" /> Voice
        Guru
      </h1>
      <h3 className="mt-5">📝 About</h3>
      <p className="card-text">
        <a href="https://www.voiceguru.io/">Voice Guru</a> is a user-friendly online text-to-speech tool that allows
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
      <h3 className="mt-5">📖 Languages</h3>
      <p className="card-text">
        <ul style={{ listStyleType: "none" }}>
          <li>🇺🇸 English (United States)</li>
          <li>🇨🇳 Chinese (Mandarin)</li>
          <li>🇮🇳 Hindi</li>
          <li>🇮🇳 Telugu</li>
          <li>🇮🇳 Tamil</li>
          <li>🇮🇳 Malayalam</li>
          <li>🇮🇳 Marathi</li>
          <li>🇳🇵 Nepali</li>
          <li>🇲🇽 Spanish</li>
          <li>🇫🇷 French</li>
          <li>🇦🇪 Arabic</li>
          <li>🇷🇺 Russian</li>
          <li>🇧🇷 Portuguese</li>
          <li>🇮🇩 Indonesian</li>
          <li>🇩🇪 German</li>
          <li>🇯🇵 Japanese</li>
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
