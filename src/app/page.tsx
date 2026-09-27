"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
  days: [
    { date: "4/25", dow: "土", time: "11:00 – 21:00", lo: "L.O. 20:30" },
    { date: "4/26", dow: "日", time: "11:00 – 20:00", lo: "L.O. 19:30" },
  ],
  venueName: "さんばしひろば",
  venueArea: "千葉みなと",
  address: "千葉県千葉市中央区中央港",
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
  { src: "/images/hero_sp1.jpg", alt: "チバビアフェストの会場風景 1" },
  { src: "/images/hero_sp2.jpg", alt: "チバビアフェストの会場風景 2" },
  { src: "/images/hero_sp3.jpg", alt: "チバビアフェストの会場風景 3" },
];

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
   共通UI
======================================== */

/** 見出し：大きな英字 + 日本語サブ(Yeast Side風の中央ブロック見出し) */
function SectionTitle({
  en,
  ja,
  tone = "dark",
}: {
  en: string;
  ja: string;
  tone?: "dark" | "light";
}) {
  const sub = tone === "light" ? "text-yolk" : "text-ink/70";
  const main = tone === "light" ? "text-paper" : "text-ink";
  return (
    <div className="text-center">
      <h2
        className={`font-[family-name:var(--font-display)] text-4xl leading-none sm:text-6xl ${main}`}
      >
        {en}
      </h2>
      <p className={`mt-3 text-sm font-bold sm:text-base ${sub}`}>{ja}</p>
    </div>
  );
}

/** 丸いピル型ボタン。黒地×イエロー文字が基本 */
function PillLink({
  href,
  children,
  onClick,
  variant = "ink",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "ink" | "yolk" | "outline";
  external?: boolean;
}) {
  const styles = {
    ink: "bg-ink text-yolk border-ink hover:bg-yolk hover:text-ink",
    yolk: "bg-yolk text-ink border-ink hover:bg-ink hover:text-yolk",
    outline: "bg-transparent text-ink border-ink hover:bg-ink hover:text-yolk",
  }[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full border-2 px-7 py-3 font-[family-name:var(--font-display)] text-sm tracking-wide transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink ${styles}`}
    >
      {children}
    </a>
  );
}

/** 出店日が片日のみの場合のタグ */
function DayTag({ days }: { days?: string }) {
  if (!days) return null;
  if (days === "両日") {
    return <span className="text-[11px] font-bold text-ink/50">両日出店</span>;
  }
  return (
    <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-bold text-yolk">
      {days}
    </span>
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
      <AnimatePresence initial={false}>
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`スライド ${i + 1}`}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 w-2.5 rounded-full border-2 border-ink",
                i === index ? "bg-yolk" : "bg-paper",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================================
   ヘッダー(黒帯・固定)
======================================== */
const NAV = [
  { label: "概要", href: "#about" },
  { label: "開催情報", href: "#info" },
  { label: "みどころ", href: "#highlights" },
  { label: "ブルワリー", href: "#breweries" },
  { label: "フード", href: "#food" },
  { label: "コンテンツ", href: "#contents" },
  { label: "アクセス", href: "#access" },
  { label: "よくある質問", href: "#faq" },
  { label: "お問い合わせ", href: "#contact" },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-tomato text-paper">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
        <a
          href="#top"
          className="shrink-0 font-[family-name:var(--font-display)] text-lg leading-none text-yolk sm:text-xl"
        >
          CHIBA BEER FEST
        </a>
        <nav className="hidden flex-1 items-center justify-end gap-5 lg:flex" aria-label="ページ内メニュー">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs font-bold text-paper transition-colors hover:text-yolk"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={EVENT.instagram}
          target="_blank"
          rel="noreferrer"
          onClick={() => sendGAEvent("event", "click_instagram_header")}
          className="ml-auto shrink-0 rounded-full bg-yolk px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-paper lg:ml-0"
        >
          Instagram
        </a>
      </div>
      {/* スマホ・タブレット：横スクロールのメニュー */}
      <nav
        className="flex gap-4 overflow-x-auto whitespace-nowrap border-t border-paper/20 px-5 py-2.5 lg:hidden"
        aria-label="ページ内メニュー"
      >
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="text-xs font-bold text-paper hover:text-yolk">
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ========================================
   流れる帯(ページ内で唯一の動き)
======================================== */
function Marquee() {
  const unit = ["ALL YOU NEED IS BEER!", "CHIBA BEER FEST 2026", "さんばしひろば 4.25 SAT – 4.26 SUN"];
  const row = [...unit, ...unit];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink py-3" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[...row, ...row].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-[family-name:var(--font-display)] text-lg text-yolk sm:text-2xl"
          >
            {t}
            <span className="text-paper">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ========================================
   メインページ
======================================== */
export default function Page() {
  return (
    <main
      id="top"
      className="relative bg-paper text-ink"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <SiteHeader />

      {/* ================================
          HERO(イエロー地に写真を枠で囲む)
      ================================= */}
      <section className="bg-yolk px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] border-2 border-ink sm:rounded-[40px]">
            <div className="relative h-[58vh] min-h-[380px] w-full sm:h-[64vh] sm:min-h-[480px]">
              <div className="absolute inset-0 sm:hidden">
                <HeroCarousel images={HERO_IMAGES} intervalMs={3500} />
              </div>
              <div className="absolute inset-0 hidden sm:block">
                <Image
                  src="/images/hero_pc.jpg"
                  alt="さんばしひろばに並ぶブルワリーのテント"
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1152px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* ロゴプレート */}
            <div className="absolute left-4 top-4 rounded-2xl border-2 border-ink bg-plate p-2 sm:left-8 sm:top-8 sm:p-3">
              <Image
                src="/images/hero_title.png"
                alt="CHIBA BEER FEST - ALL YOU NEED IS BEER! - 2026"
                width={281}
                height={100}
                priority
                className="h-auto w-[180px] sm:w-[260px]"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-5 text-center sm:mt-8 sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-[family-name:var(--font-display)] text-[17px] leading-tight min-[400px]:text-xl sm:text-4xl">
                {EVENT.datesLabel}
              </p>
              <p className="mt-2 text-sm font-bold sm:text-base">
                {EVENT.venueName}（{EVENT.venueArea}）／入場無料
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PillLink
                href="#breweries"
                onClick={() => sendGAEvent("event", "click_breweries_hero")}
              >
                ブルワリーを見る
              </PillLink>
              <PillLink
                href="#access"
                variant="outline"
                onClick={() => sendGAEvent("event", "click_access_hero")}
              >
                アクセス
              </PillLink>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ================================
          ABOUT
      ================================= */}
      <section id="about" className="scroll-mt-28 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="ABOUT US" ja="概要" />
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-loose sm:text-lg">
            千葉市で最大級の屋外クラフトビールフェス。ビール好きはもちろん、クラフトビールが初めての方やご家族連れでも楽しめるイベントです。
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "#breweries",
                ga: "click_breweries_about",
                title: "クラフトビール",
                text: "千葉県内外からブルワリーが集結。つくり手と飲み手がつながる“特別な一杯”を。",
                cta: "ブルワリーを見る",
              },
              {
                href: "#food",
                ga: "click_food_about",
                title: "フード",
                text: "ビールに合うこだわりフードが充実。キッチンカー＆テントで食べ歩きも楽しい。",
                cta: "フードを見る",
              },
              {
                href: "#contents",
                ga: "click_contents_about",
                title: "体験コンテンツ",
                text: "ボディペイントなど、家族で楽しめる体験型ブースも用意しています。",
                cta: "コンテンツを見る",
              },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                onClick={() => sendGAEvent("event", c.ga)}
                className="group flex flex-col rounded-[28px] border-2 border-ink bg-yolk p-7 transition-colors hover:bg-ink hover:text-yolk"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{c.text}</p>
                <span className="mt-auto pt-6 text-sm font-bold underline decoration-2 underline-offset-4">
                  {c.cta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          INFORMATION(店舗ブロック風の開催情報)
      ================================= */}
      <section id="info" className="scroll-mt-28 bg-yolk py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="THE FEST" ja="開催情報" />

          <div className="mt-12 grid overflow-hidden rounded-[32px] border-2 border-ink bg-paper lg:grid-cols-[1fr_1.1fr]">
            <div className="relative min-h-[260px] border-b-2 border-ink lg:border-b-0 lg:border-r-2">
              <Image
                src="/images/sanbashi.png"
                alt="さんばしひろばの芝生"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-7 sm:p-10">
              <h3 className="font-[family-name:var(--font-display)] text-4xl leading-none sm:text-5xl">
                {EVENT.venueName}
              </h3>
              <p className="mt-2 text-sm font-bold text-ink/60">{EVENT.venueArea}</p>

              <dl className="mt-8 grid grid-cols-2 gap-3">
                {EVENT.days.map((d) => (
                  <div key={d.date} className="rounded-2xl border-2 border-ink p-3 sm:p-4">
                    <dt className="whitespace-nowrap font-[family-name:var(--font-display)] text-xl">
                      {d.date}
                      <span className="ml-1 text-sm">（{d.dow}）</span>
                    </dt>
                    <dd className="mt-2 whitespace-nowrap text-[15px] font-bold sm:text-lg">{d.time}</dd>
                    <dd className="text-xs text-ink/60">{d.lo}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 space-y-2 text-sm">
                <a
                  href={EVENT.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sendGAEvent("event", "click_info_map")}
                  className="block font-bold underline decoration-2 underline-offset-4 hover:text-yolk-deep"
                >
                  {EVENT.address}
                </a>
                <p>{EVENT.accessShort}</p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
                {["入場無料", "海辺の芝生", "家族連れ歓迎"].map((t) => (
                  <li key={t} className="rounded-full bg-ink px-3 py-1 text-yolk">
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-ink/60">
                ビール・フードは各ブースで購入。{EVENT.weatherNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          HIGHLIGHTS(丸写真グリッド)
      ================================= */}
      <section id="highlights" className="scroll-mt-28 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="BEST OF THE FEST" ja="みどころ" />
          <p className="mt-4 text-center font-[family-name:var(--font-display)] text-base sm:text-lg">
            楽しみ方はひとつじゃない！
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
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
            ].map((h) => (
              <div key={h.title} className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-full border-2 border-ink bg-yolk">
                  <Image
                    src={h.img}
                    alt={h.title}
                    fill
                    sizes="(max-width: 1024px) 45vw, 220px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg leading-snug">
                  {h.title}
                </h3>
                <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-ink/70">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          BREWERIES(黒セクション)
      ================================= */}
      <section id="breweries" className="scroll-mt-28 bg-ink py-20 text-paper sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="BREWERIES" ja="出店ブルワリー（順不同）" tone="light" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-paper/75 sm:text-base">
            千葉県内外から選りすぐりのブルワリーが参加。ビアスタイルの多様さも魅力です。
          </p>

          <div className="relative mx-auto mt-12 aspect-[723/529] w-full max-w-3xl overflow-hidden rounded-[28px] border-2 border-yolk bg-paper">
            <Image
              src="/images/brewery_all.png"
              alt="出店ブルワリーのロゴ一覧"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>

          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {BREWERIES.map((b) => (
              <li
                key={b.name}
                className="flex items-baseline justify-between gap-4 border-b border-paper/15 py-4"
              >
                <div>
                  <div className="font-bold">{b.name}</div>
                  {b.area ? <div className="mt-0.5 text-xs text-paper/55">{b.area}</div> : null}
                </div>
                {b.days && b.days !== "両日" ? (
                  <span className="shrink-0 rounded-full bg-yolk px-2.5 py-0.5 text-[11px] font-bold text-ink">
                    {b.days}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================
          FOOD
      ================================= */}
      <section id="food" className="scroll-mt-28 bg-yolk py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="FOOD" ja="出店フード" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed sm:text-base">
            ビールと相性抜群のこだわりフードが集結。食べ歩きもおすすめ。
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="overflow-hidden rounded-[28px] border-2 border-ink bg-paper">
              <Image
                src="/images/food_all.png"
                alt="出店フードの一覧"
                width={390}
                height={252}
                sizes="(max-width: 1024px) 100vw, 480px"
                className="h-auto w-full"
              />
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {FOODS.map((f) => (
                <li key={f.name} className="rounded-2xl border-2 border-ink bg-paper px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold leading-snug">{f.name}</div>
                    {f.kind ? (
                      <span className="shrink-0 rounded-full border-2 border-ink px-2 text-[11px] font-bold">
                        {f.kind}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span className="text-sm text-ink/70">{f.menu}</span>
                    <DayTag days={f.days} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================
          CONTENTS(大きなタイル2枚)
      ================================= */}
      <section id="contents" className="scroll-mt-28 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="MORE FUN" ja="コンテンツ" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-ink/70 sm:text-base">
            ブルワリー・フードの楽しみ方に加え、シールラリーや体験ブース、オリジナルリユースカップも。
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                img: "/images/pr1.jpg",
                title: "ブルワリーキーホルダー ガラポン",
                text: "出店ブルワリーのオリジナルキーホルダーが当たるガラポン企画。どのブルワリーが当たるかは運次第。コンプリートを目指して挑戦！",
                note: "※数量限定／なくなり次第終了",
              },
              {
                img: "/images/cup.png",
                title: "オフィシャルグッズ販売",
                text: "チバビアフェス限定グッズを販売。リユースカップ、ステッカー、アパレルなど、ここでしか手に入らないアイテムをご用意しています。",
                note: "※数量限定アイテムあり",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="overflow-hidden rounded-[32px] border-2 border-ink bg-yolk"
              >
                <div className="relative h-60 w-full border-b-2 border-ink">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-xl leading-snug sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed">{c.text}</p>
                  <p className="mt-4 text-xs font-bold text-ink/60">{c.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          ACCESS
      ================================= */}
      <section id="access" className="scroll-mt-28 bg-yolk py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle en="ACCESS" ja="アクセス" />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col rounded-[32px] border-2 border-ink bg-paper p-7 sm:p-10">
              <h3 className="font-[family-name:var(--font-display)] text-3xl">{EVENT.venueName}</h3>
              <p className="mt-3 text-sm leading-relaxed">{EVENT.venue}</p>
              <h4 className="mt-8 text-sm font-bold">最寄り駅</h4>
              <p className="mt-2 text-sm leading-relaxed">
                {EVENT.accessShort}。目の前に海が広がる開放的な空間です。
              </p>
              <div className="mt-auto pt-8">
                <PillLink
                  href={EVENT.mapUrl}
                  external
                  onClick={() => sendGAEvent("event", "click_access_map")}
                >
                  Google Mapsで開く
                </PillLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border-2 border-ink bg-paper">
              <iframe
                title="さんばしひろばの地図"
                src={EVENT.mapEmbed}
                className="h-80 w-full lg:h-full lg:min-h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          NOTES & FAQ
      ================================= */}
      <section id="notes" className="scroll-mt-28 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <SectionTitle en="PLEASE NOTE" ja="注意事項" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              "飲酒は20歳以上。年齢確認をお願いする場合があります。",
              "飲酒運転は禁止です。公共交通機関をご利用ください。",
              "会場内は混雑する場合があります。譲り合ってお楽しみください。",
              "天候等により内容が変更・中止となる場合があります（最新情報はSNSで告知）。",
              "芝生・海辺の会場です。歩きやすい靴がおすすめです。",
              "ゴミの分別にご協力ください。",
            ].map((t) => (
              <li
                key={t}
                className="rounded-2xl border-2 border-ink px-5 py-4 text-sm leading-relaxed"
              >
                {t}
              </li>
            ))}
          </ul>

          <div id="faq" className="scroll-mt-28 pt-20 sm:pt-28">
            <SectionTitle en="FAQ" ja="よくある質問" />
            <div className="mt-10 space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border-2 border-ink bg-paper open:bg-yolk"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold">
                    {item.q}
                    <span
                      className="font-[family-name:var(--font-display)] text-xl transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          CONTACT(黒カード)
      ================================= */}
      <section id="contact" className="scroll-mt-28 bg-yolk px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl rounded-[40px] border-2 border-ink bg-ink px-6 py-14 text-center text-paper sm:px-12">
          <SectionTitle en="LET'S TALK" ja="出店・協賛・取材のご相談" tone="light" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-paper/75 sm:text-base">
            出店・協賛・取材・来場に関するお問い合わせは、専用フォームよりお送りください。
          </p>
          <div className="mt-8">
            <PillLink
              href="https://docs.google.com/forms/d/e/1FAIpQLSeH8nUKrjY2OYVQjGzwZb0HuAnNdvpcSuAkkvblBvz8G9KIHg/viewform?usp=dialog"
              variant="yolk"
              external
              onClick={() => sendGAEvent("event", "click_contact_form")}
            >
              フォームを開く
            </PillLink>
          </div>
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}
      <footer className="bg-ink py-12 text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl text-yolk">CHIBA BEER FEST</p>
          <a
            href={EVENT.instagram}
            target="_blank"
            rel="noreferrer"
            onClick={() => sendGAEvent("event", "click_instagram_footer")}
            className="text-sm font-bold underline decoration-yolk decoration-2 underline-offset-4 hover:text-yolk"
          >
            {EVENT.instagramHandle}
          </a>
          <p className="text-xs text-paper/60">主催：{EVENT.organizer}</p>
          <p className="text-xs text-paper/40">
            © {new Date().getFullYear()} {EVENT.title}
          </p>
        </div>
      </footer>
    </main>
  );
}
