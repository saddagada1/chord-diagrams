import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { rand } from "../../utils/rand";

interface OrbProps {
  colour: string;
}

const Orb: React.FC<OrbProps> = ({ colour }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    let animate: NodeJS.Timer;
    if (containerRef.current && !width) {
      const containerWidth = containerRef.current.parentElement!.offsetWidth;
      setWidth(containerWidth);
    } else {
      animate = setInterval(() => {
        setXPosition(rand(-width! * 0.2, width! * 0.2));
        setYPosition(rand(-width! * 0.2, width! * 0.2));
      }, 2500);
    }
    return () => {
      clearInterval(animate);
    };
  }, [width]);
  return (
    <motion.div
      ref={containerRef}
      animate={{ x: xPosition, y: yPosition }}
      transition={{ duration: 2.5 }}
      className="rounded-full"
      style={{
        boxShadow: width
          ? `0 0 ${width * 0.4}px ${width * 0.2}px ${colour}, 0 0 ${width * 0.6}px ${
              width * 0.3
            }px transparent`
          : undefined,
      }}
    />
  );
};
export default Orb;
