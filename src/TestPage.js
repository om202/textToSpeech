import React, { useState } from "react";
import synth from "./speechSDK";
import { VoiceData } from "./data";

import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const TestPage = () => {
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState("");
  const [voiceName, setVoiceName] = useState(VoiceData[0].code);
  const [text, setText] = useState("This is default text.");

  const selectVoiceEl = document.getElementById('voiceSelect');

  const getAudio = () => {
    setLoading(true);

    const voiceSpec = {
      lang: "en-US",
      voice: voiceName,
      style: "happy",
    };

    synth(text, voiceSpec)
      .then((audio) => {
        setAudio(audio);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buttonNext = (type) => {
    if(type === 'voice') {
      const selectedIndex = selectVoiceEl.selectedIndex;
      const nextOption = selectVoiceEl.options[selectedIndex + 1];
      if(nextOption) {
        selectVoiceEl.selectedIndex = selectedIndex + 1;
        setVoiceName(nextOption.value);
      } else {
        setVoiceName(selectVoiceEl.options[0].value);
        selectVoiceEl.selectedIndex = 0;
      }
    }
  };

  const buttonPrev = (type) => {
    if(type === 'voice') {
      const options = selectVoiceEl.options;
      const selectedIndex = selectVoiceEl.selectedIndex;
      const prevOption = options[selectedIndex - 1];
      if(prevOption) {
        selectVoiceEl.selectedIndex = selectedIndex - 1;
        setVoiceName(prevOption.value);
      } else {
        setVoiceName(options[options.length - 1].value);
        selectVoiceEl.selectedIndex = options.length - 1;
      }
    }
  };

  return (
    <div
      className="container p-2 p-md-3 p-lg-4 mt-4"
      style={{ maxWidth: "40rem" }}
    >
      <div className="card-body">
        <h2 className="card-title mb-5">Text to Speech</h2>
        <div className="row mb-4 g-2 g-md-3 g-lg-4">
          <div className="col-2 mb-2">
            <button type="button" className="btn btn-primary w-100" onClick={()=>buttonPrev('voice')}>
              <ArrowLeft />
            </button>
          </div>
          <div className="col-8 mb-2">
            <select
              id="voiceSelect"
              className="form-select w-100"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
            >
              {VoiceData.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-primary w-100" onClick={() => buttonNext('voice')}>
              <ArrowRight />
            </button>
          </div>
        </div>
        <textarea
          style={{ resize: "vertical" }}
          className="form-control"
          placeholder="Enter text to speak"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={loading}
          type="button"
          className="mt-4 btn btn-primary w-100"
          onClick={() => getAudio()}
        >
          Create Speech
        </button>
        {loading && (
          <div className="mt-4 d-flex justify-content-center">
            <span className="sr-only">Processing...</span>
          </div>
        )}
        {audio && !loading && (
          <div className="mt-4">
            <audio src={audio} controls="controls" className="w-100">
              {" "}
              Your browser does not support audio{" "}
            </audio>
            <a
              href={audio}
              download="audio.wav"
              className="btn btn-success mt-3 w-100"
            >
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
