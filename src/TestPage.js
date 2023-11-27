import React, { useRef, useState } from "react";
import synth from "./speechSDK";
import getVoiceData from "./API";

import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const TestPage = () => {
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState("");
  const VoiceData = getVoiceData("en-US");
  const [voiceName, setVoiceName] = useState(VoiceData[0].ShortName);
  const [currentGender, setCurrentGender] = useState(null);
  const [currentStyleList, setCurrentStyleList] = useState([]);
  const [text, setText] = useState("This is default text.");

  const selectVoiceEl = useRef(null);

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

  const buttonNext = () => {
    const select = selectVoiceEl.current;
    const selectedIndex = select.selectedIndex;
    console.log("index", selectedIndex);
    const nextOption = select.options[selectedIndex + 1];
    let data;

    if (nextOption) {
      select.selectedIndex = selectedIndex + 1;
      console.log("selectedIndex Next", select.selectedIndex);
      data = JSON.parse(nextOption.value);
    } else {
      data = JSON.parse(select.options[0].value);
      select.selectedIndex = 0;
    }
    setVoiceName(data.ShortName);
    setCurrentGender(data.Gender);
    setCurrentStyleList(data.StyleList);
  };

  const updateData = (value) => {
    const data = JSON.parse(value);
    setVoiceName(data.ShortName);
    setCurrentGender(data.Gender);
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
    setCurrentGender(data.Gender);
    setCurrentStyleList(data.StyleList);
  };

  return (
    <div
      className="container p-2 p-md-3 p-lg-4 mt-4"
      style={{ maxWidth: "40rem" }}
    >
      <div className="card-body">
        <h2 className="card-title mb-5">Text to Speech</h2>
        <div className="row mb-4 g-2 g-md-3 g-lg-4">
          Gender: {currentGender}
        </div>
        <div className="row mb-4 g-2 g-md-3 g-lg-4">
          <div className="col-2 mb-2">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => buttonPrev()}
            >
              <ArrowLeft />
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
              className="btn btn-primary w-100"
              onClick={() => buttonNext()}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        {currentStyleList && currentStyleList.length > 0 && (
          <div className="row mb-4 g-2 g-md-3 g-lg-4">
            <select className="form-select">
              {currentStyleList.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
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
