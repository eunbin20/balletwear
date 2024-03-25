import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const axios = require("axios");
const cheerio = require("cheerio");

export const dynamic = "force-dynamic";

// selenium
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// GET http://localhost:3000/crawling/leotards
// 유미코 커스텀 오더 페이지의 html 파일을 가져온다.
export async function GET(req: NextApiRequest, res: NextApiResponse<any>) {
  const leotards = await getLeotardList();
  const colors = await getColorList();

  return res.status(200).json({ leotards, color: colors });
}

const getColorList = async () => {
  // headless로 크롬 드라이버 실행
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().windowSize({ width: 1920, height: 1080 })
    )
    .setChromeService(
      new chrome.ServiceBuilder("/Users/eunbin.kim/Downloads/chromedriver")
    )
    .build();

  try {
    await driver.get("https://mto.yumiko.com/us_en/alex.html");

    // 컬러 옵션 모달을 여는 버튼을 클릭한다.
    const colorOptionButton = await driver.findElement(
      By.className("color-option-modal-trigger")
    );
    colorOptionButton.click();

    await driver.findElement(By.className("page-wrapper"));
    const fabricHeadings = await driver.findElements(
      By.className("fabric-heading")
    );
    const fabricContainers = await driver.findElements(
      By.className("fabric-container")
    );
    const result: {
      [key: string]: {
        name: string;
        sampleImage: string;
      }[];
    } = {};

    for (let i = 0; i < fabricHeadings.length; i++) {
      const fabricHeading = await fabricHeadings[i].getText();
      const fabrics = [];

      for (let i = 0; i < fabricContainers.length; i++) {
        const fabricName = await fabricContainers[i]
          .findElement(By.className("fabric-name"))
          .getText();
        const fabricImage = await fabricContainers[i]
          .findElement(By.tagName("img"))
          .getAttribute("src");

        fabrics.push({
          name: fabricName,
          sampleImage: fabricImage,
        });
      }

      result[fabricHeading] = fabrics;
    }

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    driver.quit();
  }
};

const getLeotardList = async () => {
  const { data } = await getHtml(
    "https://mto.yumiko.com/us_en/women/personalized.html"
  );
  const query = cheerio.load(data);
  const leotardListQuery = query(".product-item");
  const leotards: string[] = [];
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
    console.log(error);
  }
};
