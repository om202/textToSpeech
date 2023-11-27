import voiceData from "./allSpeechData.json";

const getVoiceData = (lang = "en-US") =>
  voiceData.filter((data) => data.Locale === lang);

export default getVoiceData;
