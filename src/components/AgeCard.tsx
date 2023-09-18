import React from "react";
import AgeInput from "./AgeInput";
import AgeResult from "./AgeResult";
import Calendar from "./Calendar";

const AgeCard = () => {
  return (
    <div className="overflow-hidden bg-white w-full max-w-md lg:max-w-[840px] h-[486px] lg:h-[651px] rounded-[22px] rounded-br-[102px] lg:rounded-br-[200px] mt-2 lg:mt-0 py-11 lg:py-12 px-6 lg:px-14 relative">
      <button
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <i className="fas fa-calendar-alt absolute top-6 sm:top-11 lg:top-12 right-6 sm:right-6 lg:right-14 cursor-pointer hover:text-purple"></i>
      </button>
      <Calendar />
      <AgeInput />
      <AgeResult />
    </div>
  );
};

export default AgeCard;
