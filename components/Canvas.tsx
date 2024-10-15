import { useEffect, useRef, useState } from "react";

interface ICanvas {
  bodyImageInfo?: {
    image: string;
    type: {
      name: string;
    };
  };
  trimImageInfo?: {
    image: string;
    type: {
      name: string;
    };
  };
  optionImageInfo?: {
    image: string;
    type: {
      name: string;
    };
  };
}

const Canvas = ({ bodyImageInfo, trimImageInfo, optionImageInfo }: ICanvas) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState({
    width: 300,
    height: 400,
  });

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "Anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setImageSize({
          width: 400,
          height: 600,
        });
      } else {
        setImageSize({
          width: window.innerHeight - 356,
          height: window.innerHeight - (356 * 3) / 4,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const draw = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      try {
        // bodyImage가 있으면 렌더링
        if (bodyImageInfo) {
          const bodyImage = await loadImage(bodyImageInfo.image);
          ctx.drawImage(bodyImage, 0, 0, canvas.width, canvas.height);
        }

        // trimImage가 있으면 렌더링
        if (trimImageInfo) {
          const trimImage = await loadImage(trimImageInfo.image);
          ctx.drawImage(trimImage, 0, 0, canvas.width, canvas.height);
        }

        // optionImage가 있으면 렌더링
        if (optionImageInfo) {
          const optionImage = await loadImage(optionImageInfo.image);
          ctx.drawImage(optionImage, 0, 0, canvas.width, canvas.height);
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    draw();
  }, []);

  return (
    <canvas ref={canvasRef} width={imageSize.width} height={imageSize.height} />
  );
};

export default Canvas;
