import Link from "next/link";
import React from "react";
import LeotardBodyImage from "@/components/LeotardBodyImage";
import LeotardTrimImage from "@/components/LeotardTrimImage";

interface IPreviewImage {
  leotardType?: string;
  leotardSwatchUrl?: string;
  trimSwatchUrl?: string;
}

const PreviewImage = ({
  leotardType,
  leotardSwatchUrl,
  trimSwatchUrl,
}: IPreviewImage) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="rounded-xl relative w-96 h-96 bg-red border-2 border-black border-dashed ">
        {/* <LeotardBodyImage
        leotardType={leotardType}
        leotardSwatchUrl={leotardSwatchUrl}
      />
      <LeotardTrimImage
        leotardType={leotardType}
        trimSwatchUrl={trimSwatchUrl}
      /> */}
      </div>
    </div>
  );
};

export default PreviewImage;
