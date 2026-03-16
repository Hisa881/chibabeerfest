"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, HoverCard } from "../components/Reveal";
import { sendGAEvent } from "@next/third-parties/google";

/* ========================================
   イベント基本情報
======================================== */
const EVENT = {
  title: "チバビアフェスト",
  catch: "ALL YOU NEED IS BEER!",
  datesLabel: "2026年4月25日（土）・26日（日）",
  timeLabel: `4月25日（土）／11:00 – 21:00（L.O. 20:30）
4月26日（日）／11:00 – 20:00（L.O. 19:30）`,
  venue: "さんばしひろば（千葉県千葉市中央区中央港）",
  accessShort: "JR京葉線・千葉都市モノレール「千葉みなと駅」徒歩3分",
  price: "入場無料（ビール・フードは各ブースで購入）",
  weatherNote:
    "天候等により内容が変更・中止となる場合があります（最新情報はSNSで告知）",
  organizer: "チバビアフェスト実行委員会",
  instagram: "https://www.instagram.com/chibabeerfest/",
  instagramHandle: "@chibabeerfest",
  mapUrl: "https://www.google.com/maps?q=さんばしひろば&hl=ja&z=16",
  mapEmbed:
    "https://www.google.com/maps?q=%E3%81%95%E3%82%93%E3%81%B0%E3%81%97%E3%81%B2%E3%82%8D%E3%81%B0&output=embed",
};

/* ========================================
   スマホ用ヒーローカルーセル画像
   ※ public/images に配置
   - hero_sp1.jpg
   - hero_sp2.jpg
   - hero_sp3.jpg
======================================== */
const HERO_IMAGES = [
  { src: "/images/hero_sp1.jpg", alt: "HERO1" },
  { src: "/images/hero_sp2.jpg", alt: "HERO2" },
  { src: "/images/hero_sp3.jpg", alt: "HERO3" },
];

/* ========================================
   セクションカラー設定
======================================== */
const SECTION_COLORS = {
  breweries: {
    cardBg: "bg-[#fff4db]",
    cardBorder: "border-[#f1d8a8]",
    sectionBg: "bg-[#fff4db]",
  },
  food: {
    cardBg: "bg-[#ffe8e8]",
    cardBorder: "border-[#efc4c4]",
    sectionBg: "bg-[#ffe8e8]",
  },
  contents: {
    cardBg: "bg-[#e8f4ff]",
    cardBorder: "border-[#bfdcf5]",
    sectionBg: "bg-[#e8f4ff]",
  },
};

/* ========================================
   データ型
======================================== */
type Brewery = {
  name: string;
  area: string;
  days?: "両日" | "4/25(土)のみ" | "4/26(日)のみ";
};

type Food = {
  name: string;
  menu: string;
  kind?: "キッチンカー" | "テント";
  days?: "両日" | "4/25(土)のみ" | "4/26(日)のみ";
};

/* ========================================
   ブルワリーデータ
======================================== */
const BREWERIES: Brewery[] = [
  { name: "潮風ブルーラボ", area: "千葉県千葉市", days: "両日" },
  { name: "秩父麦酒", area: "埼玉県秩父市", days: "両日" },
  { name: 'G-BRAND "Bespoke" BEERERS', area: "東京都", days: "両日" },
  { name: "RIO BREWING & CO.", area: "千葉県柏市", days: "両日" },
  { name: "Nori's BEER", area: "山梨県西八代郡市", days: "両日" },
  { name: "FARMENTRY", area: "奈良県橿原市", days: "両日" },
  { name: "おたこビール", area: "千葉県千葉市", days: "両日" },
  { name: "Twin Peaks Mountain Brewing", area: "", days: "両日" },
  { name: "U.B.P Brewery", area: "埼玉県さいたま市", days: "両日" },
  { name: "八ヶ岳ビール タッチダウン", area: "山梨県北杜市", days: "両日" },
  { name: "Bighand Bros. Beer", area: "京都府京都市", days: "両日" },
  { name: "SONGBIRD", area: "千葉県木更津市", days: "両日" },
  { name: "FULLER'S", area: "UK", days: "両日" },
  { name: "千葉稲毛ビール いなびや", area: "千葉県千葉市稲毛区", days: "両日" },
  { name: "T.Y. HARBOR Brewery", area: "", days: "両日" },
  { name: "ハーヴェスト・ムーン ブルワリー", area: "千葉県浦安市", days: "両日" },
  { name: "寒菊", area: "千葉県山武市", days: "両日" },
  { name: "うしとら", area: "栃木県下野市", days: "両日" },
  { name: "AQ", area: "東京都", days: "両日" },
  { name: "海岸醸造", area: "千葉県南房総市", days: "両日" },
];

/* ========================================
   フードデータ
======================================== */
const FOODS: Food[] = [
  { kind: "キッチンカー", name: "おだやかのむこう", menu: "焼き芋", days: "両日" },
  { kind: "キッチンカー", name: "おだやかのむこう2号", menu: "フリッツポテト", days: "両日" },
  { kind: "キッチンカー", name: "SHUNGOROU SAUSAGE", menu: "ホットドッグ", days: "両日" },
  { kind: "キッチンカー", name: "蛸八", menu: "たこ焼き", days: "4/25(土)のみ" },
  { kind: "キッチンカー", name: "ISLAND KITCHEN", menu: "ジャークチキン", days: "両日" },
  { kind: "キッチンカー", name: "Hawaian Kitchen aoakua", menu: "ロコモコ丼", days: "両日" },
  { kind: "キッチンカー", name: "MoiMoi", menu: "ピタパンサンド", days: "両日" },
  { kind: "キッチンカー", name: "カレー屋リリー", menu: "本格タイ風カレー", days: "両日" },
  { kind: "キッチンカー", name: "もくしち", menu: "餃子", days: "4/26(日)のみ" },
  { kind: "キッチンカー", name: "CLUSTER", menu: "唐揚げ", days: "両日" },
  { kind: "テント", name: "もぢょい有限会社", menu: "焼き鳥", days: "4/26(日)のみ" },
  { kind: "テント", name: "entacos", menu: "タコス", days: "両日" },
];

/* ========================================
   FAQデータ
======================================== */
const FAQ = [
  { q: "入場料はかかりますか？", a: EVENT.price },
  { q: "雨でも開催しますか？", a: EVENT.weatherNote },
  { q: "会場への行き方は？", a: `${EVENT.accessShort}。${EVENT.venue}` },
  {
    q: "家族連れでも楽しめますか？",
    a: "ボディペイントなど、子どもから大人まで楽しめる体験型ブースを用意しています。",
  },
];

/* ========================================
   共通カードUI
======================================== */
function SoftCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HoverCard
      className={
        "rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition " +
        (className ?? "")
      }
    >
      {children}
    </HoverCard>
  );
}

/* ========================================
   スマホ用ヒーローカルーセル
======================================== */
function HeroCarousel({
  images,
  intervalMs = 3500,
}: {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const count = images.length;

  const next = React.useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  React.useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => next(), intervalMs);
    return () => window.clearInterval(id);
  }, [paused, count, intervalMs, next]);

  const current = images[index];

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            const x = info.offset.x;
            const v = info.velocity.x;
            if (x < -60 || v < -500) next();
            if (x > 60 || v > 500) {
              setIndex((i) => (i - 1 + count) % count);
            }
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`スライド ${i + 1}`}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 w-2.5 rounded-full border",
                i === index
                  ? "bg-neutral-900 border-neutral-900"
                  : "bg-white/80 border-gray-300 hover:bg-white",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
/* ========================================
   セクション見出し
======================================== */
function SectionHeader({
  kicker,
  title,
  desc,
  center,
}: {
  kicker: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <div className="text-xs tracking-[0.18em] text-gray-500">{kicker}</div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      </Reveal>

      {desc ? (
        <Reveal delay={0.12}>
          <p
            className={
              "mt-5 text-sm sm:text-base leading-relaxed text-gray-600 " +
              (center ? "mx-auto max-w-2xl" : "")
            }
          >
            {desc}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ========================================
   上部固定アンカーナビ
======================================== */
function AnchorRow() {
  const items = [
    { label: "概要", href: "#about" },
    { label: "開催情報", href: "#info" },
    { label: "みどころ", href: "#highlights" },
    { label: "ブルワリー", href: "#breweries" },
    { label: "フード", href: "#food" },
    { label: "コンテンツ", href: "#contents" },
    { label: "アクセス", href: "#access" },
    { label: "注意事項", href: "#notes" },
    { label: "よくある質問", href: "#faq" },
    { label: "参加・問い合わせ", href: "#contact" },
  ];

  return (
    <div className="sticky top-0 z-20 border-b border-gray-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              {i.label}
            </a>
          ))}

          <div className="ml-auto hidden sm:flex items-center gap-2">
            <a
              href={EVENT.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendGAEvent("event", "click_instagram_header")}
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
            >
              最新情報（Instagram）
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   メインページ
======================================== */
export default function Page() {
  return (
    <main className="relative bg-white text-neutral-900">
      <div className="relative">
        {/* ================================
            上部固定ナビ
        ================================= */}
        <AnchorRow />

        {/* ================================
            ヘッダー / ヒーロー
            - スマホ：カルーセル
            - PC：固定画像
        ================================= */}
        <header className="relative">
          <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[72vh] sm:min-h-[520px]">
            {/* スマホ：カルーセル */}
            <div className="absolute inset-0 sm:hidden">
              <HeroCarousel images={HERO_IMAGES} intervalMs={3500} />
            </div>

            {/* PC：固定画像 */}
            <div className="absolute inset-0 hidden sm:block">
              <Image
                src="/images/hero_pc.jpg"
                alt="CHIBA BEERFEST"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* オーバーレイ */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>

          {/* ヒーローテキスト */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full pb-10 sm:pb-14">
              <div className="mx-auto max-w-6xl px-6">
<div className="max-w-xl text-white">
  <div className="w-full max-w-[260px] sm:max-w-[420px]">
    <Image
      src="/images/hero_title.png"
      alt="CHIBA BEERFEST ALL YOU NEED IS BEER! 2026年4月25日（土）・26日（日）"
      width={1200}
      height={520}
      priority
      className="h-auto w-full"
    />
  </div>

  <div className="mt-6 flex flex-col sm:flex-row gap-3">
    <a
      href="#breweries"
      onClick={() => sendGAEvent("event", "click_breweries_hero")}
      className="inline-flex items-center justify-center rounded-2xl bg-white/95 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-white"
    >
      ブルワリーを見る
    </a>

    <a
      href="#access"
      onClick={() => sendGAEvent("event", "click_access_hero")}
      className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
    >
      アクセス
    </a>
  </div>
</div>
              </div>
            </div>
          </div>

          {/* スクロール誘導 */}
          <a
            href="#about"
            onClick={() => sendGAEvent("event", "click_scroll_hero")}
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/90 hover:text-white sm:bottom-6"
            aria-label="概要までスクロール"
          >
            <span className="text-[10px] font-semibold tracking-[0.28em]">SCROLL</span>
            <span className="mt-1 text-xl leading-none animate-bounce">⌄</span>
          </a>
        </header>

        {/* ================================
            ABOUT
        ================================= */}
        <section id="about" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="ABOUT"
              title="概要"
              desc="千葉市で最大級の屋外クラフトビールフェス。ビール好きはもちろん、クラフトビールが初めての方やご家族連れでも楽しめるイベントです。"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal>
                <a
                  href="#breweries"
                  onClick={() => sendGAEvent("event", "click_breweries_about")}
                  className={`group flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-lg
                  ${SECTION_COLORS.breweries.cardBg} ${SECTION_COLORS.breweries.cardBorder}`}
                >
                  <div className="text-2xl">🍺</div>
                  <h3 className="mt-4 text-xl font-semibold">クラフトビール</h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    千葉県内外からブルワリーが集結。
                    つくり手と飲み手がつながる“特別な一杯”を。
                  </p>
                  <span className="mt-auto pt-6 text-sm font-semibold">
                    ブルワリーを見る →
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.06}>
                <a
                  href="#food"
                  onClick={() => sendGAEvent("event", "click_food_about")}
                  className={`group flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-lg
                  ${SECTION_COLORS.food.cardBg} ${SECTION_COLORS.food.cardBorder}`}
                >
                  <div className="text-2xl">🍴</div>
                  <h3 className="mt-4 text-xl font-semibold">フード</h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    ビールに合うこだわりフードが充実。
                    キッチンカー＆テントで食べ歩きも楽しい。
                  </p>
                  <span className="mt-auto pt-6 text-sm font-semibold">
                    フードを見る →
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.12}>
                <a
                  href="#contents"
                  onClick={() => sendGAEvent("event", "click_contents_about")}
                  className={`group flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-lg
                  ${SECTION_COLORS.contents.cardBg} ${SECTION_COLORS.contents.cardBorder}`}
                >
                  <div className="text-2xl">🎨</div>
                  <h3 className="mt-4 text-xl font-semibold">体験コンテンツ</h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    ボディペイントなど、
                    家族で楽しめる体験型ブースも用意しています。
                  </p>
                  <span className="mt-auto pt-6 text-sm font-semibold">
                    コンテンツを見る →
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================
            INFORMATION
        ================================= */}
        <section id="info" className="py-14 sm:py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="INFORMATION"
              title="開催情報"
              desc="入場無料。ビール・フードは各ブースで購入。天候等により変更となる場合はSNSで告知します。"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <SoftCard className="p-7">
                  <dl className="space-y-4 text-sm">
                    <div className="flex items-start justify-between gap-6">
                      <dt className="text-gray-500">開催日時</dt>
                      <dd className="text-right font-semibold">
                        <p className="whitespace-pre-line">{EVENT.timeLabel}</p>
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-6">
                      <dt className="text-gray-500">会場</dt>
                      <dd className="text-right font-semibold">{EVENT.venue}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-6">
                      <dt className="text-gray-500">アクセス</dt>
                      <dd className="text-right font-semibold">{EVENT.accessShort}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-6">
                      <dt className="text-gray-500">入場料</dt>
                      <dd className="text-right font-semibold">{EVENT.price}</dd>
                    </div>
                  </dl>
                </SoftCard>
              </Reveal>

              <Reveal delay={0.06}>
                <SoftCard className="overflow-hidden">
                  <iframe
                    title="map"
                    src={EVENT.mapEmbed}
                    className="h-80 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </SoftCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================
            HIGHLIGHTS
        ================================= */}
        <section id="highlights" className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="HIGHLIGHTS"
              title="みどころ"
              desc="多彩なクラフトビール、海辺のロケーション、充実のフード、家族で楽しめる体験ブース。"
              center
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {[
                {
                  title: "多彩なクラフトビール",
                  desc: "千葉県内外からブルワリーが集結。ブルワーと交流しながら味わう一杯は格別。",
                  img: "/images/brewery.png",
                },
                {
                  title: "千葉ならではの海辺",
                  desc: "海風の吹き抜ける開放的な空間。芝生の上でゆったり乾杯。",
                  img: "/images/sanbashi.png",
                },
                {
                  title: "ビールにぴったりフード",
                  desc: "キッチンカー＆テント出店。食べ合わせも楽しめるラインナップ。",
                  img: "/images/food.png",
                },
                {
                  title: "シールラリー特典",
                  desc: "6杯分のシールでくじ引き。ハズレなし、ブルワリーグッズが当たるチャンス！",
                  img: "/images/seal.jpg",
                },
              ].map((h, i) => (
                <Reveal key={h.title} delay={0.06 + i * 0.05}>
                  <SoftCard className="overflow-hidden flex h-full flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={h.img}
                        alt={h.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="text-base font-semibold">{h.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{h.desc}</p>
                    </div>
                  </SoftCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================
            BREWERIES
        ================================= */}
        <section
          id="breweries"
          className={`py-14 sm:py-20 ${SECTION_COLORS.breweries.sectionBg}`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="BREWERIES"
              title="ブルワリー"
              desc="千葉県内外から選りすぐりのブルワリーが参加。ビアスタイルの多様さも魅力です。"
            />

            <Reveal delay={0.08}>
              <SoftCard className="mt-10 overflow-hidden">
                <div className="relative w-full aspect-square bg-gray-50 p-6">
                  <Image
                    src="/images/brewery_all.png"
                    alt="出店ブルワリー"
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-contain"
                  />
                </div>

                <div className="p-7">
                  <div className="text-sm font-semibold">出店ブルワリー（順不同）</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {BREWERIES.map((b) => (
                      <div
                        key={b.name}
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3"
                      >
                        <div className="text-sm font-semibold">{b.name}</div>
                        <div className="mt-1 text-xs text-gray-500">{b.area}</div>

                        {b.days && (
                          <div
                            className={
                              "mt-2 text-[11px] font-semibold " +
                              (b.days === "両日" ? "text-gray-500" : "text-red-600")
                            }
                          >
                            {b.days === "両日" ? "両日出店" : `※${b.days}`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SoftCard>
            </Reveal>
          </div>
        </section>

        {/* ================================
            FOOD
        ================================= */}
        <section id="food" className={`py-14 sm:py-20 ${SECTION_COLORS.food.sectionBg}`}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="FOOD"
              title="フード"
              desc="ビールと相性抜群のこだわりフードが集結。食べ歩きもおすすめ。"
            />

            <Reveal delay={0.08}>
              <SoftCard className="mt-10 overflow-hidden">
                <div className="relative w-full bg-white">
                  <Image
                    src="/images/food_all.png"
                    alt="フード出店"
                    width={800}
                    height={1200}
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>

                <div className="p-7">
                  <div className="text-sm font-semibold">出店フード</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {FOODS.map((f) => (
                      <div
                        key={f.name}
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold">{f.name}</div>
                          {f.kind ? (
                            <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                              {f.kind}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">{f.menu}</div>

                        {f.days && (
                          <div
                            className={
                              "mt-2 text-[11px] font-semibold " +
                              (f.days === "両日" ? "text-gray-500" : "text-red-600")
                            }
                          >
                            {f.days === "両日" ? "両日出店" : `※${f.days}`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SoftCard>
            </Reveal>
          </div>
        </section>

        {/* ================================
            CONTENTS
        ================================= */}
        <section
          id="contents"
          className={`py-14 sm:py-20 ${SECTION_COLORS.contents.sectionBg}`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="CONTENTS"
              title="コンテンツ"
              desc="ブルワリー・フードの楽しみ方に加え、シールラリーや体験ブース、オリジナルリユースカップも。"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <SoftCard className="overflow-hidden">
                  <div className="relative h-56 w-full">
                    <Image
                      src="/images/pr1.jpg"
                      alt="ブルワリーキーホルダー ガラポン"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-sm font-semibold">
                      ブルワリーキーホルダー ガラポン
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      出店ブルワリーのオリジナルキーホルダーが当たるガラポン企画。
                      どのブルワリーが当たるかは運次第。コンプリートを目指して挑戦！
                    </p>
                    <div className="mt-4 text-xs text-gray-500">
                      ※数量限定／なくなり次第終了
                    </div>
                  </div>
                </SoftCard>
              </Reveal>

              <Reveal delay={0.06}>
                <SoftCard className="overflow-hidden">
                  <div className="relative h-56 w-full">
                    <Image
                      src="/images/cup.png"
                      alt="イベントグッズ販売"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-sm font-semibold">オフィシャルグッズ販売</div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      チバビアフェス限定グッズを販売。
                      リユースカップ、ステッカー、アパレルなど、
                      ここでしか手に入らないアイテムをご用意しています。
                    </p>
                    <div className="mt-4 text-xs text-gray-500">
                      ※数量限定アイテムあり
                    </div>
                  </div>
                </SoftCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================
            ACCESS
        ================================= */}
        <section id="access" className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="ACCESS"
              title="アクセス"
              desc={EVENT.accessShort + "。目の前に海が広がる開放的な空間です。"}
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <SoftCard className="p-7">
                  <div className="text-sm font-semibold">会場</div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{EVENT.venue}</p>

                  <div className="mt-6 text-sm font-semibold">最寄り</div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {EVENT.accessShort}
                  </p>

                  <div className="mt-6">
                    <a
                      href={EVENT.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sendGAEvent("event", "click_access_map")}
                      className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-gray-50"
                    >
                      Google Mapsで開く
                    </a>
                  </div>
                </SoftCard>
              </Reveal>

              <Reveal delay={0.06}>
                <SoftCard className="overflow-hidden">
                  <div className="relative h-80 w-full">
                    <Image
                      src="/images/pr2.jpg"
                      alt="さんばしひろば"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </SoftCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================
            NOTES
        ================================= */}
        <section id="notes" className="py-14 sm:py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              kicker="NOTES"
              title="注意事項"
              desc="安全・快適な運営のため、ご協力をお願いします。"
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "飲酒は20歳以上。年齢確認をお願いする場合があります。",
                "飲酒運転は禁止です。公共交通機関をご利用ください。",
                "会場内は混雑する場合があります。譲り合ってお楽しみください。",
                "天候等により内容が変更・中止となる場合があります（最新情報はSNSで告知）。",
                "芝生・海辺の会場です。歩きやすい靴がおすすめです。",
                "ゴミの分別にご協力ください。",
              ].map((t, i) => (
                <Reveal key={t} delay={0.04 + i * 0.03}>
                  <SoftCard className="p-6">
                    <p className="text-sm leading-relaxed text-gray-700">{t}</p>
                  </SoftCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================
            FAQ
        ================================= */}
        <section id="faq" className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader kicker="FAQ" title="よくある質問" />

            <div className="mt-10 space-y-4">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={0.06 + i * 0.05}>
                  <SoftCard className="p-7">
                    <div className="text-base font-semibold">{item.q}</div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
                  </SoftCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================
            CONTACT
        ================================= */}
        <section id="contact" className="py-14 sm:py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <SectionHeader
              kicker="CONTACT"
              title="参加・問い合わせ"
              desc="出店・協賛・取材・来場に関するご相談は、専用フォームよりお問い合わせください。"
              center
            />

            <div className="mt-10 mx-auto max-w-3xl space-y-6">
              <Reveal>
                <SoftCard className="p-8 sm:p-10 text-center min-h-[220px] flex flex-col items-center justify-center">
                  <div className="text-2xl font-semibold">お問い合わせフォーム</div>

                  <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                    出店・協賛・取材・来場に関するお問い合わせは、
                    専用フォームよりお送りください。
                  </p>

                  <a                     href="https://docs.google.com/forms/d/e/1FAIpQLSeH8nUKrjY2OYVQjGzwZb0HuAnNdvpcSuAkkvblBvz8G9KIHg/viewform?usp=dialog"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sendGAEvent("event", "click_contact_form")}
                    className="mt-8 inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                  >
                    フォームを開く
                  </a>
                </SoftCard>
              </Reveal>

              <Reveal delay={0.12}>
                <SoftCard className="p-8 sm:p-10 text-center min-h-[220px] flex flex-col items-center justify-center">
                  <div className="text-2xl font-semibold">運営情報</div>

                  <dl className="mt-6 space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">主催</dt>
                      <dd className="mt-1 text-lg font-semibold">{EVENT.organizer}</dd>
                    </div>
                  </dl>
                </SoftCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================
            FOOTER
        ================================= */}
        <footer className="border-t border-gray-200 py-10 text-center">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {EVENT.title}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}