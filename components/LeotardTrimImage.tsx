import { useEffect, useState } from "react";

interface IImageComponent {
  leotardType: string;
  trimSwatchUrl?: string;
}

function LeotardTrimImage({ leotardType, trimSwatchUrl }: IImageComponent) {
  const [filledImage, setFilledImage] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      // Load image A
      const imageA = new Image();
      imageA.src = "alex_01_1_trim.png";
      await new Promise((resolve) => {
        imageA.onload = resolve;
      });

      // Load pattern image B
      const patternImage = new Image();
      patternImage.src = trimSwatchUrl || "";
      await new Promise((resolve) => {
        patternImage.onload = resolve;
      });

      // Fill imageA with pattern
      const filledDataURL = fillPattern(imageA, patternImage);
      setFilledImage(filledDataURL);
    };

    loadImage();
  }, [trimSwatchUrl]);

  function fillPattern(
    imageA: HTMLImageElement,
    patternImage: HTMLImageElement
  ): string {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    // Set canvas size to match image A
    canvas.width = imageA.width;
    canvas.height = imageA.height;

    // Draw image A on canvas
    ctx.drawImage(imageA, 0, 0);

    // Get image data of image A
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Create pattern
    const pattern = ctx.createPattern(patternImage, "repeat");

    // Loop through each pixel and fill with pattern only if the pixel is opaque
    for (let i = 0; i < data.length; i += 4) {
      // Check if the pixel is opaque
      if (data[i + 3] === 255) {
        // Alpha value of 255 means fully opaque
        // Fill pixel with pattern
        const x = (i / 4) % canvas.width;
        const y = Math.floor(i / 4 / canvas.width);
        ctx.fillStyle = pattern!;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    return canvas.toDataURL(); // Return base64 data URL
  }

  return (
    <div className="absolute">
      {filledImage && <img src={filledImage} alt="Filled Image" />}
    </div>
  );
}

export default LeotardTrimImage;
