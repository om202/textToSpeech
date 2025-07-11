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
import Information from "./Information";
import { INSIGHTS_CONSTANTS } from "./services/insightsConstants";
import appInsights from "./services/applicationInsights";
import Information2 from "./Information2";
import Spinner from "./components/Spinner";

const Home = ({ insights }) => {
  const DELAY = 6000; // 6 seconds in milliseconds
  const DEFAULT_TEXT = "Welcome to Voice Guru!";
  const [homeTimerStart, setHomeTimerStart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [VoiceData, setVoiceData] = useState(getVoiceData());
  const [voiceName, setVoiceName] = useState(VoiceData?.[0]?.ShortName);
  const [pitch, setPitch] = useState("medium");
  const [speed, setSpeed] = useState("medium");
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

  // page start event
  useEffect(() => {
    setHomeTimerStart(Date.now());
    const textarea = document.querySelector("#inputTextArea");
    textarea.focus();
    const PAGE_DATA = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: window.screen.width + "x" + window.screen.height,
    };

    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        insights.trackEvent({
          name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_PAGE_LOADED,
          properties: {
            data: {
              ...PAGE_DATA,
              locationData: data,
            },
          },
        });
      })
      .catch((error) => {
        insights.trackEvent({
          name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_PAGE_LOADED,
          properties: {
            data: {
              ...PAGE_DATA,
              locationData: "Error fetching location data",
            },
          },
        });
        console.error("Error:", error);
      });
  }, [insights]);

  // page end event
  useEffect(() => {
    const handleBeforeUnload = () => {
      const durationInSeconds = (Date.now() - homeTimerStart) / 1000;
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);
      insights.trackEvent({
        name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_PAGE_SESSION_DURATION,
        properties: {
          duration: `${minutes} minutes ${seconds} seconds`,
        },
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [insights, homeTimerStart]);

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

    insights.trackEvent({
      name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_BUTTON_GENERATE_VOICE,
      properties: { text: text },
    });

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

    if (currentTime - lastClickTime >= DELAY) {
      speechSDK
        .synth(text || DEFAULT_TEXT, voiceSpec)
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
          (DELAY - (currentTime - lastClickTime)) / 1000
        )} seconds before generating another audio!`
      );
      setLoading(false);
    }
  };

  const updateData = (value) => {
    insights.trackEvent({
      name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_SELECT_VOICE,
      properties: { text: value },
    });
    const data = JSON.parse(value);
    setVoiceName(data.ShortName);
    setCurrentStyleList(data.StyleList);
  };

  return (
    <div
      className="container-fluid p-3 p-md-5 p-lg-5 home-container"
      style={{ maxWidth: "748px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h1 className="mb-3 my-title">
          <img src="logo.png" alt="logo" width={"48px"} className="me-3" />{" "}
          Voice Guru{" "}
          <i
            class="bi bi-check-circle-fill"
            style={{ marginLeft: "0.5rem", fontSize: "1rem", color: "#2962D7" }}
          ></i>
        </h1>
        <h5 className="mb-5">
          <i
            className="bi bi-award"
            style={{ color: "orange", marginRight: "8px" }}
          ></i>{" "}
          Free Text to Speech (TTS) Online
        </h5>

        {/* Text Area */}
        <div className="row g-2 g-md-3 g-lg-4">
          <div className="col-12">
            <textarea
              className="form-control col-10"
              id="inputTextArea"
              placeholder={DEFAULT_TEXT}
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
          <i
            className="bi bi-rocket-takeoff"
            style={{ marginRight: "8px" }}
          ></i>{" "}
          Convert to Speech
        </button>
        {loading && (
          <div className="mt-4 d-flex justify-content-center">
            <span className="sr-only">
              <Spinner className="mr-2" />
            </span>
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
              className="btn btn-success mt-3 w-100 download-btn"
              onClick={() =>
                appInsights.trackEvent({
                  name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_BUTTON_DOWNLOAD,
                  properties: { text: text },
                })
              }
            >
              <i
                className="bi bi-cloud-download-fill"
                style={{ marginRight: "8px" }}
              ></i>{" "}
              Download Audio (MP3)
            </a>
          </div>
        )}

        {/* Settings */}
        <div className="p-4 card mt-5 shadow-sm">
          <h3 className="">
            <i class="bi bi-magic me-2"></i> Settings
          </h3>
          {Languages && (
            <div className="row mb-4 g-2 g-md-3 g-lg-4 mt-2">
              <div className="col">
                <div className="mb-2 label">
                  <i className="bi bi-flag emoji-icon"></i> Select a Language
                </div>
                <select
                  className="form-select my-select"
                  onChange={(e) => {
                    insights.trackEvent({
                      name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_SELECT_LANGUAGE,
                      properties: { text: e.target.value },
                    });
                    return dispatch(setTextToSpeechLanguage(e.target.value));
                  }}
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
              <div className="mb-2 label">
                <i className="bi bi-emoji-laughing emoji-icon"></i> Select a
                Voice
              </div>
              <select
                ref={selectVoiceEl}
                className="form-select my-select w-100"
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
                <div className="mb-2">
                  <i className="bi bi-layers emoji-icon"></i> Select a Style
                </div>
                <select
                  className="form-select my-select"
                  style={{ textTransform: "capitalize" }}
                  onChange={(e) => {
                    insights.trackEvent({
                      name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_SELECT_STYLE,
                      properties: { text: e.target.value },
                    });
                    return setSelectedStyle(e.target.value);
                  }}
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
              <div className="mb-2 label">
                <i className="bi bi-music-note-beamed emoji-icon"></i> Select
                Pitch Level
              </div>
              <select
                defaultValue="medium"
                className="form-select my-select"
                style={{ textTransform: "capitalize" }}
                onChange={(e) => {
                  insights.trackEvent({
                    name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_SELECT_PITCH,
                    properties: { text: e.target.value },
                  });
                  return setPitch(e.target.value);
                }}
              >
                {pitchLevelList.map((pitch) => (
                  <option key={pitch} value={pitch}>
                    {pitch}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-2 g-md-3 g-lg-4">
            <div className="col-12">
              <div className="mb-2 label">
                <i className="bi bi-lightning-charge emoji-icon"></i> Select
                Speed Level
              </div>
              <select
                defaultValue="medium"
                className="form-select my-select"
                style={{ textTransform: "capitalize" }}
                onChange={(e) => {
                  insights.trackEvent({
                    name: INSIGHTS_CONSTANTS.HOME_PAGE.HOME_SELECT_SPEED,
                    properties: { text: e.target.value },
                  });
                  return setSpeed(e.target.value);
                }}
              >
                {speedLevelList.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Information insights={insights} />
      <Information2 insights={insights} />
    </div>
  );
};

export default Home;
