import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from 'next/image';
import React, { useEffect, Suspense } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import Particles from "react-tsparticles";

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

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    color.set(`rgb(${Math.abs(x) * 255}, ${Math.abs(y) * 255}, 255)`);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200 flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={150} count={2000} factor={25} fade speed={1} />
          <Stars radius={200} count={3000} factor={35} fade speed={0.8} />
          <Stars radius={250} count={4000} factor={45} fade speed={0.5} />
          {/* Adding a 3D model */}
          <Suspense fallback={null}>
            {/* Add your 3D model here */}
          </Suspense>
        </Canvas>
        <Particles
          options={{
            particles: {
              number: { value: 50 },
              size: { value: 3 },
              move: { speed: 1, direction: "top" },
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "repulse" },
                },
              },
            },
          }}
        />
      </div>

      <div className="flex flex-col items-center text-center space-y-8 relative z-10">
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          className="relative z-10 bg-gray-950 rounded-full p-2"
        >
          <Image
            src="/papi.png"
            alt="Portrait of Gabriel Felix"
            width={256}
            height={256}
            className="rounded-full object-cover shadow-lg"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-medium leading-tight sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight matemasie-regular"
          style={{
            backgroundImage: textGradient,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Gabriel Felix
        </motion.h1>

        <motion.p
          className="max-w-xxl text-center text-2xl leading-10 sm:text-xl sm:leading-relaxed matemasie-regular"
          style={{
            backgroundImage: textGradient,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Entrepreneur, Musician, Artist, Software Engineer, Blockchain Developer.
          I create, innovate, and explore the possibilities at the intersection of art, technology, and business.
        </motion.p>

        <motion.button
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.015, boxShadow: "0px 0px 20px 5px rgba(255, 255, 255, 0.5)" }}
          animate={{
            scale: [1, 1.05, 1],
            transition: { duration: 2, yoyo: Infinity }
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 matemasie-regular"
        >
          Explore My Portfolio
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
    </motion.section>
  );
};
