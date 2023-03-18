import { promises as fs } from "fs";
import path from "path";
import type { GetStaticPaths, GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { keyColourReference } from "../../../utils/constants";
import Link from "next/link";
import { useState } from "react";
import Orb from "../../../components/Orb/Orb";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(keyColourReference).map((key_sig) => ({
    params: { key_sig: key_sig },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  key_sig: string;
  data: string[];
}> = async ({ params }) => {
  const response = await fs.readFile(path.resolve(process.cwd(), "./public/chords.json"), "utf-8");
  const data = JSON.parse(response);
  const keySigRegex = new RegExp(`^${params!.key_sig as string}`);
  const keySigSharpRegex = new RegExp(`^${params!.key_sig as string}#`);
  const chords = Object.keys(data).filter(
    (chord) => keySigRegex.test(chord) && !keySigSharpRegex.test(chord)
  );
  return { props: { key_sig: params!.key_sig as string, data: chords } };
};

const Key: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ key_sig, data }) => {
  const [filter, setFilter] = useState("");
  return (
    <>
      <Head>
        <title>{`Key of ${key_sig}`}</title>
      </Head>
      <div className="w-screen h-screen flex flex-col items-center bg-stone-400 pb-8 px-8">
        <div className="w-3/4 h-full flex justify-center items-center fixed opacity-40">
          <Orb colour={keyColourReference[key_sig]} />
        </div>
        <div className="flex items-center relative my-8">
          <h1
            className="font-header translate-x-[-8px]  font-extrabold uppercase leading-none whitespace-nowrap"
            style={{ fontSize: "7vw" }}
          >
            {`key of ${key_sig}`}
          </h1>
          <div className="grow border-2 border-black rounded-2xl bg-stone-300 ml-6 p-4">
            <input
              className="appearance-none focus:outline-0 bg-transparent w-full h-full font-header placeholder:text-stone-500"
              style={{ fontSize: "4vw" }}
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.currentTarget.value)}
              placeholder="Search Key ..."
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-y-2 flex-1 content-start overflow-y-scroll border-2 border-black rounded-2xl p-4 no-scrollbar">
          {data
            .filter((type) => type.toLowerCase().includes(filter.toLowerCase()))
            .map((type, index) => (
              <Link
                className={`px-2 ${
                  index !== data.length - 1 ? "border-r-2" : ""
                } border-black h-fit`}
                key={index}
                href={`/chords/${encodeURIComponent(key_sig)}/${encodeURIComponent(type)}`}
              >
                <h1
                  style={{ fontSize: "1.5vw" }}
                  className={`relative font-header font-bold before:w-0 before:h-1/6 before:bg-black before:block before:absolute before:left-0 before:bottom-0 before:transition-all hover:before:w-full`}
                >
                  {type}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Key;
