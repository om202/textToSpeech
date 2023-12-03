import { MicFill } from "react-bootstrap-icons";
import speechSDK from "./speechSDK";
import { useSelector, useDispatch } from "react-redux";
import { setSpeechToTextRecording } from "./services/speechToTextReducer";

export const Microphone = () => {
  const dispatch = useDispatch();
  const isRecording = useSelector((state) => state.speechToText.recording);

  const handleMicrophoneClick = () => {
    dispatch(setSpeechToTextRecording(!isRecording));
    if (!isRecording) {
      speechSDK.transcribeSpeech();
    } else {
      speechSDK.stopTranscribeSpeech();
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
