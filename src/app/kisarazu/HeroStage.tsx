"use client";

import { motion } from "framer-motion";

/*
  ヒーロー背景。
  公式フライヤー(public/images/kisarazu/flyer.jpg)を敷き、
  上に淡いホワイトのグラデーションを重ねてテキストの視認性を確保する。
*/
export function HeroStage() {
  return (
    <div className="absolute inset-0">
      {/* 公式フライヤー画像 */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: "url(/images/kisarazu/flyer.jpg)" }}
      />

      {/* 一度だけ現れる、淡いホワイトのベール */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[#FAF8F3]/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      {/* 下部のフェード(テキスト可読性用) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/50 to-transparent" />
    </div>
  );
}
