import type { Metadata } from "next";
import { Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import { Reveal } from "../../components/Reveal";
import { HeroStage } from "./HeroStage";

const display = Shippori_Mincho({
  weight: ["500", "600", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "チバビアフェスト in 三井アウトレットパーク 木更津",
  description:
    "三井アウトレットパーク 木更津で開催されるクラフトビールイベント『チバビアフェスト』。2026年9月20日(日)〜22日(火・祝)。",
};

/* ========================================
   イベント基本情報(木更津会場)
======================================== */
const EVENT = {
  title: "チバビアフェスト",
  location: "三井アウトレットパーク 木更津",
  datesLabel: "2026年9月20日(日)・21日(月・祝)・22日(火)",
  days: [
    { date: "9/20（日）", time: "11:00 – 19:00" },
    { date: "9/21（月・祝）", time: "11:00 – 19:00" },
    { date: "9/22（火・休）", time: "11:00 – 20:30" },
  ],
  price: "入場無料（ビール・フードは各ブースで購入）",
  venueArea: "ピアストリート特設エリア",
  address: "〒292-0009 千葉県木更津市金田東3-1-1",
  accessCar: "東京湾アクアライン連絡道「木更津金田IC」より約1km",
  accessBus: "JR「袖ケ浦駅」より高速バス約10分／JR「木更津駅」よりバス約20分",
  organizer: "チバビアフェスト実行委員会",
  instagram: "https://www.instagram.com/chibabeerfest/",
  instagramHandle: "@chibabeerfest",
  mapUrl: "https://www.google.com/maps?q=三井アウトレットパーク木更津&hl=ja&z=15",
  mapEmbed:
    "https://www.google.com/maps?q=%E4%B8%89%E4%BA%95%E3%82%A2%E3%82%A6%E3%83%88%E3%83%AC%E3%83%83%E3%83%88%E3%83%91%E3%83%BC%E3%82%AF%E6%9C%A8%E6%9B%B4%E6%B4%A5&output=embed",
};

type Brewery = {
  name: string;
  area: string;
};

const BREWERIES: Brewery[] = [
  { name: "潮風ブルーラボ", area: "千葉県千葉市" },
  { name: "RIO BREWING & CO.", area: "千葉県柏市" },
  { name: "KANKIKU BREWERY", area: "千葉県山武市" },
  { name: "Bighand Bros. Beer", area: "京都府" },
  { name: "秩父麦酒", area: "埼玉県" },
  { name: "海岸醸造", area: "千葉県南房総市" },
  { name: "SONG BIRD BEER", area: "千葉県木更津市" },
  { name: "West Coast Brewing", area: "静岡県" },
];

const NAV = [
  { label: "About", href: "#about" },
  { label: "Info", href: "#info" },
  { label: "Lineup", href: "#lineup" },
  { label: "Access", href: "#access" },
  { label: "Contact", href: "#contact" },
];

export default function KisarazuPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} relative bg-[#14110E] text-[#F2E9DC]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ================================
          上部固定ナビ
      ================================= */}
      <div className="fixed top-0 z-30 w-full border-b border-white/10 bg-[#14110E]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-xs tracking-[0.2em] text-[#F2E9DC]/80">
            CHIBA BEER FEST
          </a>
          <div className="hidden items-center gap-8 sm:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-xs tracking-[0.1em] text-[#F2E9DC]/70 transition hover:text-[#F2E9DC]"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href={EVENT.instagram}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#C98A3E]/50 px-4 py-1.5 text-xs tracking-[0.05em] text-[#C98A3E] transition hover:bg-[#C98A3E]/10"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* ================================
          HERO
      ================================= */}
      <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
        <HeroStage />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 sm:pb-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs tracking-[0.3em] text-[#C98A3E]">
              KISARAZU / MITSUI OUTLET PARK
            </p>
            <h1
              className="mt-5 text-[13vw] leading-[0.95] font-semibold sm:text-[6.5rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              宵に、
              <br />
              乾杯を。
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#F2E9DC]/70 sm:text-base">
              買い物帰りの夕暮れどきに、よく冷えた一杯を。
              アウトレットの開放的な空の下で、チバビアフェストが木更津にやってきます。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#info"
                className="inline-flex items-center justify-center rounded-full bg-[#F2E9DC] px-6 py-3 text-sm font-medium text-[#14110E] transition hover:bg-white"
              >
                開催情報を見る
              </a>
              <a
                href="#lineup"
                className="inline-flex items-center justify-center rounded-full border border-[#F2E9DC]/30 px-6 py-3 text-sm font-medium text-[#F2E9DC] transition hover:bg-white/10"
              >
                ラインナップ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          ABOUT
      ================================= */}
      <section id="about" className="border-t border-white/10 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-[#C98A3E]">About</p>
            <h2
              className="mt-4 max-w-2xl text-2xl leading-snug sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              千葉みなとで育った屋外クラフトビールフェスが、
              初めて木更津へ。
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-loose text-[#F2E9DC]/70 sm:text-base">
              日本最大級のリゾート型アウトレット「三井アウトレットパーク 木更津」を舞台に、
              ショッピングの合間にふらりと立ち寄れるクラフトビールの祭典を開催します。
              海風の抜けるさんばしひろばとはまた違う、木更津ならではの夕景とともにお楽しみください。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================
          INFO
      ================================= */}
      <section id="info" className="border-t border-white/10 bg-[#1A1510] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-[#C98A3E]">Info</p>
            <h2
              className="mt-4 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              開催情報
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-16 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div>
                <div className="text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                  DATE
                </div>
                <div className="mt-3 text-lg">{EVENT.datesLabel}</div>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {EVENT.days.map((d) => (
                    <li
                      key={d.date}
                      className="flex items-baseline justify-between text-sm text-[#F2E9DC]/70"
                    >
                      <span>{d.date}</span>
                      <span>{d.time}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                  ADMISSION
                </div>
                <div className="mt-3 text-lg">{EVENT.price}</div>

                <div className="mt-10 text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                  VENUE
                </div>
                <div className="mt-3 text-lg">{EVENT.location}</div>
                <p className="mt-1 text-sm text-[#F2E9DC]/70">{EVENT.venueArea}</p>
                <p className="mt-2 text-sm text-[#F2E9DC]/60">{EVENT.address}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-sm border border-white/10">
                <iframe
                  title="map"
                  src={EVENT.mapEmbed}
                  className="h-72 w-full grayscale invert-[0.92] contrast-[0.9] sm:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================
          LINEUP(ブルワリー・フード)
      ================================= */}
      <section id="lineup" className="border-t border-white/10 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-[#C98A3E]">Lineup</p>
            <h2
              className="mt-4 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              出店ブルワリー・フード
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-loose text-[#F2E9DC]/70">
              千葉県内外から選りすぐりのブルワリーが木更津に集結。
              フードのラインナップは決まり次第、随時公開していきます。
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12">
              <div className="text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                BREWERIES
              </div>
              <div className="mt-5 grid gap-x-8 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                {BREWERIES.map((b) => (
                  <div
                    key={b.name}
                    className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3 text-sm"
                  >
                    <span>{b.name}</span>
                    <span className="text-[#F2E9DC]/50">{b.area}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-16">
              <div className="text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                FOOD
              </div>
              <div className="mt-5 flex items-center justify-between rounded-sm border border-dashed border-white/15 px-8 py-10 text-center">
                <p className="mx-auto text-sm tracking-[0.15em] text-[#F2E9DC]/40">
                  COMING SOON
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================
          ACCESS
      ================================= */}
      <section id="access" className="border-t border-white/10 bg-[#1A1510] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-[#C98A3E]">Access</p>
            <h2
              className="mt-4 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              アクセス
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div>
                <div className="text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                  車でお越しの方
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#F2E9DC]/70">
                  {EVENT.accessCar}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="text-xs tracking-[0.2em] text-[#F2E9DC]/50">
                  公共交通機関でお越しの方
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#F2E9DC]/70">
                  {EVENT.accessBus}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <a
              href={EVENT.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-full border border-[#F2E9DC]/30 px-6 py-3 text-sm font-medium text-[#F2E9DC] transition hover:bg-white/10"
            >
              Google Mapsで開く
            </a>
          </Reveal>
        </div>
      </section>

      {/* ================================
          CONTACT
      ================================= */}
      <section id="contact" className="border-t border-white/10 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-[#C98A3E]">Contact</p>
            <h2
              className="mt-4 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              最新情報・お問い合わせ
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-loose text-[#F2E9DC]/70">
              出店・協賛・取材に関するお問い合わせ、当日の最新情報は
              Instagramにて随時発信しています。
            </p>
            <a
              href={EVENT.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#F2E9DC] px-6 py-3 text-sm font-medium text-[#14110E] transition hover:bg-white"
            >
              {EVENT.instagramHandle} をフォロー
            </a>
          </Reveal>
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}
      <footer className="border-t border-white/10 py-10 text-center">
        <p className="text-xs text-[#F2E9DC]/40">
          © {new Date().getFullYear()} {EVENT.title} — {EVENT.organizer}
        </p>
      </footer>
    </main>
  );
}
