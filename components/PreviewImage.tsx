import Link from "next/link";
import React from "react";
import LeotardBodyImage from "@/components/LeotardBodyImage";
import LeotardTrimImage from "@/components/LeotardTrimImage";

interface IPreviewImage {
  leotardType: string;
  leotardSwatchUrl?: string;
  trimSwatchUrl?: string;
}

const PreviewImage = ({
  leotardType,
  leotardSwatchUrl,
  trimSwatchUrl,
}: IPreviewImage) => {
  return (
    <div className="relative">
      <LeotardBodyImage
        leotardType={leotardType}
        leotardSwatchUrl={leotardSwatchUrl}
      />
      <LeotardTrimImage
        leotardType={leotardType}
        trimSwatchUrl={trimSwatchUrl}
      />
    </div>
  );
};

export default PreviewImage;
