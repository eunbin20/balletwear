"use client";
import Image from "next/image";
import { useState } from "react";
import arrowIcon from "../public/assets/svgs/icon-arrow.svg";

interface IColorSelection {
  title: string;
  colors: any;
  selectedBodyColor: any;
  onChange: (color: any) => void;
}

const ColorSelection = ({
  title,
  colors,
  selectedBodyColor,
  onChange,
}: IColorSelection) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleHeaderClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="pb-8">
      <div
        className="flex items-end gap-2 mb-3 justify-between cursor-pointer"
        onClick={handleHeaderClick}
      >
        <h1 className="font-semibold text-xl text-gray-800">{title}</h1>
        <Image src={arrowIcon} alt="arrow" className="rotate-90" />
      </div>
      <div className={`${isExpanded ? "block" : "hidden"}`}>
        <div className="flex w-fit items-center gap-2 pb-0 flex-wrap">
          {colors?.map((color: any, index: any) => {
            return (
              <div
                key={color.id}
                className={`border-2 gap-1 p-1 group/color w-fit h-8 bg-white border-r-2 shadow-md flex justify-center items-center hover:scale-110 rounded-lg ${
                  selectedBodyColor?.id === color.id && "border-gray-500"
                } `}
                onClick={() => onChange(color)}
              >
                <Image
                  src={color.image}
                  alt=""
                  layout="fixed"
                  width="24"
                  height="24"
                  className="rounded-md"
                />
                <p className="text-xs">{color.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorSelection;
