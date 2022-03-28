import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    companyDetails: [],
    pending: false,
    error: false,
    isCompanyRegistered: false,
  },
  reducers: {
    updateCompanyStart: (state) => {
      state.pending = true;
      state.isCompanyRegistered = false;
    },
    updateCompanySuccess: (state, action) => {
      state.pending = false;
      state.companyDetails = action.payload;
      state.isCompanyRegistered = true;
    },
    updateCompanyError: (state) => {
      state.error = true;
      state.pending = false;
      state.isCompanyRegistered = false;
    },
  },
});

export const { updateCompanyStart, updateCompanySuccess, updateCompanyError } =
  companySlice.actions;

export default companySlice.reducer;
