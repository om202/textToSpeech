import React from "react";

const Information = () => {
  return (
    <div className="information-card">
      <h1>Voice Guru - The Best AI Text-to-Speech Website on the Internet</h1>
      <p>
        Voice Guru helps instantly convert your text to speech. Create
        natural-sounding audio and download it in MP3 format. Voices can be
        generated in multiple languages, with adjustable speech rate, pitch, and
        emotions. Perfect for content creators, developers, and businesses.
      </p>
      <p>
        We currently support 16 languages. More languages will be added in the
        future.
      </p>
      <p>
        <i>If you like our work, please consider supporting us with a coffee.</i>
        <br />
        <a
          href="https://www.buymeacoffee.com/voiceguru"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-me-a-coffee"
        >
          <i class="bi bi-cup-hot"></i> Buy me a coffee
        </a>
      </p>
    </div>
  );
};

export default Information;
