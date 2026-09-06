"use client";

import { motion } from "framer-motion";

/*
  ヒーロー背景。
  実際の会場写真が用意でき次第、下の <div className="absolute inset-0 ..."> を
  <Image src="/images/kisarazu/hero.jpg" fill ... /> に差し替えてください。
  それまでは夕景をイメージしたグラデーション + 一度だけの光の演出にしています。
*/
export function HeroStage() {
  return (
    <div className="absolute inset-0">
      {/* 夕景グラデーション */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1B1A2E 0%, #2E2418 42%, #14110E 78%)",
        }}
      />

      {/* 一度だけ広がる琥珀色の光 */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(60% 45% at 50% 92%, rgba(201,138,62,0.35) 0%, rgba(201,138,62,0) 70%)",
        }}
      />

      {/* 地平線のシルエット(モール棟のシルエットを簡易的に表現) */}
      <svg
        className="absolute bottom-0 left-0 w-full text-[#0F0D0A]"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 120 L80 120 L80 70 L200 70 L200 100 L340 100 L340 40 L420 40 L420 90 L560 90 L560 60 L640 60 L640 110 L780 110 L780 50 L900 50 L900 95 L1040 95 L1040 65 L1120 65 L1120 105 L1200 105 L1200 160 L0 160 Z"
        />
      </svg>

      {/* 下部のフェード(テキスト可読性用) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-[#14110E]/30 to-transparent" />
    </div>
  );
}
