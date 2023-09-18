import React, { useEffect } from "react";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import {
  nextMonth,
  prevMonth,
  chooseDate,
  inputFormDate,
} from "../redux/reducers/calendarSlice";
import { RootState } from "../redux/store";
import { inputCalendarDate } from "../redux/reducers/ageSlice";

const Calendar = () => {
  const dispatch = useDispatch();

  const { pickedDate, pickedDay, pickedMonth, pickedYear } = useSelector(
    (state: RootState) => state.calendar
  );
  const { input } = useSelector((state: RootState) => state.age);

  useEffect(() => {
    dispatch(
      inputFormDate({
        // DAY, MONTH AND YEAR ARE VALIDATED BEFORE SETTING THE PICKED DATE SO THE APP DOES CRASH
        day:
          input.day !== "" && input.day !== "0" && parseInt(input.day) < 32
            ? input.day
            : pickedDay,
        month:
          input.month !== "" &&
          input.month !== "0" &&
          parseInt(input.month) < 13
            ? dayjs()
                .month(parseInt(input.month) - 1)
                .format("MMMM")
            : pickedMonth,
        year:
          input.year !== "" &&
          input.year !== "0" &&
          parseInt(input.year) > 1800 &&
          parseInt(input.year) <= new Date().getFullYear()
            ? input.year
            : pickedYear,
      })
    );
  }, [input]);

  // GET ALL DAYS OF THE WEEK STARTING FROM MONDAY I.E (.day(1))
  const startWeek = dayjs().day(1);
  // GET ARRAY OF DAYS WITH A 3 LETTER FORMAT
  const weekDays = Array.from(new Array(7).keys()).map((index) => {
    return startWeek.add(index, "day").format("ddd");
  });
  // GET THE CURRENT MONTH
  const currentMonth = pickedDate.format("MMMM");
  // GET THE CURRENT MONTH
  const currentYear = pickedDate.format("YYYY");
  // TOTAL NUMBER OF DATE IN THE MONTH
  // const allDates = dayjs().month(7).daysInMonth();
  const allDates = pickedDate.daysInMonth();
  // ARRAY OF ALL THE DATED IN A MONTH
  const allDatesArray = [...Array(allDates + 1).keys()].slice(1);
  // GET THE DAY OF THE WEEK IT STARTS FROM
  const startDay = pickedDate.startOf("month").format("ddd");

  // GET THE INDEX OF THE DAY IN DAYS OF THE WEEK ARRAY
  const weekIndex = weekDays.indexOf(startDay);

  interface Array<T> {
    fill(value: T): Array<T>;
  }

  return (
    <div
      className="absolute right-2 sm:right-4 top-12 z-10 w-[90%] sm:w-full bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-lg max-w-[342px]  px-4 py-5 lg:px-8 lg:py-6 mt-4 mx-auto flex-1 font-light collapse"
      id="collapseExample"
    >
      <div className="flex items-center justify-between mb-4 font-light">
        <div
          onClick={() => dispatch(prevMonth())}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-light-grey hover:bg-purple transition-all"
        >
          <i className="fas fa-chevron-left text-xs h-fit hover:text-white transition-all"></i>
          <span className="sr-only">Previous</span>
        </div>
        <h2 className="text-center ">
          {currentMonth} {currentYear}
        </h2>
        <div
          onClick={() => dispatch(nextMonth())}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-light-grey hover:bg-purple transition-all"
        >
          <i className="fas fa-chevron-right text-xs h-fit hover:text-white transition-all"></i>
          <span className="sr-only">Next</span>
        </div>
      </div>
      <div className="grid grid-cols-7">
        {weekDays.map((weekDay, index) => (
          <div
            className={`text-center text-[10px] sm:text-xs lg:p-2 font-bold ${
              weekDay === "Sun" ? "text-purple" : ""
            }`}
            key={`weekday_${index}`}
          >
            {weekDay}
          </div>
        ))}
        <>
          {/* EMPTY SPACE TO FILL PREV MONTH */}
          {Array<number>(weekIndex)
            .fill(0)
            .map((item, index) => (
              <div key={index}></div>
            ))}
        </>
        <>
          {allDatesArray.map((day, index) => {
            return (
              // LET EVERY SUNDAY DATE HAVE A RED TEXT
              <div
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                key={index}
                onClick={() => {
                  dispatch(chooseDate(day));
                  dispatch(
                    inputCalendarDate({
                      day: day.toString(),
                      month: dayjs(pickedDate).format("MM"),
                      year: currentYear,
                    })
                  );
                }}
                className={`text-center sm:px-2 py-1 text-sm lg:text-base cursor-pointer lg:hover:bg-light-grey lg:hover:bg-opacity-10 border border-smokey-grey ${
                  (index + weekIndex + 1) % 7 === 0 ? "text-purple" : ""
                } ${
                  // CHECK FOR THE PICKED DAY, MONTH AND YEAR
                  day.toString() === pickedDay.toString() &&
                  currentMonth.toString() === pickedMonth.toString()
                    ? "bg-purple bg-opacity-40 border border-purple"
                    : ""
                } `}
              >
                {day}
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Calendar;
