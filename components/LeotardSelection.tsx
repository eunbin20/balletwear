"use client";
import Image from "next/image";
import { useState } from "react";
import arrowIcon from "../public/assets/svgs/icon-arrow.svg";

interface ILeotardSelection {
  leotards: any;
  selectedLeotard: any;
  onChange: (leotard: any) => void;
}
const LeotardSelection = ({
  leotards,
  selectedLeotard,
  onChange,
}: ILeotardSelection) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLeotardItemClick = (leotard: any) => {
    onChange(leotard);
  };

  const handleHeaderClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="pb-4">
      <div
        className="flex items-end gap-2 mb-4 justify-between cursor-pointer"
        onClick={handleHeaderClick}
      >
        <h1 className="font-semibold text-xl text-gray-800">레오타드</h1>
        <Image src={arrowIcon} alt="arrow" className="rotate-90" />
      </div>
      <div
        className={`overflow-x-scroll p-4 -m-4 ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <div className="flex w-fit items-center justify-center gap-4 m-auto pb-3">
          {leotards?.map((leotard: any) => {
            return (
              <div
                key={leotard.name}
                className={`border-2 w-30 lg:w-40 bg-white shadow-md flex flex-col justify-center items-center hover:scale-105 rounded-2xl ${
                  selectedLeotard?.id === leotard.id && "border-gray-500"
                }`}
                onClick={() => handleLeotardItemClick(leotard)}
              >
                <div className="relative w-20 h-28 lg:w-28 lg:h-44">
                  <Image
                    src={leotard.image}
                    alt={leotard.name}
                    fill
                    objectFit="cover"
                    className="p-2"
                  />
                </div>
                <div className="text-gray-800">{leotard.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeotardSelection;
