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

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
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

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <motion.h1
        className="absolute top-0 left-0 right-0 text-center text-3xl font-medium leading-tight sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight matemasie-regular"
        style={{
          backgroundImage: textGradient,
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          scale: [1, 1.05, 1], // Subtle scaling effect
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        Gabriel Felix
      </motion.h1>

      <div className="relative z-10 flex flex-col items-center md:flex-row md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <motion.p
            className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed matemasie-regular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Entrepreneur, Musician, Artist, Software Engineer, Blockchain Developer.
            I create, innovate, and explore the possibilities at the intersection of art, technology, and business.
          </motion.p>
          <motion.button
            style={{ 
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 matemasie-regular"
          >
            Explore My Portfolio
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
        <motion.div
          className="mt-8 md:mt-0"
          animate={{
            y: [0, -10, 0], // Vertical floating effect
            scale: [1, 1.05, 1], // Subtle scaling effect
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <img
            src="/papi.png"
            alt="Gabe Felix"
            className="w-48 h-48 rounded-full object-cover shadow-lg md:w-64 md:h-64"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={150} count={5000} factor={35} fade speed={1} /> 
        </Canvas> 
      </div>

 
    
      
    </motion.section>
  );
};
