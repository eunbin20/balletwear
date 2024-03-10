"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const leotardList = [
  "Alex",
  "AlexMesh",
  "Alicia",
  "AliciaMesh",
  "Anna",
  "Becky",
  "BeckyMesh",
  "Camila",
  "Charlotte",
  "CharlotteMesh",
  "Cora",
  "CynthiaMesh",
  "Daniela",
  "Daria",
  "Denise",
  "Didi",
  "Elise",
  "Elli",
  "ElliMesh",
  "Erica",
  "FionaMesh",
  "Gina",
  "GinaMesh",
  "Heather",
];

export default function Index() {
  const [leotard, setLeotard] = useState("");
  const [trimColor, setTrimColor] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [fabricColor, setFabricColor] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setLeotard(event.target.value as string);
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
            onChange={handleChange}
          >
            {leotardList.map((leotard) => (
              <MenuItem value={leotard} key={leotard}>
                {leotard}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="leotard-select-label">트림 색상</InputLabel>
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
        </FormControl>
        <FormControl fullWidth>
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
        </FormControl>
      </form>
    </div>
  );
}
