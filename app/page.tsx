import { supabaseClient } from "@/lib/client";
import Image from "next/image";

// export const dynamic = "force-dynamic";

export default async function Index() {
  let { data: product, error } = await supabaseClient
    .from("product")
    .select("*");
  console.log(
    "product",
    product?.map((item) => {
      return item.introImageFile;
    })
  );

  return (
    <div className="max-w-[37.5rem] flex flex-col items-center">
      <form action="/crawling/product-list" method="get">
        <ul className="max-w-[70em] overflow-hidden mx-auto my-0 p-[0.5em]"></ul>
        {product?.map((item) => {
          return (
            <li className="w-6/12 float-left p-[0.5em] lg:w-[33.33333333%]">
              <a className="overflow-hidden w-auto p-0">
                <div className="align-middle pr-[1em] block w-auto p-0">
                  <Image
                    className="block w-full h-auto"
                    src={`https://${item.introImageFile}`}
                    alt="Image Alt Text"
                    width={"400"}
                    height={"400"}
                  />
                </div>
                <div className="align-middle w-3/5 p-0 px-0 py-[0.5em] text-foreground text-xs">
                  <h4 className="m-0">{item.name}</h4>
                  <p className="m-0">{item.price}</p>
                </div>
              </a>
            </li>
          );
        })}
      </form>
    </div>
  );
}
