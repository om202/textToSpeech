import React, { useEffect, useRef, useState } from "react";
import speechSDK from "./speechSDK";
import getVoiceData from "./API";
import { Microphone } from "./Microphone";
import { Languages } from "./API/languages";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import autosize from "autosize";
import {
  setTextToSpeechLanguage,
  setTextToSpeechSpeech,
} from "./services/textToSpeechReducer";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [VoiceData, setVoiceData] = useState(getVoiceData());
  const [voiceName, setVoiceName] = useState(VoiceData?.[0]?.ShortName);
  const [currentStyleList, setCurrentStyleList] = useState(
    VoiceData?.[0]?.StyleList
  );
  const [selectedStyle, setSelectedStyle] = useState(
    VoiceData?.[0]?.StyleList?.[0] || ""
  );
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const selectVoiceEl = useRef(null);
  let isFirstChange = useRef(true);

  // global state
  const dispatch = useDispatch();
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
    setLoading(true);

    const voiceSpec = {
      lang: language,
      voice: voiceName,
      style: selectedStyle || "neutral",
    };

    speechSDK
      .synth(text, voiceSpec)
      .then((audio) => {
        dispatch(setTextToSpeechSpeech(audio));
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
      style={{ maxWidth: "748px", marginTop: "80px" }}
    >
      <div className="card-body">
        <h1 className="card-title mb-5 display-6">
          Realistic AI Voice Generator
        </h1>
        {Languages && (
          <div className="row mb-4 g-2 g-md-3 g-lg-4">
            <div className="col">
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
          <div className="col-2 mb-2">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={() => buttonPrev()}
            >
              <ArrowLeft className="lead" />
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
              <ArrowRight className="lead" />
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
        <div className="row mb-4 g-2 g-md-3 g-lg-4">
          <div className="col-10 mb-2">
            <textarea
              style={{ minHeight: "64px", maxHeight: "192px", overflow: 'auto', resize: "none"}}
              className="form-control col-10"
              id="inputTextArea"
              placeholder={text}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="col-2">
            <Microphone />
          </div>
        </div>
        <button
          disabled={loading}
          type="button"
          className="mt-4 btn btn-primary w-100"
          onClick={() => getAudio()}
        >
          Generate Voice
        </button>
        {loading && (
          <div className="mt-5 d-flex justify-content-center">
            <span className="sr-only">Processing...</span>
          </div>
        )}
        {audio && !loading && (
          <div className="mt-5">
            <span className="fw-bold">Result : </span>
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
              Download Audio (WAV)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
