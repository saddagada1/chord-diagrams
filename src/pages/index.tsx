import Orb from "../components/Orb/Orb";
import { keyColourReference } from "../utils/constants";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const test = {
    title: "C",
    fingers: [
      [1, 2],
      [2, "x"],
      [3, 4],
      [4, 1],
      [5, 2],
      [6, "x"],
    ],
    barres: [],
    position: 2,
  };
  const testWBarres = {
    title: "C",
    fingers: [
      [2, 3],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 3,
  };

  const xmltest = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 530.4666778564454"><text x="200" y="1.5333340167999268" font-family="Inter" font-size="48" text-anchor="middle" fill="#000000" class="title"><tspan dy="62.400000000000006" x="200">D/C</tspan></text><circle r="14.399999999999999" cx="176" cy="98.60000991821289" fill="none" stroke-width="2" stroke="#000000" class="open-string open-string-2"></circle><line x1="65.6" y1="84.20000991821288" x2="94.39999999999999" y2="113.00000991821288" stroke-width="2" stroke="#000000"></line><line x1="65.6" y1="113.00000991821288" x2="94.39999999999999" y2="84.20000991821288" stroke-width="2" stroke="#000000"></line><line x1="79" y1="127.60000991821289" x2="321" y2="127.60000991821289" stroke-width="10" stroke="#000000"></line><line x1="80" y1="204.6000099182129" x2="320" y2="204.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="276.6000099182129" x2="320" y2="276.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="348.6000099182129" x2="320" y2="348.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="420.6000099182129" x2="320" y2="420.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="492.6000099182129" x2="320" y2="492.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="132.6000099182129" x2="80" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="128" y1="132.6000099182129" x2="128" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="176" y1="132.6000099182129" x2="176" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="224" y1="132.6000099182129" x2="224" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="272" y1="132.6000099182129" x2="272" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="320" y1="132.6000099182129" x2="320" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><circle r="15.600000000000001" cx="320" cy="240.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-5 finger-fret-1 finger-string-5-fret-1 finger-circle"></circle><circle r="15.600000000000001" cx="272" cy="312.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-4 finger-fret-2 finger-string-4-fret-2 finger-circle"></circle><circle r="15.600000000000001" cx="224" cy="240.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-3 finger-fret-1 finger-string-3-fret-1 finger-circle"></circle><circle r="15.600000000000001" cx="128" cy="312.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-1 finger-fret-2 finger-string-1-fret-2 finger-circle"></circle><text x="80" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-0">E</text><text x="128" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-1">A</text><text x="176" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-2">D</text><text x="224" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-3">G</text><text x="272" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-4">B</text><text x="320" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-5">E</text><circle r="0" cx="0" cy="0" fill="none" stroke-width="0" stroke="transparent" class="top-left"></circle><circle r="0" cx="400" cy="0" fill="none" stroke-width="0" stroke="transparent" class="top-right"></circle></svg>`;

  return (
    <>
      <Head>
        <title>Remaster Chords</title>
      </Head>
      <div className="w-screen h-screen flex flex-col pt-4 pb-8 px-8 bg-stone-400">
        <h1
          className="font-header font-extrabold uppercase leading-none mb-5"
          style={{ fontSize: "7vw" }}
        >
          remaster chords
        </h1>
        <div className="grid grid-cols-6 grid-rows-2 gap-4 flex-1">
          {Object.keys(keyColourReference).map((key, index) => (
            <div
              className="relative cursor-pointer overflow-hidden flex justify-center items-center border-2 border-black rounded-2xl px-6 py-3 shadow-xl transition-transform hover:scale-95"
              key={index}
              onClick={() => router.push(`/chords/${encodeURIComponent(key)}`)}
            >
              <h2 className="font-header z-10 absolute top-3 left-6" style={{ fontSize: "2vw" }}>
                {key}
              </h2>
              <Orb colour={keyColourReference[key]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
