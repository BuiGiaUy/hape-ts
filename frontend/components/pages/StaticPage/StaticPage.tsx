import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { allowedTags, strip_tags, trimString } from "../../../lib/product";
import s from "./Static.module.css";

const StaticPage: React.FC<{ page: any }> = ({ page }) => {
  return (
    <main className="mt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-3 md:grid md:grid-cols-10 md:gap-6">
          <div className="md:col-span-2">
            <div className="">
              <h3 className={s.title}>Chăm sóc khách hàng</h3>
              <ul className="flex flex-initial flex-col md:flex-1">
                <li className={s.menu}>
                  <Link href="/page/thanh-toan">Thanh Toán</Link>
                </li>
                <li className={s.menu}>
                  <Link href="/page/phi-van-chuyen">Phí Vận Chuyển</Link>
                </li>
                <li className={s.menu}>
                  <Link href="/page/tra-hang-hoan-tien">Tả Hàng Hoàn Tiền</Link>
                </li>
                <li className={s.menu}>
                  <Link href="/page/chinh-sach-bao-hanh">Chính sách Bảo Mật</Link>
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <h3 className={s.title}>Về Hape</h3>
              <ul className="flex flex-initial flex-col md:flex-1">
                <li className={s.menu}>
                  <Link href="page/about-us">Giới Thiệu Hape</Link>
                </li>
                <li className={s.menu}>
                  <Link href="page/chinh-sach-bao-mat">Chính Sách Bảo Mật</Link>
                </li>
                <li className={s.menu}>
                  <Link href="page/dieu-khoan-su-dung">Điều Khoản Sử Dụng</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-8">
            {page?.slug && (
              <div className="bg-white shadow py-5 px-10">
                <NextSeo
                  title={trimString(page.title, 65)}
                  description={trimString(strip_tags(page.content, ""), 160)}
                />
                <h1 className="text-2xl font-bold mb-5">{page.title}</h1>
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: allowedTags(page.content, "<a>"),
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaticPage;
