import { useState } from "react";
import { MicFill } from "react-bootstrap-icons";
import speechSDK from "./speechSDK";

export const Microphone = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleMicrophoneClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      speechSDK.transcribeSpeech();
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => handleMicrophoneClick()}
      style={{ backgroundColor: isRecording && "crimson", border: "none" }}
    >
      <MicFill color={isRecording ? "white" : "black"} />
    </button>
  );
};
