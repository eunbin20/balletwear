"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import colors from "../public/colors.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import PreviewImage from "@/components/PreviewImage";
import { supabaseClient } from "@/lib/client";

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

  const [leotards, setLeotards] = useState<any>();

  useEffect(() => {
    (async () => {
      let { data: leotard, error } = await supabaseClient
        .from("leotard")
        .select("*");
      setLeotards(leotard);
    })();
  });

  return (
    <div className="p-4 flex flex-col w-full md:w-[1000px]">
      <form className="flex gap-2 flex-col mb-2 w-full overflow-x-hidden">
        <div className="overflow-x-scroll">
          <div className="flex w-fit items-center justify-center gap-4 overflow-x-scroll m-auto pb-0">
            {leotards?.map((leotard: any) => {
              return (
                <div className="w-32 h-56 bg-white border-r-2 mb-5 shadow-md flex flex-col justify-center items-center hover:scale-110">
                  <Image
                    src={leotard.image}
                    alt=""
                    layout="fixed"
                    width="400"
                    height="400"
                  />
                </div>
              );
            })}
          </div>
        </div>
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
        leotardType={leotard}
        leotardSwatchUrl={
          currentColorList.find((item) => item.title === leotardColor)?.swatch
        }
        trimSwatchUrl={
          currentColorList.find((item) => item.title === trimColor)?.swatch
        }
      />
    </div>
  );
}
