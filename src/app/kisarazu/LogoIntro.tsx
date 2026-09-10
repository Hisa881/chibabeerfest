"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  オープニング演出。
  1) グラスにビールが注がれ、泡まで満ちる
  2) グラスがフェードアウトし、公式ロゴがブラーの中から浮かび上がる
  3) ロゴが少し静止した後、全体がフェードアウトしてページ本編が現れる
*/

const POUR_S = 1.3; // ビールが満ちるまでの時間(秒)
const FOAM_DELAY_S = 0.95; // 泡が現れ始めるタイミング(秒)
const POUR_HOLD_MS = 550; // 満ちた状態で静止する時間(ms)
const LOGO_REVEAL_S = 1.0; // ロゴが浮かび上がる時間(秒)
const LOGO_HOLD_MS = 1200; // ロゴが静止する時間(ms)
const FADE_OUT_S = 0.9; // 全体フェードアウトの長さ(秒)

type Stage = "pouring" | "logo" | "leaving" | "done";

export function LogoIntro() {
  const [stage, setStage] = useState<Stage>("pouring");

  useEffect(() => {
    const toLogo = setTimeout(
      () => setStage("logo"),
      POUR_S * 1000 + POUR_HOLD_MS
    );
    const toLeaving = setTimeout(
      () => setStage("leaving"),
      POUR_S * 1000 + POUR_HOLD_MS + LOGO_REVEAL_S * 1000 + LOGO_HOLD_MS
    );
    const toDone = setTimeout(
      () => setStage("done"),
      POUR_S * 1000 +
        POUR_HOLD_MS +
        LOGO_REVEAL_S * 1000 +
        LOGO_HOLD_MS +
        FADE_OUT_S * 1000
    );
    return () => {
      clearTimeout(toLogo);
      clearTimeout(toLeaving);
      clearTimeout(toDone);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F3]"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "leaving" ? 0 : 1 }}
      transition={{ duration: FADE_OUT_S, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        {stage === "pouring" && (
          <motion.div
            key="glass"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* グラス本体 */}
            <div
              className="relative h-40 w-24 overflow-hidden border-[3px] border-[#2B2A22] sm:h-48 sm:w-28"
              style={{
                clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end">
                <motion.div
                  className="flex w-full flex-col justify-start overflow-hidden"
                  initial={{ height: "0%" }}
                  animate={{ height: "78%" }}
                  transition={{ duration: POUR_S, ease: "easeOut" }}
                >
                  {/* 泡 */}
                  <motion.div
                    className="h-4 w-full flex-shrink-0 rounded-t-full bg-[#FFFDF6] sm:h-5"
                    initial={{ opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{
                      delay: FOAM_DELAY_S,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    style={{ transformOrigin: "bottom" }}
                  />
                  {/* ビール本体 */}
                  <div className="w-full flex-1 bg-gradient-to-b from-[#E8A33D] to-[#C97C2E]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "logo" && (
          <motion.img
            key="logo"
            src="/images/kisarazu/logo-crop.png"
            alt="CHIBA BEER FEST - ALL YOU NEED IS BEER! -"
            className="w-[78%] max-w-md sm:max-w-xl"
            initial={{ opacity: 0, filter: "blur(16px)", scale: 1.06 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: LOGO_REVEAL_S, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
