import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import locale from "dayjs/locale/en";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    pickedDate: dayjs(),
    pickedDay: parseInt(dayjs().format("DD")),
    pickedMonth: dayjs().format("MMMM"),
    pickedYear: parseInt(dayjs().format("YYYY")),
  },
  reducers: {
    nextMonth: (state) => {
      state.pickedDate = state.pickedDate.add(1, "month");
    },
    prevMonth: (state) => {
      state.pickedDate = state.pickedDate.subtract(1, "month");
    },
    chooseDate: (state, { payload }) => {
      state.pickedDate = state.pickedDate.set("date", payload);
      state.pickedDay = parseInt(
        state.pickedDate.set("date", payload).format("DD")
      );
      state.pickedMonth = state.pickedDate.set("date", payload).format("MMMM");
      state.pickedYear = parseInt(
        state.pickedDate.set("date", payload).format("YYYY")
      );
    },
    inputFormDate: (state, { payload }) => {
      state.pickedDay = payload.day || state.pickedDay || 28;
      state.pickedMonth = payload.month || state.pickedMonth || 12;
      state.pickedYear = payload.year || state.pickedYear;
      state.pickedDate =
        dayjs(`${state.pickedYear}-${state.pickedMonth}-${state.pickedDay}`) ||
        state.pickedDate;
    },
  },
});

export const { nextMonth, prevMonth, chooseDate, inputFormDate } =
  calendarSlice.actions;
export default calendarSlice.reducer;
