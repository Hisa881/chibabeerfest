"use client";

import { motion } from "framer-motion";

/*
  ヒーロー背景。
  実際の会場写真が用意でき次第、下の <div className="absolute inset-0 ..."> を
  <Image src="/images/kisarazu/hero.jpg" fill ... /> に差し替えてください。
  それまでは晴れた日の空をイメージした明るいグラデーション + 一度だけの光の演出にしています。
*/
export function HeroStage() {
  return (
    <div className="absolute inset-0">
      {/* 抜けるような空のグラデーション */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #EAF3E4 0%, #F5F3E8 45%, #FAF8F3 80%)",
        }}
      />

      {/* 一度だけ広がるやわらかな光 */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(60% 45% at 50% 15%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 40% at 15% 90%, rgba(124,154,87,0.18) 0%, rgba(124,154,87,0) 70%)",
        }}
      />

      {/* 地平線のシルエット(モール棟のシルエットを簡易的に表現) */}
      <svg
        className="absolute bottom-0 left-0 w-full text-[#DCD8C8]"
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/20 to-transparent" />
    </div>
  );
}
