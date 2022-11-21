import Head from "next/head";
import Link from "next/link";
import React from "react";

type Props = {
  title?: string;
  statusCode?: number;
};

const Error: React.FC<Props> = ({ title = "" , statusCode}) => {
  return (
    <>
      <Head>
        <title>{title}</title>{" "}
      </Head>
      <main className="mt-20 mb-60 sm:mt-60">
        <div className="mx-auto max-w-7xl text-center">
          <img
            src="/assets/empty-box.png"
            width="100px"
            className="my-10 mx-auto"
          />
          <h1 className="text-xl text-gray-700">
            Không tìm thấy đường dẫn này!
          </h1>
          <div>
            <Link
              href="/"
              className="button arrow bg-yellow-500 mt-10 font-semibold"
            >
              Về Trang chủ{" "}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error;
