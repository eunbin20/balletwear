import { fillImageWithPattern } from "@/lib/canvas";
import React, { useEffect, useState } from "react";

interface IPartialImage {
  colorInfo?: {
    image: string;
    type: {
      name: string;
    };
  };
  image?: string;
}

const PartialImage = ({ image, colorInfo }: IPartialImage) => {
  const [filledImage, setFilledImage] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      if (colorInfo) {
        const imageA = new Image();
        imageA.src = image || "";
        imageA.crossOrigin = "Anonymous";

        await new Promise((resolve) => {
          imageA.onload = resolve;
        });

        const patternImage = new Image();
        patternImage.src = colorInfo?.image || "";
        patternImage.crossOrigin = "Anonymous";

        await new Promise((resolve) => {
          patternImage.onload = resolve;
        });

        const filledDataURL = fillImageWithPattern(
          imageA,
          patternImage,
          true,
          colorInfo?.type?.name
        );

        setFilledImage(filledDataURL);
      } else {
        image && setFilledImage(image);
      }
    };

    loadImage();
  }, [colorInfo, image]);

  return (
    <div className="absolute">
      {filledImage && <img src={filledImage} alt="Filled Image" />}
    </div>
  );
};

export default PartialImage;
