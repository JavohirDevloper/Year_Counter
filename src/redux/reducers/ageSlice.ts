import { createSlice } from "@reduxjs/toolkit";

interface ageState {
  day: number | string;
  month: number | string;
  year: number | string;
  // currentDay: number;
  // currentMonth: number;
  // currentYear: number;
  ageDay: number;
  ageMonth: number;
  ageYear: number;
  // dayNumbers: number;
  input: { day: string; month: string; year: string };
}

const initialState: ageState = {
  day: "",
  month: "",
  year: "",
  ageDay: 0,
  ageMonth: 0,
  ageYear: 0,
  // currentDay: new Date().getDate(),
  // currentMonth: new Date().getMonth() + 1,
  // currentYear: new Date().getFullYear(),
  // dayNumbers: 0,
  input: {
    day: "",
    month: "",
    year: "",
  },
};

const ageSlice = createSlice({
  name: "age",
  initialState,
  reducers: {
    setInput: (state, { payload }) => {
      state.day = payload.day;
      state.month = payload.month;
      state.year = payload.year;
      state.input = payload;
    },
    calculateAge: (state, { payload }) => {
      const date = new Date(payload);
      state.day = date.getDate();
      state.month = date.getMonth() + 1;
      state.year = date.getFullYear();

      let myDate = new Date(payload);
      let today = new Date();
      let age = today.getTime() - myDate.getTime();
      let elapsed = new Date(age);
      state.ageYear = elapsed.getFullYear() - 1970;
      state.ageMonth = elapsed.getMonth();
      state.ageDay = elapsed.getDay();

      // state.dayNumbers = new Date(
      //   state.year !== 0 ? state.year : state.currentYear,
      //   state.month !== 0 ? state.month : state.currentMonth,
      //   0
      // ).calculateAge();
    },
    inputCalendarDate: (state, { payload }) => {
      state.input = {
        day: payload.day,
        month: payload.month,
        year: payload.year,
      };
    },
  },
});

export const { calculateAge, setInput, inputCalendarDate } = ageSlice.actions;
export default ageSlice.reducer;
