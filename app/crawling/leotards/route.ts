import { NextResponse } from "next/server";
const axios = require("axios");
const cheerio = require("cheerio");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
export const dynamic = "force-dynamic";

// GET http://localhost:3000/crawling/leotards
// 유미코 커스텀 오더 페이지의 html 파일을 가져온다.
export async function GET(request: Request) {
  const leotards = await getLeotardList();
  const colors = await getColorList();

  return NextResponse.json({ leotards, color: {} });
}

const getColorList = async () => {
  console.log("getColorList");
  const { data } = await getHtml("https://mto.yumiko.com/us_en/alex.html");
  const query = cheerio.load(data);
  const ColorListQuery = query(".fabric");
  let colors: string[] = [];
  ColorListQuery.each((_: any, node: any) => {
    console.log(node);
    const leotardName = query(node)
      .find(".product-item-link")
      .text()
      .replace(/\s+|\n/g, "");

    colors.push(leotardName);
  });

  return colors;
};

const getLeotardList = async () => {
  const { data } = await getHtml(
    "https://mto.yumiko.com/us_en/women/personalized.html"
  );
  const query = cheerio.load(data);
  const leotardListQuery = query(".product-item");
  let leotards: string[] = [];
  leotardListQuery.each((_: any, node: any) => {
    const leotardName = query(node)
      .find(".product-item-link")
      .text()
      .replace(/\s+|\n/g, "");

    leotards.push(leotardName);
  });

  return leotards;
};

const getHtml = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log("error", error);
  }
};
