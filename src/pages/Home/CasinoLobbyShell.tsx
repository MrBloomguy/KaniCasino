import { ReactNode } from "react";
import { Link } from "react-router-dom";

const menu = ["Promotions", "Bonuses", "Bonus Store", "VIP Club", "Tournaments", "Casino"];
const activity = [
  ["Chat Rain", "Rain rewards are falling across the lobby"],
  ["marlong", "Bro I just hit bonus round on Fruit Mines"],
  ["LuckyTurtle", "Anyone else getting crazy RTP on Neon Crash today?"],
  ["pengu123", "daily wheel gave me 25% boost"],
  ["pixel_penguin", "opened 3 winter chests — got two rare ones"],
  ["WildCard", "this lobby is looking clean tonight"],
];

export default function CasinoLobbyShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-[#080d21] text-white">
      <div className="mx-auto flex w-full max-w-[1500px] gap-3 px-2 py-2 lg:px-3">
        <aside className="hidden w-[174px] shrink-0 flex-col rounded-xl bg-[#151b3d] p-3 lg:flex">
          <div className="mb-5 flex items-center gap-2 px-2 text-lg font-black tracking-tight">
            <span className="text-[#2cc6ff]">PENGU</span><span className="rounded bg-[#2cc6ff] px-1 text-[#071227]">BET</span>
          </div>
          <nav className="flex flex-col gap-1 text-[11px] font-semibold text-slate-300">
            {menu.map((item, index) => (
              <Link key={item} to={index === 5 ? "/" : "#"} className={`rounded-md px-3 py-2.5 transition-colors hover:bg-[#202958] ${item === "Casino" ? "bg-[#202958] text-white" : ""}`}>
                <span className="mr-2 text-[#5f87ff]">{["✦", "◈", "▣", "♛", "♜", "◉"][index]}</span>{item}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2 pt-8 text-[11px] text-slate-400">
            <div className="rounded-md bg-[#202958] px-3 py-2">❖ Winter rewards</div>
            <div className="flex gap-2 px-2 text-base"><span>◉</span><span>◎</span><span>𝕏</span></div>
            <div className="rounded-md bg-[#202958] px-3 py-2">◉ Live Support</div>
            <div className="border-t border-white/10 px-2 pt-3">Info</div>
            <div className="px-2">EN⌄</div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-3 flex h-12 items-center justify-between rounded-xl bg-[#111833] px-4 shadow-lg">
            <div className="flex items-center gap-2 text-base font-black lg:hidden"><span className="text-[#2cc6ff]">PENGU</span><span className="rounded bg-[#2cc6ff] px-1 text-[#071227]">BET</span></div>
            <div className="hidden text-sm font-bold tracking-[0.2em] text-slate-300 lg:block">CASINO LOBBY</div>
            <div className="flex items-center gap-2 text-xs"><div className="hidden rounded-md bg-[#080d21] px-3 py-2 text-slate-400 sm:block">⌕ Search</div><span className="rounded-md bg-[#202958] px-2 py-1">◐ 1,500 ⊕</span><span className="rounded-full bg-[#2cc6ff] px-2 py-1 text-[#071227]">P</span></div>
          </div>
          {children}
        </section>

        <aside className="hidden w-[190px] shrink-0 rounded-xl bg-[#111833] p-3 xl:block">
          <div className="mb-3 flex items-center justify-between text-[10px] font-bold text-slate-300"><span>30 Players Online</span><span className="size-2 rounded-full bg-[#2cc6ff]" /></div>
          <div className="flex flex-col gap-3">
            {activity.map(([name, message]) => <div key={name} className="rounded-lg bg-[#192145] p-2 text-[10px] leading-relaxed text-slate-400"><div className="mb-1 font-bold text-white">{name} <span className="text-[#2cc6ff]">●</span></div>{message}</div>)}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function LobbyPromo({ title, copy, image }: { title: string; copy: string; image: string }) {
  return <div className="relative min-h-[150px] overflow-hidden rounded-xl bg-gradient-to-r from-[#087fd6] to-[#20c8ec] p-5 shadow-xl"><div className="relative z-10 max-w-[55%]"><div className="mb-2 inline-flex rounded bg-white px-2 py-1 text-[9px] font-bold text-[#172048]">WELCOME BONUS</div><h2 className="text-xl font-black uppercase leading-tight sm:text-2xl">{title}</h2><p className="mt-1 text-[11px] text-white/80">{copy}</p><button className="mt-3 rounded bg-[#15275d] px-3 py-1.5 text-[10px] font-bold">Claim now</button></div><img src={image} alt="" className="absolute right-[-3%] bottom-0 h-[115%] w-[52%] object-contain object-bottom" /></div>;
}

export function LobbyStrip({ children }: { children: ReactNode }) { return <div className="grid grid-cols-3 gap-2">{children}</div>; }
export function LobbyPill({ children }: { children: ReactNode }) { return <div className="rounded-lg bg-[#202958] px-2 py-2 text-center text-[10px] font-bold text-slate-200">{children}</div>; }
export function LobbySection({ title, children }: { title: string; children: ReactNode }) { return <section><div className="mb-2 flex items-center justify-between"><h2 className="text-xs font-black uppercase tracking-wide text-white">✦ {title}</h2><span className="text-slate-400">‹ ›</span></div>{children}</section>; }
export function LobbyGameGrid({ children }: { children: ReactNode }) { return <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{children}</div>; }
export function LobbyGame({ image, title }: { image: string; title: string }) { return <div className="overflow-hidden rounded-lg bg-[#151b3d] shadow-lg"><img src={image} alt={title} className="aspect-square w-full object-cover" /><div className="truncate px-2 py-1.5 text-[9px] font-bold text-slate-300">{title}</div></div>; }
export function LobbyFeatureGrid({ children }: { children: ReactNode }) { return <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</div>; }
export function LobbyFeature({ title, image }: { title: string; image: string }) { return <div className="relative min-h-[100px] overflow-hidden rounded-xl bg-gradient-to-r from-[#087fd6] to-[#20c8ec] p-3"><div className="relative z-10 max-w-[58%] text-sm font-black uppercase">{title}</div><img src={image} alt="" className="absolute right-0 bottom-0 h-full w-[55%] object-contain object-bottom" /></div>; }
