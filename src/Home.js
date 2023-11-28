import React, { useEffect, useRef, useState } from "react";
import synth from "./speechSDK";
import getVoiceData from "./API";
import { Languages } from "./API/languages";

import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState("");
  const [VoiceData, setVoiceData] = useState(getVoiceData());
  const [language, setLanguage] = useState("en-US");
  const [voiceName, setVoiceName] = useState(VoiceData?.[0]?.ShortName);
  const [currentStyleList, setCurrentStyleList] = useState(
    VoiceData?.[0]?.StyleList
  );
  const [selectedStyle, setSelectedStyle] = useState(
    VoiceData?.[0]?.StyleList?.[0] || ""
  );
  const [text, setText] = useState("Welcome to Voice Guru.");
  const [resultText, setResultText] = useState("");

  const selectVoiceEl = useRef(null);

  useEffect(() => {
    const data = getVoiceData(language);
    setVoiceData(data);
    setVoiceName(data?.[0]?.ShortName);
  }, [language]);

  const getAudio = () => {
    setLoading(true);

    const voiceSpec = {
      lang: language,
      voice: voiceName,
      style: selectedStyle || "neutral",
    };

    console.log(voiceSpec);

    synth(text, voiceSpec)
      .then((audio) => {
        setAudio(audio);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setResultText(`${voiceName}`);
  };

  const buttonNext = () => {
    const select = selectVoiceEl.current;
    const selectedIndex = select.selectedIndex;
    const nextOption = select.options[selectedIndex + 1];
    let data;

    if (nextOption) {
      select.selectedIndex = selectedIndex + 1;
      data = JSON.parse(nextOption.value);
    } else {
      data = JSON.parse(select.options[0].value);
      select.selectedIndex = 0;
    }
    setVoiceName(data.ShortName);
    setCurrentStyleList(data.StyleList);
  };

  const updateData = (value) => {
    const data = JSON.parse(value);
    setVoiceName(data.ShortName);
    setCurrentStyleList(data.StyleList);
  };

  const buttonPrev = () => {
    const select = selectVoiceEl.current;
    const selectedIndex = select.selectedIndex;
    const nextOption = select.options[selectedIndex - 1];
    const optionsLength = select.options.length;
    let data;

    if (nextOption) {
      select.selectedIndex = selectedIndex - 1;
      data = JSON.parse(nextOption.value);
    } else {
      data = JSON.parse(select.options[optionsLength - 1].value);
      select.selectedIndex = optionsLength - 1;
    }
    setVoiceName(data.ShortName);
    setCurrentStyleList(data.StyleList);
  };

  return (
    <div
      className="container-fluid p-3 p-md-5 p-lg-5"
      style={{ maxWidth: "748px" }}
    >
      <div className="card-body">
        <h1 className="card-title mb-5 display-6">Realistic AI Voice Generator</h1>
        {Languages && (
          <div className="row mb-4 g-2 g-md-3 g-lg-4">
            <div className="col">
              <select
                className="form-select"
                onChange={(e) => setLanguage(e.target.value)}
              >
                {Languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="row mb-4 g-2 g-md-3 g-lg-4">
          <div className="col-2 mb-2">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={() => buttonPrev()}
            >
              <ArrowLeft className="lead"/>
            </button>
          </div>
          <div className="col-8 mb-2">
            <select
              ref={selectVoiceEl}
              className="form-select w-100"
              onChange={(e) => updateData(e.target.value)}
            >
              {VoiceData.map((vd) => (
                <option key={vd.ShortName} value={JSON.stringify(vd)}>
                  {vd.DisplayName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={() => buttonNext()}
            >
              <ArrowRight className="lead"/>
            </button>
          </div>
        </div>
        {currentStyleList && currentStyleList.length > 0 && (
          <div className="row mb-4 g-2 g-md-3 g-lg-4">
            <div className="col">
              <select
                className="form-select"
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {currentStyleList.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
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
          <div className="mt-5 d-flex justify-content-center">
            <span className="sr-only">Processing...</span>
          </div>
        )}
        {audio && !loading && (
          <div className="mt-5">
            <span className="fw-bold">Result for: </span>
            <span>{resultText}</span>
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

export default Home;
