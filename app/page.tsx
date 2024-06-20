"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import colors from "../public/colors.json";
import leotards from "../public/leotards.json";
import Image from "next/image";
import { useState } from "react";
import PreviewImage from "@/components/PreviewImage";

export default function Index() {
  const [leotard, setLeotard] = useState("");
  const [trimColor, setTrimColor] = useState("");
  const [leotardColor, setLeotardColor] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [currentColorList, setCurrentColorList] = useState<
    { title: string; swatch: string }[]
  >([]);

  const handleLeotardTypeChange = (event: SelectChangeEvent) => {
    setLeotard(event.target.value as string);
  };

  const handleFabricTypeColorChange = (event: SelectChangeEvent) => {
    const currentValue = event.target.value;
    setFabricType(currentValue as string);
    setCurrentColorList(
      colors.filter((item) => item.fabricType === currentValue)[0].colors
    );
  };

  const handleTrimColorChange = (event: SelectChangeEvent) => {
    setTrimColor(event.target.value as string);
  };
  const handleLeotardColorChange = (event: SelectChangeEvent) => {
    setLeotardColor(event.target.value as string);
  };

  return (
    <div className="p-4 flex flex-col w-full md:w-[800px]">
      <form className="flex gap-2 flex-col mb-2 md:flex-row ">
        <FormControl fullWidth>
          <InputLabel id="leotard-select-label">레오타드 타입</InputLabel>
          <Select
            labelId="leotard-select-label"
            id="leotard-select-label"
            value={leotard}
            label="Style"
            onChange={handleLeotardTypeChange}
          >
            {leotards.map((leotard) => (
              <MenuItem value={leotard} key={leotard}>
                <div>{leotard}</div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="fabric-select-label">재질</InputLabel>
          <Select
            labelId="fabric-select-label"
            id="fabric-select-label"
            value={fabricType}
            label="Style"
            onChange={handleFabricTypeColorChange}
          >
            {colors.map((item) => (
              <MenuItem value={item.fabricType} key={item.fabricType}>
                <div>{item.fabricType}</div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="leotard-color-select-label">몸판 색상</InputLabel>
          <Select
            labelId="leotard-color-select-label"
            id="leotard-color-select-label"
            value={leotardColor}
            label="Style"
            onChange={handleLeotardColorChange}
          >
            {currentColorList.map((color) => (
              <MenuItem value={color.title} key={color.title + "leotard"}>
                <div>
                  <Image src={color.swatch} alt="" width={20} height={20} />
                  {color.title}
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="trim-color-select-label">트림 색상</InputLabel>
          <Select
            labelId="trim-color-select-label"
            id="trim-color-select-label"
            value={trimColor}
            label="Style"
            onChange={handleTrimColorChange}
          >
            {currentColorList.map((color) => (
              <MenuItem value={color.title} key={color.title + "trim"}>
                <div>
                  <Image src={color.swatch} alt="" width={20} height={20} />
                  {color.title}
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      <PreviewImage
        leotardType=""
        leotardSwatchUrl="Mesh_Tone6.jpeg"
        trimSwatchUrl="Mesh-Blush.jpeg"
      />
    </div>
  );
}
