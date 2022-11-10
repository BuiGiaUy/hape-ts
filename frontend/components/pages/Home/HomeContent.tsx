import Link from "next/link";
import React, { FC } from "react";
import ProductBox from "../../common/ProductBox/ProductBox";

const HomeContent: FC<{data: any[]}> = ({ data }) => {
  return (
    <main className="">
      {Array.isArray(data) && (
        <>
          {data.map((block: any, key) => {
            if (block.type === "MainBanners") {
              return <Banners data={block} key={key} />;
            }
            if (block.type === "productSlide") {
              return (
                <ProductBox
                  products={block.data.products}
                  title={block.title}
                  key={key}
                />
              );
            }
          })}
        </>
      )}
    </main>
  );
};
const Banners: FC<{data: any}> = ({ data: { data } }) => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <Link href={data.bannerBig.link}>
              
                <img className="" src={data.bannerBig.src} />
              
            </Link>
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="">
              <Link href={data.banner1.link}>
                
                  <img className="" src={data.banner1.src} />
                
              </Link>
            </div>
            <div className="">
              <Link href={data.banner2.link}>
                
                  <img className="" src={data.banner2.src} />
                
              </Link>
            </div>
            <div className="">
              <Link href={data.banner3.link}>
                
                  <img className="" src={data.banner3.src} />
                
              </Link>
            </div>
            <div className="">
              <Link href={data.banner4.link}>
                
                  <img className="" src={data.banner4.src} />
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
