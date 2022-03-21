import { createSlice } from "@reduxjs/toolkit";

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    status: null,
    pending: false,
    error: false,
  },
  reducers: {
    AttendanceUpdateStart: (state) => {
      state.pending = true;
    },
    AttendanceUpdateSuccess: (state, action) => {
      state.pending = false;
      state.status = action.payload;
    },
    AttendanceUpdateError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const {
  AttendanceUpdateStart,
  AttendanceUpdateSuccess,
  AttendanceUpdateError,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
