import { fillImageWithPattern } from "@/lib/canvas";
import React, { useEffect, useState } from "react";

interface IImageComponent {
  leotardSwatchUrl?: {
    image: string;
    type: {
      name: string;
    };
  };
  leotard: {
    id: string;
    name: string;
    image?: string;
    trimImage?: string;
    bodyImage?: string;
  };
}

function LeotardBodyImage({ leotard, leotardSwatchUrl }: IImageComponent) {
  const [filledImage, setFilledImage] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      const imageA = new Image();
      imageA.src = leotard?.bodyImage || "";
      imageA.crossOrigin = "Anonymous";

      await new Promise((resolve) => {
        imageA.onload = resolve;
      });

      const patternImage = new Image();
      patternImage.src = leotardSwatchUrl?.image || "";
      patternImage.crossOrigin = "Anonymous";

      await new Promise((resolve) => {
        patternImage.onload = resolve;
      });

      const filledDataURL = fillImageWithPattern(
        imageA,
        patternImage,
        true,
        leotardSwatchUrl?.type?.name
      );
      setFilledImage(filledDataURL);
    };

    loadImage();
  }, [leotardSwatchUrl]);

  return (
    <div className="absolute">
      {filledImage && <img src={filledImage} alt="Filled Image" />}
    </div>
  );
}

export default LeotardBodyImage;
