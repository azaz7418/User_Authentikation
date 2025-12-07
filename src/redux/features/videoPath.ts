import { createSlice, Reducer } from "@reduxjs/toolkit";
import moment from "moment";

interface IVideoState {
  time: string;
  date: moment.Moment;
  video: string;
  timeZone: string;
  name: string;
  country: string;
} 

const initialState = {
  time: "",
  date: moment(),
  video: "/src/assets/video/weather-video.mp4",
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
const videoReducer: Reducer<IVideoState> = videoSlice.reducer;

export default videoReducer;
