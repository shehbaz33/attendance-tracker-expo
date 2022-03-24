import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import attendanceReducer from './attendanceSlice'
import companyReducer from './companySlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    attendance: attendanceReducer,
    company: companyReducer,
  },
})