import { createSlice } from "@reduxjs/toolkit";

export const speechToText = createSlice({
  name: "speechToText",
  initialState: {
    text: null,
    recording: false,
  },
  reducers: {
    setSpeechToText: (state, action) => {
      state.text = action.payload;
    },
    setSpeechToTextRecording: (state, action) => {
      state.recording = action.payload;
    }
  },
});

export const {
  setSpeechToText,
  setSpeechToTextRecording,
} = speechToText.actions;

const speechToTextReducer = speechToText.reducer;
export { speechToTextReducer };