import React, { useEffect, useRef } from "react";
import { Orientation, SVGuitarChord, Chord as ChordType } from "svguitar";

interface ChordProps {
  chord: ChordType;
}

const Chord: React.FC<ChordProps> = ({ chord }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svguitarRef = useRef<SVGuitarChord | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (chord) {
        svguitarRef.current = new SVGuitarChord(canvasRef.current)
          .chord({
            fingers: chord.fingers,

            barres: chord.barres,

            position: chord.position,
          })
          .configure({
            fontFamily: "sans-serif",
            orientation: "horizontal" as Orientation,
            fixedDiagramPosition: true,
            tuning: ["E", "A", "D", "G", "B", "E"],
            color: "#000000",
          });
      }
    }

    if (svguitarRef.current && canvasRef.current) {
      canvasRef.current.innerHTML = "";
      svguitarRef.current.draw();
    }

    return () => {
      svguitarRef.current?.clear();
    };
  }, [chord, canvasRef, svguitarRef]);

  return (
    <div
      id="__chord__"
      className="w-full h-full flex justify-center items-center"
      ref={canvasRef}
    ></div>
  );
};
export default Chord;
