"use client";

import * as React from "react";
const siteList = [
  {
    name: "올리빈웨어",
    url: "https://www.olivinewear.com/",
    icon: "/assets/images/site_icon_placeholder.png",
  },
  {
    name: "미뇽발레",
    url: "https://smartstore.naver.com/mignonballet",
    icon: "https://shop-phinf.pstatic.net/20180611_179/mignonballet_15286949395514Rjmc_PNG/52002119193357863_173975300.png?type=o1000",
  },
  {
    name: "비비브로젝트",
    url: "https://smartstore.naver.com/bbp_roject",
    icon: "https://shop-phinf.pstatic.net/20230803_85/1691036979892hHrgE_JPEG/92172878591350545_262163589.jpg?type=o1000",
  },
  {
    name: "Dar.D",
    url: "https://dar-d.com/",
    icon: "https://dar-d.com/web/upload/category/editor/2020/01/01/f858fe26adf11ecc3419fbaf14ab1846.png",
  },
  {
    name: "이발레샵",
    url: "https://www.eballetshop.com",
    icon: "https://github.com/eunbin20/everyone-ballet/assets/43979066/348b3a4a-b134-49ff-8ec8-210a750e68ef",
  },
  {
    name: "La Suit",
    url: "https://smartstore.naver.com/lasuit",
    icon: "https://shop-phinf.pstatic.net/20210824_242/1629786131397Kzwbt_PNG/30922019991069803_553539283.png?type=o1000",
  },
  {
    name: "발레시모",
    url: "https://ballessimo.com/",
    icon: "https://contents.sixshop.com/uploadedFiles/10374/default/image_1558332824879.png",
  },
  {
    name: "레브당스",
    url: "https://levdance.com/",
    icon: "/assets/images/site_icon_placeholder.png",
  },
];

interface ISiteListContainerProps {}

const SiteListContainer: React.FunctionComponent<ISiteListContainerProps> = (
  props
) => {
  const handleSiteClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <section className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <ul className="flex gap-5 flex-wrap justify-between p-4 ">
        {siteList.map((site, index) => (
          <li key={index} onClick={() => handleSiteClick(site.url)}>
            <img
              src={site.icon || ""}
              alt={site.name}
              className="w-16 h-16 rounded-xl mb-2 bg-[#F5F6F8] object-contain"
            />
            <p className="text-center text-xs text-gray-800">{site.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SiteListContainer;
