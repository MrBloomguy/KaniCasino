import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { IoGameControllerOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { gameLinks } from "../gameLinks";
import NavFlare from "./NavFlare";
import i18n from "../../../i18n";

const GAP = 12;

// ten games no longer fit across the bar, so they live behind one trigger. two columns,
// because a single column of ten reaches further down the page than the bar is tall.
const GamesMenu = () => {
  const [open, setOpen] = useState(false);
  const [at, setAt] = useState({ top: 0, left: 0 });
  const trigger = useRef<HTMLButtonElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const games = gameLinks();
  const here = games.some((game) => pathname.startsWith(game.path));

  useEffect(() => setOpen(false), [pathname]);

  // the panel is portalled to the body because the navbar's clip-path would cut off
  // anything hanging below it, fixed positioning included
  useLayoutEffect(() => {
    if (!open || !trigger.current) return;
    const box = trigger.current.getBoundingClientRect();
    setAt({ top: box.bottom + GAP, left: box.left });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const away = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !panel.current?.contains(target)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const shut = () => setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", key);
    window.addEventListener("resize", shut);
    window.addEventListener("scroll", shut, true);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", shut);
      window.removeEventListener("scroll", shut, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`group relative flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-semibold transition-colors focus:outline-none 2xl:px-3 2xl:text-xs ${here || open ? "bg-[#55ff91]/[0.12]" : "hover:bg-white/[0.06]"}`}
      >
        <NavFlare active={here} lit={open} />
        <span className={`relative transition-colors ${here || open ? "text-[#55ff91]" : "text-[#7f8ba7] group-hover:text-[#dbe5f5]"}`}>
          <IoGameControllerOutline className="text-2xl" />
        </span>
        <span
          className={`nav-label relative whitespace-nowrap transition-colors ${
            here ? "text-white" : "text-ink-soft group-hover:text-white"
          }`}
        >
          {i18n.t("nav.games")}
        </span>
        <FiChevronDown className={`relative text-[#625F7E] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        createPortal(
          <div
            ref={panel}
            style={{ top: at.top, left: at.left }}
            className="notched fixed z-[120] grid grid-cols-2 gap-1.5 rounded-2xl border border-white/[0.1] bg-[#101b2d] p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
          >
            {games.map((game) => (
              <Link
                to={game.path}
                key={game.path}
                className={`notched-sm flex items-center gap-3 whitespace-nowrap px-3 py-2.5 text-sm transition-all hover:bg-[#281D3F] ${
                  pathname.startsWith(game.path) ? "bg-[#281D3F] text-white" : "text-[#C9C6DE]"
                }`}
              >
                <span className="text-[#625F7E]">{game.icon}</span>
                {game.name}
              </Link>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default GamesMenu;
