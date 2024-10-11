import Link from "next/link";
import React from "react";
import PartialImage from "./PartialImage";

interface IPreviewImage {
  leotard?: {
    id: string;
    name: string;
    image?: string;
    trimImage?: string;
    bodyImage?: string;
    optionImage?: string;
  };
  trimColor?: any;
  bodyColor?: any;
}

const PreviewImage = ({ leotard, trimColor, bodyColor }: IPreviewImage) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="rounded-xl relative w-3/4 h-[300px] lg:w-[400px] lg:h-[600px]">
        <PartialImage image={leotard?.bodyImage} colorInfo={bodyColor} />
        <PartialImage image={leotard?.trimImage} colorInfo={trimColor} />
        {leotard?.optionImage && <PartialImage image={leotard?.optionImage} />}
      </div>
    </div>
  );
};

export default PreviewImage;
