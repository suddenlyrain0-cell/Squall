"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnimatedHero() {
  return (
    <section className="noise relative min-h-[calc(100vh-80px)] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-black text-primary"
        >
          <Sparkles className="h-4 w-4" />
          Official Community Hub
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-7"
        >
          <Image src="/SquallLogo.png" alt="SQUALL" width={130} height={130} className="mx-auto h-28 w-28 object-contain md:h-32 md:w-32" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="max-w-5xl text-6xl font-black leading-[0.9] text-white md:text-8xl lg:text-9xl"
        >
          SQUALL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl"
        >
          Play Together.
          <br />
          Grow Together.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-xl"
        >
          게임을 만들고, 플레이어와 함께 성장합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/community">
              Community
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/update">Latest Update</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
