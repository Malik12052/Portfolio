import { useEffect } from "react";
import { useMotionValue, useMotionTemplate, animate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const useGradientEffect = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const textGradient = useMotionTemplate`linear-gradient(45deg, ${color}, #fff)`;

  return { backgroundImage, border, boxShadow, textGradient };
};
