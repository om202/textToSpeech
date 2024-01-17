import React from "react";

const About = () => {
  return (
    <div
      className="container-fluid"
      style={{ maxWidth: "748px", marginTop: "90px" }}
    >
      <h1 className="card-title mb-4 display-6">About Voice Guru</h1>
      <p className="card-text">
        Voice Guru is a free online text-to-speech tool. It helps generate
        realistic AI voices from text.
      </p>
      <h3 className="mt-5">Usage Scenarios</h3>
      <p className="card-text">
        <ul>
          <li>Create voiceovers for podcasts</li>
          <li>Generate audio for YouTube and TikTok </li>
          <li>Create voiceovers for audiobooks</li>
          <li>Create voiceovers for advertising</li>
        </ul>
      </p>
      <h3 className="mt-5">Features</h3>
      <p className="card-text">
        <ul>
          <li>Fast and easy to use</li>
          <li>Free for commercial usage </li>
          <li>Supports multiple languages</li>
          <li>Offers multiple emotions to select from</li>
        </ul>
      </p>
      <h5 className="mt-5">Updates</h5>
      <p className="card-text">
        We are continuously working on adding more features to Voice Guru.
      </p>
    </div>
  );
};

export default About;