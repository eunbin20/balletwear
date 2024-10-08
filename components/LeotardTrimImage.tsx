import { fillImageWithPattern } from "@/lib/canvas";
import { useEffect, useState } from "react";

interface IImageComponent {
  trimSwatchUrl?: any;
  leotard: {
    id: string;
    name: string;
    image?: string;
    trimImage?: string;
    bodyImage?: string;
  };
}

function LeotardTrimImage({ leotard, trimSwatchUrl }: IImageComponent) {
  const [filledImage, setFilledImage] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      if (!leotard.image) return;
      const imageA = new Image();
      imageA.src = leotard?.trimImage || "";
      imageA.crossOrigin = "Anonymous";
      await new Promise((resolve) => {
        imageA.onload = resolve;
      });

      const patternImage = new Image();
      patternImage.src = trimSwatchUrl.image || "";
      patternImage.crossOrigin = "Anonymous";
      await new Promise((resolve) => {
        patternImage.onload = resolve;
      });

      const filledDataURL = fillImageWithPattern(imageA, patternImage);
      setFilledImage(filledDataURL);
    };

    loadImage();
  }, [trimSwatchUrl]);

  return (
    <div className="absolute ">
      {filledImage && <img src={filledImage} alt="Filled Image" />}
    </div>
  );
}

export default LeotardTrimImage;
