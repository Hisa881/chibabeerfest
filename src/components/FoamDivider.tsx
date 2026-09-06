"use client";

import React from "react";

type FoamDividerProps = {
  /** デザイナー納品（または仮素材）の完成画像パス。色はすでに画像に焼き込み済み。 */
  src: string;
  alt?: string;
  className?: string;
};

/**
 * 通常セクションの継ぎ目に使う泡の境界線。
 * 色・水玉テクスチャはすべて画像側に含まれている前提で、
 * ここでは画像をそのまま帯として敷くだけ。
 *
 * next/image ではなく通常の <img> を使用（ローカルSVGはNext.jsの
 * 画像最適化がデフォルトでブロックするため。装飾用の軽量画像なので
 * 最適化の恩恵も薄く、<img> の方がシンプルで確実）。
 *
 * 使い方:
 *   <FoamDivider src={FOAM.whiteToGray} />
 */
export function FoamDivider({ src, alt = "", className = "" }: FoamDividerProps) {
  return (
    <div className={`relative w-full h-[60px] sm:h-[96px] leading-[0] ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-fill"
      />
    </div>
  );
}

/**
 * ヒーロー（暗い写真）から明るいセクションへ切り替わる箇所専用。
 * ヒーロー画像コンテナの直後に絶対配置で重ねる。
 */
export function FoamDividerOnImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 w-full h-[60px] sm:h-[96px] leading-[0] ${className}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-fill" />
    </div>
  );
}
