import Link from "next/link";
import React from "react";
import LeotardBodyImage from "@/components/LeotardBodyImage";
import LeotardTrimImage from "@/components/LeotardTrimImage";

interface IPreviewImage {
  leotard: {
    id: string;
    name: string;
    image?: string;
    trimImage?: string;
    bodyImage?: string;
  };
  trimColor?: any;
  bodyColor?: any;
}

const PreviewImage = ({ leotard, trimColor, bodyColor }: IPreviewImage) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="rounded-xl relative w-[400px] h-[600px]">
        <LeotardBodyImage leotard={leotard} leotardSwatchUrl={bodyColor} />
        <LeotardTrimImage leotard={leotard} trimSwatchUrl={trimColor} />
      </div>
    </div>
  );
};

export default PreviewImage;
