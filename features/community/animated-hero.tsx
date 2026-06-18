"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AnimatedHero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-white text-[#111111]">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/16 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-start px-5 pb-44 pt-16 text-center sm:pb-52 sm:pt-20 lg:px-8 lg:pb-60 lg:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="max-w-5xl text-6xl font-black leading-[0.9] text-[#111111] md:text-8xl lg:text-9xl"
        >
          WE ARE
          <br />
          <span className="text-[#F34818]">SQUALL</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-10 text-xl font-semibold leading-tight text-[#111111] md:text-3xl"
        >
          Fast to Start, Hard to Put Down
        </motion.p>
      </div>
      <Image
        src="/SQUALLHero.png"
        alt=""
        width={1920}
        height={529}
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[1150px] max-w-none -translate-x-1/2 select-none sm:w-[1500px] lg:w-full"
        priority
        aria-hidden
      />
    </section>
  );
}
