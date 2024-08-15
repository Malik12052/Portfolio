import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import 'animate.css';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { Bio } from "./Bio";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const RevealBento = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Updated backgroundImage for top to bottom gradient
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const textGradient = useMotionTemplate`linear-gradient(45deg, ${color}, #fff)`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <Bio />  

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={150} count={5000} factor={35} fade speed={1} /> 
        </Canvas> 
      </div>
    </motion.section>
  );
};
