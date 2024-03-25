"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IData {
  leotards: string[];
  color: {
    [key: string]: { name: string; sampleImage: string }[];
  };
}

// prettier-ignore
const data:IData = {"leotards":["Alex","AlexMesh","Alicia","AliciaMesh","Anna","Becky","BeckyMesh","Camila","Charlotte","CharlotteMesh","Cora","CynthiaMesh","Daniela","Daria","Denise","Didi","Elise","Elli","ElliMesh","Erica","FionaMesh","Gina","GinaMesh","Heather"],"color":{"Mesh":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}],"Nylons":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}],"Microfibers":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}],"Original Crushed Velvets":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}],"New Grace Velvets":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}],"Techni":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}],"Georgettes":[{"name":"N-Mesh Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/mesh-black.jpg"},{"name":"N-Admiral","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/n-admiral.jpg"},{"name":"M-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/c-black.jpg"},{"name":"CV-Angelic","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/v-angelic.jpg"},{"name":"V-Black","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/r-black.jpg"},{"name":"T-Angora","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/t-angora.jpg"},{"name":"G-Antique","sampleImage":"https://mto.yumiko.com/media/assets/colorchart/g-antique.jpg"}]}}

export default function Index() {
  const [leotard, setLeotard] = useState("");
  const [trimColor, setTrimColor] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [fabricColor, setFabricColor] = useState("");

  const handleLeotardTypeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setLeotard(event.target.value as string);
  };

  const handleTrimColorChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setTrimColor(event.target.value as string);
  };

  return (
    <div className="w-[800px]">
      <form className="flex ">
        <FormControl fullWidth>
          <InputLabel id="leotard-select-label">레오타드 타입</InputLabel>
          <Select
            labelId="leotard-select-label"
            id="leotard-select-label"
            value={leotard}
            label="Style"
            onChange={handleLeotardTypeChange}
          >
            {data?.leotards.map((leotard) => (
              <MenuItem value={leotard} key={leotard}>
                <div>{leotard}</div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="leotard-select-label">트림 색상</InputLabel>
          <Select
            labelId="leotard-select-label"
            id="leotard-select-label"
            value={trimColor}
            label="Style"
            onChange={handleTrimColorChange}
          >
            {Object.keys(data.color).map((colorItem) => (
              <span>
                {colorItem}
                {data.color[colorItem].map((color) => {
                  return (
                    <MenuItem value={color.name} key={color.name}>
                      <div>
                        <Image
                          src={color.sampleImage}
                          alt=""
                          width={20}
                          height={20}
                        />
                        {color.name}
                      </div>
                    </MenuItem>
                  );
                })}
              </span>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl fullWidth>
          <InputLabel id="leotard-select-label">몸판 색상</InputLabel>
          <Select
            labelId="leotard-select-label"
            id="leotard-select-label"
            value={leotard}
            label="Style"
            onChange={handleChange}
          >
            {leotardList.map((leotard) => (
              <MenuItem value={leotard} key={leotard}>
                {leotard}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </form>
    </div>
  );
}
