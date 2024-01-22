import React, { useEffect, useRef, useState } from "react";
import speechSDK from "./speechSDK";
import getVoiceData from "./API";
import { Languages } from "./API/languages";
import { useSelector, useDispatch } from "react-redux";
import autosize from "autosize";
import {
  setTextToSpeechLanguage,
  setTextToSpeechSpeech,
} from "./services/textToSpeechReducer";
import { toast } from "react-toastify";

const Home = () => {
  const delay = 60000; // 1 minute in milliseconds
  const [loading, setLoading] = useState(false);
  const [VoiceData, setVoiceData] = useState(getVoiceData());
  const [voiceName, setVoiceName] = useState(VoiceData?.[0]?.ShortName);
  const [pitch, setPitch] = useState('medium');
  const [speed, setSpeed] = useState('medium');
  const [currentStyleList, setCurrentStyleList] = useState(
    VoiceData?.[0]?.StyleList
  );
  const [selectedStyle, setSelectedStyle] = useState(
    VoiceData?.[0]?.StyleList?.[0] || ""
  );
  const [text, setText] = useState("");
  const selectVoiceEl = useRef(null);
  let isFirstChange = useRef(true);

  const pitchLevelList = ["x-low", "low", "medium", "high", "x-high"];
  const speedLevelList = ["x-slow", "slow", "medium", "fast", "x-fast"];

  // global state
  const dispatch = useDispatch();
  const storedLastClickTime =
    parseInt(localStorage.getItem("lastClickTime")) || 0;
  const [lastClickTime, setLastClickTime] = useState(storedLastClickTime);
  const transcribedText = useSelector((state) => state.speechToText.text);
  const isRecording = useSelector((state) => state.speechToText.recording);
  const language = useSelector((state) => state.textToSpeech.language);
  const audio = useSelector((state) => state.textToSpeech.speech);

  useEffect(() => {
    if (isFirstChange.current) {
      transcribedText && setText((prevText) => prevText + transcribedText);
      isFirstChange.current = false;
    } else {
      transcribedText && setText(transcribedText);
    }
  }, [transcribedText]);

  useEffect(() => {
    if (!isRecording) {
      isFirstChange.current = true;
    }
  }, [isRecording]);

  useEffect(() => {
    const textarea = document.querySelector("#inputTextArea");
    autosize.update(textarea);
    autosize(textarea);
  }, [text]);

  useEffect(() => {
    const data = getVoiceData(language);
    setVoiceData(data);
    setVoiceName(data?.[0]?.ShortName);
  }, [language]);

  const getAudio = () => {
    const currentTime = Date.now();
    if (!text) {
      toast.error("Enter some text!");
      return;
    }

    if (text.length > 120) {
      toast.error(
        "Text exceeds 120 characters! Current length: " +
          text.length +
          " characters"
      );
      return;
    }

    setLoading(true);

    const voiceSpec = {
      lang: language,
      voice: voiceName,
      style: selectedStyle || "neutral",
      pitch: pitch,
      speed: speed,
    };

    if (currentTime - lastClickTime >= delay) {
      speechSDK
        .synth(text, voiceSpec)
        .then((audio) => {
          dispatch(setTextToSpeechSpeech(audio));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      setLastClickTime(currentTime);
      localStorage.setItem("lastClickTime", currentTime.toString());
    } else {
      toast.info(
        `Please wait ${Math.round(
          (delay - (currentTime - lastClickTime)) / 1000
        )} seconds before generating another audio!`
      );
      setLoading(false);
    }
  };

  const updateData = (value) => {
    const data = JSON.parse(value);
    setVoiceName(data.ShortName);
    setCurrentStyleList(data.StyleList);
  };

  return (
    <div
      className="container-fluid p-3 p-md-5 p-lg-5"
      style={{ maxWidth: "748px", marginTop: "80px" }}
    >
      <div className="card-body">
        <h1 className="card-title mb-5 display-6">Free AI Voice Generator</h1>

        {Languages && (
          <div className="row mb-4 g-2 g-md-3 g-lg-4">
            <div className="col">
              <div className="mb-2">Choose a Language 🇱🇷</div>
              <select
                className="form-select"
                onChange={(e) =>
                  dispatch(setTextToSpeechLanguage(e.target.value))
                }
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
          <div className="col-12 mb-2">
            <div className="mb-2">Choose a Voice 😄</div>
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
        </div>
        {currentStyleList && currentStyleList.length > 0 && (
          <div className="row mb-4 g-2 g-md-3 g-lg-4">
            <div className="col">
              <div className="mb-2">Choose a Style 🎭</div>
              <select
                className="form-select"
                style={{ textTransform: "capitalize" }}
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
        <div className="row g-2 g-md-3 g-lg-4 mb-4">
          <div className="col-12">
            <div className="mb-2">Choose pitch level 🎵</div>
            <select
                defaultValue="medium"
                className="form-select"
                style={{ textTransform: "capitalize" }}
                onChange={(e) => setSpeed(e.target.value)}
              >
                {pitchLevelList.map((pitch) => (
                  <option key={pitch} value={pitch}>
                    {pitch}
                  </option>
                ))}
              </select>
          </div>
        </div>
        <div className="row g-2 g-md-3 g-lg-4 mb-4">
          <div className="col-12">
            <div className="mb-2">Choose speed level ⚡</div>
            <select
                defaultValue="medium"
                className="form-select"
                style={{ textTransform: "capitalize" }}
                onChange={(e) => setPitch(e.target.value)}
              >
                {speedLevelList.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}
                  </option>
                ))}
              </select>
          </div>
        </div>
        <div className="row g-2 g-md-3 g-lg-4">
          <div className="col-12">
            <textarea
              style={{
                minHeight: "64px",
                maxHeight: "192px",
                overflow: "auto",
                resize: "none",
              }}
              // maxLength={120}
              className="form-control col-10"
              id="inputTextArea"
              placeholder={"Enter Text 📝"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <button
          disabled={loading}
          type="button"
          className="mt-4 btn btn-primary w-100 btn-gradient"
          style={{ height: "3rem", fontSize: "1.1rem" }}
          onClick={() => getAudio()}
        >
          Generate Voice
        </button>
        {loading && (
          <div className="mt-4 d-flex justify-content-center">
            <span className="sr-only">Processing...</span>
          </div>
        )}
        {audio && !loading && (
          <div className="mt-4">
            <audio src={audio} controls="controls" className="w-100 mt-3">
              {" "}
              Your browser does not support audio{" "}
            </audio>
            <a
              href={audio}
              download="audio.mp3"
              className="btn btn-success mt-3 w-100"
            >
              Download (MP3)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
