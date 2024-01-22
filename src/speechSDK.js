import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";
import { store } from "./services/store";
import { setSpeechToText } from "./services/speechToTextReducer";

const speechConfig = SpeechConfig.fromSubscription(
  process.env.REACT_APP_AZURE_KEY,
  process.env.REACT_APP_AZURE_AREA
);

const spechToTextSpec = AudioConfig.fromDefaultMicrophoneInput();
let speechToTextRecognizer;

/**
 * @param {string} text
 * @param {object} voiceSpec
 * @returns {string}
 **/

const audioSSML = (
  text = "Welcome",
  {
    lang = "en-US",
    voice = "en-US-JennyNeural",
    style = "neutral",
    pitch = "medium",
    speed = "medium",
  }
) => {
  console.log("voiceSpec ???", { lang, voice, style, pitch, speed });

  const ssml = `
  <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"  xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${lang}">
    <voice name="${voice}">
      <mstts:express-as style="${style}">
      <prosody rate="${pitch}" pitch="${speed}">
        ${text}
      </prosody>
      </mstts:express-as>
    </voice>
  </speak>`;
  console.log("ssml", ssml);
  return ssml;
};

/**
 * @param {string} text
 * @param {string} voiceName
 * @returns {Promise<string>}
 */

const synth = async (text, voiceSpec) => {
  const synthesizer = new SpeechSynthesizer(speechConfig, null);

  return new Promise((resolve, reject) =>
    synthesizer.speakSsmlAsync(
      audioSSML(text, voiceSpec),
      (result) => {
        if (result) {
          const audioBlob = new Blob([result.audioData], { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(audioBlob);
          synthesizer.close();
          resolve(audioUrl);
        }
        synthesizer.close();
      },
      (error) => {
        console.log(error);
        synthesizer.close();
        reject(error);
      }
    )
  );
};

const transcribeSpeech = () => {
  const language = store.getState().textToSpeech.language;
  speechConfig.speechRecognitionLanguage = language;
  speechToTextRecognizer = new SpeechRecognizer(speechConfig, spechToTextSpec);
  speechToTextRecognizer.startContinuousRecognitionAsync();
  let result = "";
  speechToTextRecognizer.recognized = (s, e) => {
    if (e.result.text) {
      result += " " + e.result.text;
    }
    store.dispatch(setSpeechToText(result));
  };
};

const stopTranscribeSpeech = () => {
  speechToTextRecognizer.stopContinuousRecognitionAsync();
};

const speechSDK = { synth, transcribeSpeech, stopTranscribeSpeech };

export default speechSDK;
