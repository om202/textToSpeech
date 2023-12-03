import { createSlice } from "@reduxjs/toolkit";

export const textToSpeech = createSlice({
  name: "textToSpeech",
  initialState: {
    language: "en-US",
    speech: null,
  },
  reducers: {
    setTextToSpeechLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTextToSpeechSpeech: (state, action) => {
      state.speech = action.payload;
    },
  },
});

export const { setTextToSpeechLanguage, setTextToSpeechSpeech } =
  textToSpeech.actions;

const textToSpeechReducer = textToSpeech.reducer;
export { textToSpeechReducer };
