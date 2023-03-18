import { useEffect, useState } from "react";
import { Chord as ChordType } from "svguitar";
import Chord from "../Chord/Chord";

interface ChordsProps {
  key: string;
}

const Chords: React.FC<ChordsProps> = ({ key }) => {
  const [data, setData] = useState<{ [chord: string]: ChordType[] } | null>(null);
  const [keys, setKeys] = useState<string[] | null>(null);

  const getData = () => {
    fetch("chords.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setData(json);
      });
  };

  useEffect(() => {
    if (!data) {
      getData();
    } else {
      setKeys(Object.keys(data).map((chord) => chord));
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      {data &&
        keys &&
        keys.map((key, key_index) => (
          <div key={key_index} className="my-10 h-1/6">
            <h1 className="text-2xl font-bold underline">{key}</h1>
            <div className="flex flex-row items-center h-full">
              {/* {data[key].map((chord, chord_index) => (
                <div
                  key={chord_index}
                  className="w-1/6 h-full border-2 border-black rounded-2xl p-2"
                >
                  <Chord chord={chord} />
                </div>
              ))} */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chords;
