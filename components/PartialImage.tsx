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
  const [imageSize, setImageSize] = useState({
    width: 300,
    height: 400
  })

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


  useEffect(() => {
    if (window.innerWidth > 1024) return;

    const vh = window.innerHeight * 0.01;
    const screenHeight = vh * 100;
    const imageHeight = screenHeight - 380;

    setImageSize({
      width: imageHeight * 3/4,
      height: imageHeight
    })
  }, []);

  return (
    <div className="absolute top-20 lg:top-1/2 lg:-translate-y-1/2 ">
      {filledImage && <img src={filledImage} alt="Filled Image" width={imageSize.width} height={imageSize.height}/>}
    </div>
  );
};

export default PartialImage;
