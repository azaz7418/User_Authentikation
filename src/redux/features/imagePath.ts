import { createSlice, Reducer } from "@reduxjs/toolkit";
import moment from "moment";

interface IImageState {
  time: string;
  date: moment.Moment;
  image: string;
  timeZone: string;
  name: string;
  country: string;
}

const initialState = {
  time: "",
  date: moment(),
  image: "/image/weather-image.jpg",
  timeZone: "",
  name: "",
  country: "",
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      const { path } = action.payload;
      state.image = path;
    },
    setTimeZone: (state, action) => {
      const { timeZone } = action.payload;
      state.timeZone = timeZone;
    },
    setLocation: (state, action) => {
      const { name, country } = action.payload;
      state.country = country;
      state.name = name;
    },
  },
});
export const { setImage, setTimeZone, setLocation } = imageSlice.actions;
const imageReducer: Reducer<IImageState> = imageSlice.reducer;

export default imageReducer;
