import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const axios = require("axios");
const cheerio = require("cheerio");

import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const getHtml = async () => {
    try {
      return await axios.get(
        "https://bonanza-ballet.com/product/list.html?cate_no=42"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = await getHtml();
  const query = cheerio.load(data);
  // TODO: 타입 정의
  const productList: any = query(".prdpadding");

  let products: any = [];
  productList.each((_: any, node: any) => {
    const name = query(node).find(".name").text();
    const price = query(node).find(".price.normal").text();
    const detailPageUrl = `https://bonanza-ballet.com${query(node)
      .find("a")
      .attr("href")}`;
    const imageUrl = query(node)
      .find(".ga09img2")
      .attr("src")
      .replace("//", "");

    const priceToNumber = Number(price.replace(",", "").replace("원", ""));

    products.push({
      name,
      price: priceToNumber,
      originalPrice: priceToNumber,
      url: detailPageUrl,
      introImageFile: imageUrl,
      mainImageFile: imageUrl,
      currency: "KRW",
      registeredAt: new Date().toISOString(),
    });
  });

  try {
    const { data: product } = await supabase
      .from("product")
      .insert(products)
      .select();
    console.log("업로드된 데이터: ", product);
  } catch (error) {
    console.error(error);
  }
}
