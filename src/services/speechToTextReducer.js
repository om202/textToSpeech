import { createSlice } from "@reduxjs/toolkit";

export const speechToText = createSlice({
  name: "speechToText",
  initialState: {
    text: null,
  },
  reducers: {
    setSpeechToText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const {
  setSpeechToText,
} = speechToText.actions;

const speechToTextReducer = speechToText.reducer;
export { speechToTextReducer };