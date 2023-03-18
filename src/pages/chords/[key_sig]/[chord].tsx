import Chord from "../../../components/Chord/Chord";
import { promises as fs } from "fs";
import path from "path";
import type { GetStaticPaths, GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Chord as ChordType } from "svguitar";
import { keyColourReference } from "../../../utils/constants";
import Orb from "../../../components/Orb/Orb";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fs.readFile(path.resolve(process.cwd(), "./public/chords.json"), "utf-8");
  const data = JSON.parse(response);
  const paths = Object.keys(data).map((chord) => {
    let key_sig = "";
    Object.keys(keyColourReference).map((key) => {
      const keySigRegex = new RegExp(`^${key}`);
      const keySigSharpRegex = new RegExp(`^${key}#`);
      if (keySigRegex.test(chord) && !keySigSharpRegex.test(chord)) {
        key_sig = key;
      }
    });
    return { params: { key_sig: key_sig, chord: chord } };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  key_sig: string;
  chord: string;
  data: ChordType[];
}> = async ({ params }) => {
  const response = await fs.readFile(path.resolve(process.cwd(), "./public/chords.json"), "utf-8");
  const data = JSON.parse(response);
  return {
    props: {
      key_sig: params!.key_sig as string,
      chord: params!.chord as string,
      data: data[params!.chord as string],
    },
  };
};

const Chords: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  key_sig,
  chord,
  data,
}) => {
  return (
    <>
      <Head>
        <title>{`Common Voicings for ${chord}`}</title>
      </Head>
      <div className="w-screen h-screen flex flex-col pt-4 pb-8 px-8 bg-stone-400">
        <div className="w-3/4 h-full flex justify-center items-center fixed opacity-40">
          <Orb colour={keyColourReference[key_sig]} />
        </div>
        <h1
          className="font-header font-extrabold uppercase leading-none z-10 mb-5"
          style={{ fontSize: "7vw" }}
        >
          common voicings
        </h1>
        <div className="grid grid-cols-6 grid-auto-rows gap-4 flex-1 overflow-y-scroll border-2 z-10 border-black rounded-2xl p-4 no-scrollbar">
          {data.map((chord, index) => (
            <div
              className="flex justify-center items-center border-2 border-black rounded-2xl px-6 py-3 shadow-xl transition-all hover:scale-95"
              key={index}
            >
              <Chord chord={chord} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chords;
