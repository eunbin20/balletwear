// TODO: 함수 쪼개기
export const fillImageWithPattern = (
  imageA: HTMLImageElement,
  patternImage: HTMLImageElement,
  applyShading?: boolean
) => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  canvas.width = imageA.width;
  canvas.height = imageA.height;

  ctx.drawImage(imageA, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  const patternCanvas = document.createElement("canvas") as HTMLCanvasElement;
  const patternCtx = patternCanvas.getContext("2d");

  const scale = 0.05;
  patternCanvas.width = patternImage.width * scale;
  patternCanvas.height = patternImage.height * scale;

  patternCtx?.drawImage(
    patternImage,
    0,
    0,
    patternCanvas.width,
    patternCanvas.height
  );

  const patternData = patternCtx?.getImageData(
    0,
    0,
    patternCanvas.width,
    patternCanvas.height
  ).data;

  if (!patternData) return "";

  const scaledPattern = ctx.createPattern(patternCanvas, "repeat");

  const offsetX = -patternCanvas.width / 2;
  const offsetY = -patternCanvas.height / 2;
  ctx.translate(offsetX, offsetY);

  ctx.fillStyle = scaledPattern!;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3];

    const brightness = applyShading
      ? (r + g + b) / 3 + 20
      : (r + g + b) / 3 - 30;

    if (alpha > 0) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor(i / 4 / canvas.width);

      const patternX = Math.floor((x % patternCanvas.width) * scale);
      const patternY = Math.floor((y % patternCanvas.height) * scale);
      const patternIndex = (patternY * patternCanvas.width + patternX) * 4;

      const patternR = patternData[patternIndex];
      const patternG = patternData[patternIndex + 1];
      const patternB = patternData[patternIndex + 2];

      // Apply brightness to the pattern's pixel
      const shadedR = (patternR * brightness) / 255 + 50;
      const shadedG = (patternG * brightness) / 255 + 50;
      const shadedB = (patternB * brightness) / 255 + 50;

      data[i] = shadedR;
      data[i + 1] = shadedG;
      data[i + 2] = shadedB;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  ctx.translate(-offsetX, -offsetY);
  ctx.restore();

  return canvas.toDataURL();
};
