import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./reducers/calendarSlice";
import ageReducer from "./reducers/ageSlice";

export const store = configureStore({
  reducer: {
    age: ageReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;