"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/client";
import PreviewImage from "@/components/PreviewImage";
import arrowIcon from "../public/asstes/svgs/icon-arrow-circle.svg";

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
      const { data: colors } = await supabaseClient.from("colors").select("*");
      setColors(colors);
      setSelectedTrimColor(colors?.[0]);
      setSelectedBodyColor(colors?.[0]);
    })();
  }, []);

  const handleLeotardItemClick = (leotard: any) => {
    setSelectedLeotard(leotard);
  };

  const handleTrimColorItemClick = (color: any) => {
    setSelectedTrimColor(color);
  };

  const handleBodyColorItemClick = (color: any) => {
    setSelectedBodyColor(color);
  };

  return (
    <div className="flex flex-col w-full relative flex-1 justify-between lg:flex-row">
      <div className="flex items-center justify-center w-full h-[calc(100vh-364px)] lg:h-[calc(100vh-120px)] m-8">
        <PreviewImage
          leotard={selectedLeotard}
          trimColor={selectedTrimColor}
          bodyColor={selectedBodyColor}
        />
      </div>
      <div className="relative w-full lg:w-[514px] lg:h-[calc(100vh-48px)] bg-sand p-8">
        <div className="absolute items-center justify-center top-1/2 -translate-y-1/2 -left-6 w-14 h-14 rounded-full bg-white shadow-xl opacity-70  hidden lg:visible overflow-scroll">
          <Image
            src={arrowIcon}
            alt="arrow icon"
            className="rotate-270 w-9 h-9"
          />
        </div>
        <div className="pb-4">
          <div className="flex items-end gap-2 mb-4">
            <h1 className="font-semibold text-xl">레오타드</h1>
          </div>
          <div className="overflow-x-scroll p-4 -m-4">
            <div className="flex w-fit items-center justify-center gap-4 m-auto pb-3">
              {leotards?.map((leotard: any) => {
                return (
                  <div
                    key={leotard.name}
                    className={`w-40 bg-white shadow-md flex flex-col justify-center items-center hover:scale-105 rounded-2xl ${
                      selectedLeotard?.id === leotard.id &&
                      "border-2 border-gray-500"
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
                    <div>{leotard.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-6">
          <div className="flex items-end gap-2 mb-3">
            <h1 className="font-semibold text-xl ">몸판 색상</h1>
          </div>
          <div className="overflow-x-scroll">
            <div className="flex w-fit items-center gap-2 pb-0 flex-wrap">
              {colors?.map((color: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={`group/color w-6 h-6 bg-white border-r-2 shadow-md flex flex-col justify-center items-center hover:scale-110 rounded-sm ${
                      selectedBodyColor?.id === color.id &&
                      "border-2 border-gray-800"
                    }`}
                    onClick={() => handleBodyColorItemClick(color)}
                  >
                    <Image
                      src={color.image}
                      alt=""
                      layout="fixed"
                      width="24"
                      height="24"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-4">
          <div className="flex items-end gap-2 mb-3">
            <h1 className="font-semibold text-xl">트림 색상</h1>
          </div>
          <div className="flex w-fit items-center gap-2 pb-0 flex-wrap">
            {colors?.map((color: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`group/color w-6 h-6 bg-white border-r-2 shadow-md flex flex-col justify-center items-center hover:scale-110 rounded-sm ${
                    selectedTrimColor?.id === color.id &&
                    "border-2 border-gray-800"
                  }`}
                  onClick={() => handleTrimColorItemClick(color)}
                >
                  <Image
                    src={color.image}
                    alt=""
                    layout="fixed"
                    width="24"
                    height="24"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
