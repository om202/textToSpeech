import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import thunk from "redux-thunk";
import { speechToTextReducer } from "./speechToTextReducer";
import { textToSpeechReducer } from "./textToSpeechReducer";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    speechToText: speechToTextReducer,
    textToSpeech: textToSpeechReducer,
  },
  middleware: [thunk],
});

export function getState() {
  return store.getState();
}
