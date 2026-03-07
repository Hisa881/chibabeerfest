"use client";

import React from "react";
import Image from "next/image";
import { Reveal, HoverCard } from "../components/Reveal";


type Brewery = { name: string; area: string };
type Food = { name: string; menu: string; kind?: "キッチンカー" | "テント" };

const EVENT = {
  title: "チバビアフェスト",
  catch: "ALL YOU NEED IS BEER!",
  // 
  datesLabel: "2026年4月25日（土）・26日（日）",
  timeLabel: `4月25日（土）／11:00 – 21:00（L.O. 20:30）
4月26日（日）／11:00 – 20:00（L.O. 19:30）`,
  venue: "さんばしひろば（千葉県千葉市中央区中央港）",
  accessShort: "JR京葉線・千葉都市モノレール「千葉みなと駅」徒歩3分",
  price: "入場無料（ビール・フードは各ブースで購入）",
  weatherNote: "天候等により内容が変更・中止となる場合があります（最新情報はSNSで告知）",
  organizer: "チバビアフェスト実行委員会",
  /* sponsors: [""], */
  /* partners: [""], */
  contactName: "幸野 茜（Akane Kono）",
  contactMail: "chiba.beerfest@gmail.com",
  instagram: "https://www.instagram.com/chibabeerfest/",
  instagramHandle: "@chibabeerfest",
  // Google Map（必要なら差し替え）
  mapUrl: "https://www.google.com/maps?q=さんばしひろば&hl=ja&z=16",
  mapEmbed: "https://www.google.com/maps?q=%E3%81%95%E3%82%93%E3%81%B0%E3%81%97%E3%81%B2%E3%82%8D%E3%81%B0&output=embed",
};

const HERO_IMAGES = [
  { src: "/images/hero_1.png", alt: "HERO1" },
];

const BREWERIES: Brewery[] = [
  { name: "潮風ブルーラボ", area: "千葉県千葉市" },
  { name: "幕張ブルワリー", area: "千葉県千葉市" },
  { name: "海岸醸造", area: "千葉県南房総市" },
  { name: "Y.Y.G Brewery Factory", area: "千葉県千葉市" },
  { name: "寒菊ブルワリー", area: "千葉県山武市" },
  { name: "", area: "" },
  { name: "RIO BREWING & CO.", area: "千葉県柏市" },
  { name: "うしとらブルワリー", area: "栃木県下野市" },
  { name: "秩父麦酒", area: "埼玉県秩父市" },
  { name: "G-BRAND “Bespoke” BEERERS", area: "東京都" },
  { name: "U.B.P Brewery", area: "埼玉県さいたま市" },
  { name: "いなびや / 千葉稲毛ビール醸造所", area: "千葉県千葉市稲毛区" },
  { name: "おたこビール", area: "千葉県千葉市" },
  { name: "SONGBIRD BEER", area: "千葉県木更津市" },
  { name: "Fuller’s London Pride", area: "UK" },
];

const FOODS: Food[] = [
  { kind: "キッチンカー", name: "カレー屋リリー", menu: "カレー" },
  { kind: "キッチンカー", name: "SHUNGOROU SAUSAGE", menu: "自家製ソーセージ" },
  { kind: "キッチンカー", name: "もくしち", menu: "餃子" },
  { kind: "キッチンカー", name: "蛸八", menu: "たこ焼き" },
  { kind: "キッチンカー", name: "NORA", menu: "チャーシュー丼" },
  { kind: "キッチンカー", name: "ISLAND KITCHEN", menu: "ジャークチキン" },
  { kind: "キッチンカー", name: "おだやかのむこう", menu: "焼き芋" },
  { kind: "キッチンカー", name: "Hawaian Kitchen aoakua", menu: "ロコモコ丼" },
  { kind: "キッチンカー", name: "MoiMoi", menu: "ピタパンサンド" },
  { kind: "キッチンカー", name: "BAZIO", menu: "アジアンフード" },
  { kind: "キッチンカー", name: "東京豚足ジプシー", menu: "豚足" },
  { kind: "テント", name: "WAPIZZA", menu: "ワッフル風ピザ" },
  { kind: "テント", name: "もぢょい有限会社", menu: "焼き鳥" },
  { kind: "テント", name: "オフィスアワー", menu: "ラップサンド" },
  { kind: "テント", name: "きまぐれカフェ clover", menu: "唐揚げ" },
];

const FAQ = [
  { q: "入場料はかかりますか？", a: EVENT.price },
  { q: "雨でも開催しますか？", a: EVENT.weatherNote },
  { q: "会場への行き方は？", a: `${EVENT.accessShort}。${EVENT.venue}` },
  {
    q: "家族連れでも楽しめますか？",
    a: "ボディペイントなど、子どもから大人まで楽しめる体験型ブースを用意しています。",
  },
];

function SoftCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <HoverCard className={"rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition " + (className ?? "")}>
      {children}
    </HoverCard>
  );
}

import { AnimatePresence, motion } from "framer-motion";

function HeroCarousel({
  images,
  intervalMs = 5000,
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

  const prev = React.useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
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
          transition={{ duration: 0.55, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            const x = info.offset.x;
            const v = info.velocity.x;
            // しきい値（スワイプでも移動できる）
            if (x < -60 || v < -500) next();
            if (x > 60 || v > 500) prev();
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* 矢印（スマホは表示を少し控えめに） */}
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="前の画像"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur px-3 py-2 text-sm font-semibold shadow-sm border border-gray-200 hover:bg-white"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="次の画像"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur px-3 py-2 text-sm font-semibold shadow-sm border border-gray-200 hover:bg-white"
          >
            →
          </button>

          {/* ドット */}
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
        </>
      )}
    </div>
  );
}

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
          <p className={"mt-5 text-sm sm:text-base leading-relaxed text-gray-600 " + (center ? "mx-auto max-w-2xl" : "")}>
            {desc}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

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

export default function Page() {
  return (
    <main className="relative bg-white text-neutral-900">
  {/* うっすらフェスっぽい光（白背景維持） */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />
    <div className="absolute top-40 -left-24 h-[420px] w-[420px] rounded-full bg-sky-200/30 blur-3xl" />
    <div className="absolute bottom-0 -right-24 h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl" />
  </div>

  <div className="relative">
      {/* 上部ナビ */}
      <AnchorRow />

      {/* HERO（カルーセル） */}
<header className="relative">
  {/* 画像エリア */}
  <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
    <HeroCarousel images={HERO_IMAGES} intervalMs={5000} />

    {/* テキストを見やすくするグラデーション */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
  </div>

  {/* テキスト */}
  <div className="absolute inset-0 flex items-end">
    <div className="w-full pb-10 sm:pb-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl text-white">
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight">
            CHIBA BEERFEST
          </h1>
          <div className="text-xs tracking-[0.18em] opacity-90">
            ALL YOU NEED IS BEER!
          </div>

          <p className="mt-3 text-sm sm:text-base opacity-95">
            2026年4月25日（土）・26日（日）
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#breweries"
              className="inline-flex items-center justify-center rounded-2xl bg-white/95 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-white"
            >
              ブルワリーを見る
            </a>

            <a
              href="#access"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              アクセス
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

      {/* 概要 */}
      <section id="about" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            kicker="ABOUT"
            title="概要"
            desc="千葉市で最大級の屋外クラフトビールフェス。ビール好きはもちろん、クラフトビールが初めての方やご家族連れでも楽しめるイベントです。"
          />

<div className="mt-10 grid gap-6 lg:grid-cols-3 items-stretch">
  <Reveal>
    <SoftCard className="h-full p-0">
      <a
        href="#breweries"
        className="flex h-full flex-col rounded-3xl border border-gray-200 p-8 hover:shadow-lg transition"
      >
        <h3 className="text-xl font-semibold mb-3">クラフトビール</h3>
        <p className="text-gray-600 leading-relaxed">
          千葉県内外からブルワリーが集結。つくり手と飲み手がつながる“特別な一杯”を。
        </p>
        <span className="mt-auto pt-6 text-sm font-semibold text-neutral-900">
          ブルワリーを見る →
        </span>
      </a>
    </SoftCard>
  </Reveal>

  <Reveal delay={0.06}>
    <SoftCard className="h-full p-0">
      <a
        href="#food"
        className="flex h-full flex-col rounded-3xl border border-gray-200 p-8 hover:shadow-lg transition"
      >
        <h3 className="text-xl font-semibold mb-3">フード</h3>
        <p className="text-gray-600 leading-relaxed">
          ビールに合うこだわりフードが充実。キッチンカー＆テントで食べ歩きも楽しい。
        </p>
        <span className="mt-auto pt-6 text-sm font-semibold text-neutral-900">
          フードを見る →
        </span>
      </a>
    </SoftCard>
  </Reveal>

  <Reveal delay={0.12}>
    <SoftCard className="h-full p-0">
      <a
        href="#contents"
        className="flex h-full flex-col rounded-3xl border border-gray-200 p-8 hover:shadow-lg transition"
      >
        <h3 className="text-xl font-semibold mb-3">体験コンテンツ</h3>
        <p className="text-gray-600 leading-relaxed">
          ボディペイントなど、家族で楽しめる体験型ブースも用意しています。
        </p>
        <span className="mt-auto pt-6 text-sm font-semibold text-neutral-900">
          コンテンツを見る →
        </span>
      </a>
    </SoftCard>
  </Reveal>
</div>
        </div>
      </section>

      {/* 開催情報 */}
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
			<p className="whitespace-pre-line">
                      {EVENT.timeLabel}
			</p>
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

      {/* みどころ（写真入り） */}
      <section id="highlights" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            kicker="HIGHLIGHTS"
            title="みどころ"
            desc="多彩なクラフトビール、海辺のロケーション、充実のフード、家族で楽しめる体験ブース。"
            center
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "多彩なクラフトビール",
                desc: "千葉県内外からブルワリーが集結。ブルワーと交流しながら味わう一杯は格別。",
                img: "/images/brewery.jpg",
              },
              {
                title: "千葉ならではの海辺",
                desc: "海風の吹き抜ける開放的な空間。芝生の上でゆったり乾杯。",
                img: "/images/sanbashi.png",
              },
              {
                title: "ビールにぴったりフード",
                desc: "キッチンカー＆テント出店。食べ合わせも楽しめるラインナップ。",
                img: "/images/food.jpg",
              },
              {
                title: "シールラリー特典",
                desc: "6杯分のシールでくじ引き。ハズレなし、ブルワリーグッズが当たるチャンス！",
                img: "/images/seal.jpg",
              },
            ].map((h, i) => (
              <Reveal key={h.title} delay={0.06 + i * 0.05}>
                <SoftCard className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={h.img} alt={h.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="text-base font-semibold">{h.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{h.desc}</p>
                  </div>
                </SoftCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ブルワリー */}
      <section id="breweries" className="py-14 sm:py-20 bg-gray-50">
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
    src="/images/brewery_all.jpg"
    alt="出店ブルワリー"
    fill
    className="object-contain"
  />
</div>
              <div className="p-7">
                <div className="text-sm font-semibold">出店ブルワリー（順不同）</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {BREWERIES.map((b) => (
                    <div key={b.name} className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <div className="text-sm font-semibold">{b.name}</div>
                      <div className="mt-1 text-xs text-gray-500">{b.area}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>

      {/* フード */}
      <section id="food" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader kicker="FOOD" title="フード" desc="ビールと相性抜群のこだわりフードが集結。食べ歩きもおすすめ。" />

          <Reveal delay={0.08}>
            <SoftCard className="mt-10 overflow-hidden">
              <div className="relative w-full bg-white">
  <Image
    src="/images/food.jpg"
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
                    <div key={f.name} className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">{f.name}</div>
                        {f.kind ? (
                          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                            {f.kind}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">{f.menu}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>

      {/* コンテンツ（ここに「ブルワリー/飲食を1店舗ずつロゴ付き紹介」＋体験/カップ/シールラリー） */}
      <section id="contents" className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            kicker="CONTENTS"
            title="コンテンツ"
            desc="ブルワリー・フードの楽しみ方に加え、シールラリーや体験ブース、オリジナルリユースカップも。"
          />

          {/* Spotlight（ロゴ付きで1店舗ずつ紹介 */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/*
              <Reveal>
              <SoftCard className="p-7">
                <div className="text-xs tracking-[0.16em] text-gray-500">FEATURED BREWERY</div>
                <div className="mt-3 flex items-start gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <Image src="/images/brewery_all.jpg" alt="ブルワリー ロゴ" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">幕張ブルワリー</div>
                    <div className="mt-1 text-sm text-gray-600">千葉県千葉市</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  ブルワーさんと直接交流できる距離感が魅力。会場で飲む“できたての一杯”を、海風と一緒に楽しんでください。
                </p>
                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-xs font-semibold text-gray-800">おすすめの楽しみ方</div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>・まずは1杯目を軽めのスタイルでスタート</li>
                    <li>・気に入ったらブルワーさんに“次のおすすめ”を聞く</li>
                    <li>・フードと合わせて香りの変化も楽しむ</li>
                  </ul>
                </div>
              </SoftCard>
            </Reveal>
           */}

           {/*
              <Reveal delay={0.06}>
              <SoftCard className="p-7">
                <div className="text-xs tracking-[0.16em] text-gray-500">FEATURED FOOD</div>
                <div className="mt-3 flex items-start gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <Image src="/images/food.jpg" alt="フード ロゴ" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">カレー屋リリー</div>
                    <div className="mt-1 text-sm text-gray-600">カレー</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  スパイス系フードはクラフトビールと相性抜群。昼は軽めに、夕方はしっかり系で組み合わせるのもおすすめ。
                </p>
                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-xs font-semibold text-gray-800">おすすめの組み合わせ</div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>・ホップの効いたIPA × スパイス</li>
                    <li>・小麦系（ヴァイツェン等） × マイルド</li>
                    <li>・黒系（ポーター等） × 香ばしさ</li>
                  </ul>
                </div>
              </SoftCard>
            </Reveal>
           */}
          </div>

{/* グッズ・ガラポン */}
<div className="mt-10 grid gap-6 lg:grid-cols-2">
  <Reveal>
    <SoftCard className="overflow-hidden">
      <div className="relative h-56 w-full">
        <Image
          src="/images/pr1.png"
          alt="ブルワリーキーホルダー ガラポン"
          fill
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
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-sm font-semibold">
          オフィシャルグッズ販売
        </div>
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

      {/* アクセス */}
      <section id="access" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader kicker="ACCESS" title="アクセス" desc={EVENT.accessShort + "。目の前に海が広がる開放的な空間です。"} />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <SoftCard className="p-7">
                <div className="text-sm font-semibold">会場</div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{EVENT.venue}</p>
                <div className="mt-6 text-sm font-semibold">最寄り</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{EVENT.accessShort}</p>

                <div className="mt-6">
                  <a
                    href={EVENT.mapUrl}
                    target="_blank"
                    rel="noreferrer"
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
                  <Image src="/images/pr2.png" alt="さんばしひろば" fill className="object-cover" />
                </div>
              </SoftCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section id="notes" className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader kicker="NOTES" title="注意事項" desc="安全・快適な運営のため、ご協力をお願いします。" />

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

      {/* よくある質問 */}
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

      {/* 参加・問い合わせ */}
      <section id="contact" className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <SectionHeader
            kicker="CONTACT"
            title="参加・問い合わせ"
            desc="出店・協賛・取材などのご相談は、Instagramまたはメールからご連絡ください。"
            center
          />

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Reveal>
              <a
                href={EVENT.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Instagram（{EVENT.instagramHandle}）
              </a>
            </Reveal>
            <Reveal delay={0.06}>
              <a
                href={`mailto:${EVENT.contactMail}`}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-gray-50"
              >
                メール：{EVENT.contactMail}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 mx-auto max-w-3xl text-left">
              <SoftCard className="p-7">
                <div className="text-sm font-semibold">運営情報</div>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-500">主催</dt>
                    <dd className="mt-1 font-semibold">{EVENT.organizer}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">お問い合わせ</dt>
                    <dd className="mt-1 font-semibold">
                      {EVENT.contactName}
                      <br />
                      {EVENT.contactMail}
                    </dd>
                  </div>
                </dl>
              </SoftCard>
            </div>
          </Reveal>
        </div>
      </section>

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