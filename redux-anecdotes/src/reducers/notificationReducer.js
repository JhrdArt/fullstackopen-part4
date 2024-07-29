import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

let timeOut = null;

export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeOut) {
      clearTimeout(timeOut);
    }

    timeOut = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};	