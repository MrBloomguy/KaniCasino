import { Link } from "react-router-dom";
import i18n from "../../i18n";

interface GameListingProps {
  name: string;
  description?: string;
}

const GameListing: React.FC<GameListingProps> = ({ name, description }) => {
  const games = [
    {
      id: "1",
      title: i18n.t("nav.crash"),
      image: "/images/crash/idle.gif",
      link: "/crash",
    },
    {
      id: "2",
      title: i18n.t("home.coinflip"),
      image: "/images/coinHeads.webp",
      link: "/coinflip",
    },
    {
      id: "3",
      title: i18n.t("nav.upgrade"),
      image: "/images/upgrade.webp",
      link: "/upgrade",
    },
    {
      id: "4",
      title: i18n.t("footer.slot"),
      image: "/images/slot/wild.webp",
      link: "/slot",
    },
    {
      id: "5",
      title: i18n.t("nav.caseBattles"),
      image: "/images/boo.webp",
      link: "/battles",
    },
    {
      id: "6",
      title: i18n.t("nav.plinko"),
      image: "/images/plinko.svg",
      link: "/plinko",
    },
    {
      id: "7",
      title: i18n.t("blackjack.blackjack"),
      image: "/images/blackjack.svg",
      link: "/blackjack",
    },
    {
      id: "8",
      title: i18n.t("dice.dice"),
      image: "/images/dice.svg",
      link: "/dice",
    },
    {
      id: "9",
      title: i18n.t("mines.mines"),
      image: "/images/mines.svg",
      link: "/mines",
    },
    {
      id: "10",
      title: i18n.t("hilo.hilo"),
      image: "/images/hilo.svg",
      link: "/hilo",
    },
    {
      id: "11",
      title: i18n.t("arcade.title"),
      image: "/images/arcade.svg",
      link: "/arcade",
      // the arcade is a door to other games, not one game to play
      cta: i18n.t("home.playNonGambling"),
    },
  ];
  return (
    <section className="w-full flex flex-col py-2 items-center">
      <div className="flex flex-col w-full max-w-[1600px] px-4">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
            {name}
          </h2>
        </div>
        {description && <div className="text-sm text-ink-muted pt-3">{description}</div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 pt-5">
          {games.map((item: any) => (
            <Link to={item.link} key={item.id}>
              <div className="relative flex flex-col items-center justify-end h-44 sm:h-52 md:h-56 bg-[#101622] border border-white/[0.07] rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-all hover:border-[#55ff91]/40 hover:bg-[#15221f] hover:-translate-y-1">
                <span className="absolute top-3 left-3 text-xs font-semibold text-ink-soft bg-surface-raised px-2 py-0.5 rounded">
                  {item.title}
                </span>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-24 md:h-32 w-full object-contain"
                />
                <div className="text-sm font-semibold text-center pt-3">{item.cta || i18n.t("home.playGame", { game: item.title })}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameListing;
