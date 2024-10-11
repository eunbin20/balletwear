"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/client";
import PreviewImage from "@/components/PreviewImage";
import arrowIcon from "../public/assets/svgs/icon-arrow-circle.svg";

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

  const handleLeotardItemClick = (leotard: any) => {
    setSelectedLeotard(leotard);
  };

  const handleBodyColorItemClick = (color: any) => {
    setSelectedBodyColor(color);
  };

  const handleTrimColorItemClick = (color: any) => {
    setSelectedTrimColor(color);
  };

  return (
    <div className="flex flex-col w-full relative flex-1 justify-between lg:flex-row text-gray-800">
      <div className="relative flex items-center justify-center w-full h-[calc(100vh-364px)] lg:h-[calc(100vh-120px)] m-8">
        <div className="absolute top-0 left-0 flex items-end gap-2">
          <div className="text-gray-800 font-bold text-5xl font-sans mr-2">
            {selectedLeotard?.name}
          </div>
          <div
            className={`border-2 gap-1 p-1 group/color w-fit h-8 bg-white border-r-2 shadow-md flex justify-center items-center hover:scale-110 rounded-lg `}
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
      <div className="overflow-y-scroll relative w-full lg:w-min-[450px] lg:h-[calc(100vh-48px)] bg-sand p-8">
        <div className="absolute items-center justify-center top-1/2 -translate-y-1/2 -left-6 w-14 h-14 rounded-full bg-white shadow-xl opacity-70  hidden lg:visible overflow-scroll">
          <Image
            src={arrowIcon}
            alt="arrow icon"
            className="rotate-270 w-9 h-9"
          />
        </div>
        <div className="pb-4">
          <div className="flex items-end gap-2 mb-4">
            <h1 className="font-semibold text-xl text-gray-800">레오타드</h1>
          </div>
          <div className="overflow-x-scroll p-4 -m-4">
            <div className="flex w-fit items-center justify-center gap-4 m-auto pb-3">
              {leotards?.map((leotard: any) => {
                return (
                  <div
                    key={leotard.name}
                    className={`w-40 bg-white shadow-md flex flex-col justify-center items-center hover:scale-105 rounded-2xl ${
                      selectedLeotard?.id === leotard.id && " border-gray-500"
                    }`}
                    onClick={() => handleLeotardItemClick(leotard)}
                  >
                    <div className="relative w-28 h-44">
                      <Image
                        src={leotard.image}
                        alt={leotard.name}
                        fill
                        objectFit="cover"
                        className="p-2"
                      />
                    </div>
                    <div className="text-gray-800">{leotard.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-6">
          <div className="flex items-end gap-2 mb-3">
            <h1 className="font-semibold text-xl text-gray-800">몸판 색상</h1>
          </div>
          <div>
            <div className="flex w-fit items-center gap-2 pb-0 flex-wrap">
              {colors?.map((color: any, index: any) => {
                return (
                  <div
                    key={color.id}
                    className={`border-2 gap-1 p-1 group/color w-fit h-8 bg-white border-r-2 shadow-md flex justify-center items-center hover:scale-110 rounded-lg ${
                      selectedBodyColor?.id === color.id &&
                      "border-2 border-gray-500"
                    } `}
                    onClick={() => handleBodyColorItemClick(color)}
                  >
                    <Image
                      src={color.image}
                      alt=""
                      layout="fixed"
                      width="24"
                      height="24"
                      className="rounded-md"
                    />
                    <p className="text-xs">{color.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-4">
          <div className="flex items-end gap-2 mb-3">
            <h1 className="font-semibold text-xl text-gray-800">트림 색상</h1>
          </div>
          <div className="flex w-fit items-center gap-2 pb-0 flex-wrap">
            {colors?.map((color: any, index: any) => {
              return (
                <div
                  key={color.id}
                  className={`gap-1 p-1 group/color w-fit h-8 bg-white border-r-2 shadow-md flex justify-center items-center hover:scale-110 rounded-lg ${
                    selectedTrimColor?.id === color.id &&
                    "border-2 border-gray-500"
                  } `}
                  onClick={() => handleTrimColorItemClick(color)}
                >
                  <Image
                    src={color.image}
                    alt=""
                    layout="fixed"
                    width="24"
                    height="24"
                    className="rounded-md"
                  />
                  <p className="text-xs">{color.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
