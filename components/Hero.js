import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import 'animate.css';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import * as THREE from 'three';

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <motion.div
        className="flex flex-col items-center justify-center z-10" // Ensure this is in front
        style={{
          position: "absolute",
          top: "5%",
          left: "39%",
          transform: "translate(-50%, -50%)",
        }}
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

      <motion.h1
        className="text-center text-2xl leading-tight sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight matemasie-regular mt-48 z-10" // Ensure this is in front
        style={{
          backgroundImage: textGradient,
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          scale: [1.5, 0.55, 1], // Subtle scaling effect
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

      <motion.p
        className="my-6 max-w-xxl text-center text-2xl leading-relaxed md:text-4xl md:leading-relaxed matemasie-regular z-10" // Ensure this is in front
        style={{
          backgroundImage: textGradient, // Use the animated gradient
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0px 4px 24px rgba(0, 0, 0, 0.5)', // Subtle text shadow
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        whileHover={{
          scale: 1.05, // Slight scaling on hover
          textShadow: '0px 4px 24px rgba(255, 255, 255, 0.8)', // Glow effect on hover
        }}
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
        className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 matemasie-regular mt-1 z-10" // Ensure this is in front
      >
        Explore My Portfolio
        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
      </motion.button>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={350} count={1000} factor={100} fade speed={3} />
          <BouncingSphere />
        </Canvas>
      </div>
    </motion.section>
  );
};

const BouncingSphere = () => {
  const sphereRef = useRef();
  const [position, setPosition] = useState([0, 0, -30]); // Start in the center
  const [velocity, setVelocity] = useState([.71, .1, 0]); // Increase speed

  useFrame(() => {
    const [x, y, z] = position;
    const [vx, vy, vz] = velocity;

    // Update position
    const newX = x + vx;
    const newY = y + vy;

    // Define boundaries
    const leftBoundary = -32;
    const rightBoundary = 34;
    const topBoundary = 20;
    const bottomBoundary = -18;

    // Check for collision with the walls
    const newVx = newX <= leftBoundary || newX >= rightBoundary ? -vx : vx; // Reverse direction on x-axis
    const newVy = newY <= bottomBoundary || newY >= topBoundary ? -vy : vy; // Reverse direction on y-axis

    setPosition([newX, newY, z]);
    setVelocity([newVx, newVy, vz]);

    if (sphereRef.current) {
      sphereRef.current.position.set(newX, newY, z);
    }
  });

  return (
    <points ref={sphereRef}>
      <sphereGeometry args={[5, 55, 52]} />
      <pointsMaterial color="#ffffff" size={0.05} />
    </points>
  );
};
