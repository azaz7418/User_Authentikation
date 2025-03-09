import { createSlice, Reducer } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  time: "",
  date: moment(),
  video: "",
  timeZone: "",
  name: "",
  country: "",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      const { path } = action.payload;
      state.video = path;
    },
    setTimeZone: (state, action) => {
      const { timeZone } = action.payload;
      state.timeZone = timeZone;
    },
    setLocation: (state, action) => {
      const {name, country} = action.payload
      state.country= country
      state.name= name
    },
  },
});
export const { setVideo, setTimeZone, setLocation } = videoSlice.actions;
const videoReducer: Reducer<any> = videoSlice.reducer;

export default videoReducer;
