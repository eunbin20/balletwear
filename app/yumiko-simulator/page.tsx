"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/client";
import PreviewImage from "@/components/PreviewImage";
import arrowCircleIcon from "../../public/assets/svgs/icon-arrow-circle.svg";
import LeotardSelection from "@/components/LeotardSelection";
import ColorSelection from "@/components/ColorSelection";

export default function Index() {
  const [colors, setColors] = useState<any>();
  const [leotards, setLeotards] = useState<any>();
  const [selectedLeotard, setSelectedLeotard] = useState<any>();
  const [selectedTrimColor, setSelectedTrimColor] = useState<any>();
  const [selectedBodyColor, setSelectedBodyColor] = useState<any>();

  useEffect(() => {
    (async () => {
      // TODO: 에러 처리
      // TODO: 타입 정의
      const { data: leotards } = await supabaseClient
        .from("leotards")
        .select("*");
      setLeotards(leotards);
      setSelectedLeotard(leotards?.[0]);

      const { data: colors } = await supabaseClient
        .from("colors")
        .select("*, type (name)");
      setColors(colors);
      setSelectedTrimColor(colors?.[0]);
      setSelectedBodyColor(colors?.[0]);
    })();
  }, []);

  useEffect(() => {
    const setScreenHeight = () =>  {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setScreenHeight();
    
    window.addEventListener('resize', setScreenHeight);
    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);


  return (
    <div className="flex flex-col w-full relative flex-1 justify-between lg:flex-row text-gray-800 h-real-screen">
      <div className="relative flex items-center justify-center w-full">
        <div className="absolute top-2 left-4 flex items-end gap-2">
          <div className="text-gray-800 font-bold text-3xl lg:text-5xl font-sans mr-2">
            {selectedLeotard?.name}
          </div>
          <div
            className={`border-2 gap-1 p-1 group/color w-fit h-8 bg-white border-r-2 shadow-md flex justify-center items-center hover:scale-110 rounded-lg`}
          >
            <Image
              src={selectedBodyColor?.image}
              alt=""
              layout="fixed"
              width="24"
              height="36"
              className="rounded-md"
            />
            <p className="text-xs">{selectedBodyColor?.name}</p>
          </div>
          <div
            className={`border-2 gap-1 p-1 group/color w-fit h-8 bg-white border-r-2 shadow-md flex justify-center items-center hover:scale-110 rounded-lg `}
          >
            <Image
              src={selectedTrimColor?.image}
              alt=""
              layout="fixed"
              width="24"
              height="24"
              className="rounded-md"
            />
            <p className="text-xs">{selectedTrimColor?.name}</p>
          </div>
        </div>
        <PreviewImage
          leotard={selectedLeotard}
          trimColor={selectedTrimColor}
          bodyColor={selectedBodyColor}
        />
      </div>
      <div className="relative h-[200px] overflow-y-scroll w-full lg:w-min-[450px] bg-sand p-4 lg:p-8 rounded-t-2xl rounded-tl-2xl lg:rounded-none lg:h-[calc(100vh-48px)]">
        <div className="absolute items-center justify-center top-1/2 -translate-y-1/2 -left-6 w-14 h-14 rounded-full bg-white shadow-xl opacity-70  hidden lg:visible overflow-scroll">
          <Image
            src={arrowCircleIcon}
            alt="arrow icon"
            className="rotate-270 w-9 h-9"
          />
        </div>
        <LeotardSelection
          leotards={leotards}
          selectedLeotard={selectedLeotard}
          onChange={(leotard) => setSelectedLeotard(leotard)}
        />
        <ColorSelection
          title="몸판 색상"
          onChange={(color) => setSelectedBodyColor(color)}
          colors={colors}
          selectedBodyColor={selectedBodyColor}
        />
        <ColorSelection
          title="트림 색상"
          onChange={(color) => setSelectedTrimColor(color)}
          colors={colors}
          selectedBodyColor={selectedTrimColor}
        />
      </div>
    </div>
  );
}
