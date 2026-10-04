import { useState, useEffect, useMemo } from "react";
import Banner from "./Banner";
import CaseListing from "./CaseListing";
import CaseField from "./CaseField";
import CategoryBar from "./CategoryBar";
import GameListing from "./GamesListing";
import Leaderboard from "./Leaderboard";
import DiscordWidget from "./DiscordWidget";
import TopFanPromo from "./TopFanPromo";
import { groupCasesByCategory } from "./groupCases";
import { recommendedCases } from "./recommendedCases";
import { isNewCase } from "../../utils/caseAge";
import {
  getCases,
  getMostOpenedCases,
  MostOpenedCase,
} from "../../services/cases/CaseServices";
import { toast } from "react-toastify";
import { BannerProps } from "./Types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import i18n from "../../i18n";
import CasinoLobbyShell, { LobbyFeature, LobbyFeatureGrid, LobbyGame, LobbyGameGrid, LobbyPill, LobbyPromo, LobbySection, LobbyStrip } from "./CasinoLobbyShell";

// its own namespace, so a category literally called "Recommended" cannot take the anchor
const TOP_CASES_ID = "top-cases";

const Home = () => {
  const [cases, setCases] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mostOpened, setMostOpened] = useState<MostOpenedCase[]>([]);
  const [mostOpenedLoading, setMostOpenedLoading] = useState<boolean>(true);

  const getNewCases = async () => {
    setLoading(true);
    try {
      const response = await getCases();
      setCases(response);
    } catch {
      setCases([]);
      toast.error(i18n.t("home.errorWhileConnectingTo"));
    }
    setLoading(false);
  };

  useEffect(() => {
    getNewCases();
    // the section hides itself if nothing has been opened yet, so a failure is quiet
    getMostOpenedCases(5)
      .then(setMostOpened)
      .catch(() => setMostOpened([]))
      .finally(() => setMostOpenedLoading(false));
  }, []);

  const groups = useMemo(() => (loading ? [] : groupCasesByCategory(cases)), [cases, loading]);

  const recommended = useMemo(() => recommendedCases(cases, mostOpened), [cases, mostOpened]);
  // the pins come from the full list, so the row waits for both rather than reshuffling
  const recommendedLoading = loading || mostOpenedLoading;

  const sections = useMemo(
    () => [
      ...(recommended.length > 0 ? [{ id: TOP_CASES_ID, label: i18n.t("home.recommended") }] : []),
      ...groups.map((group) => ({ id: group.id, label: group.category })),
    ],
    [groups, recommended.length]
  );

  const BannerContent: BannerProps[] = [
    {
      left: {
        image: "/images/marisaBanner.webp",
        title: i18n.t("home.crashGame"),
        description: i18n.t("home.dontBurnFlyHigh"),
        link: "/crash",
      },
      right: (
        <div>
          <img src="/images/crashBannerTitle.webp" alt={i18n.t("home.upgrade")} />
        </div>
      ),
    },
    {
      left: {
        image: "/images/banners/blue-archive-plate.webp",
        title: i18n.t("home.blueArchive"),
        description: i18n.t("home.fourCasesFromKivotos"),
        link: "/case/6a5afb4e445211422b946280",
      },
      right: (
        <div>
          <img
            src="/images/banners/blue-archive-lockup.webp"
            alt={i18n.t("home.blueArchiveCases")}
          />
        </div>
      ),
    },
    {
      left: {
        image: "/images/banners/blackjack-plate.webp",
        title: i18n.t("home.blackjack"),
        description: i18n.t("home.hitStandAndBeat"),
        link: "/blackjack",
      },
      right: (
        <div>
          <img src="/images/banners/blackjack-lockup.webp" alt={i18n.t("blackjack.blackjack")} />
        </div>
      ),
    },
    {
      left: {
        image: "/images/banners/uma-musume-plate.webp",
        title: i18n.t("home.umaMusume"),
        description: i18n.t("home.fiveCasesOneWinner"),
        link: "/case/6a6029119cfaa53787df47d0",
      },
      right: (
        <div>
          <img
            src="/images/banners/uma-musume-lockup.webp"
            alt={i18n.t("home.umaMusumeCases")}
          />
        </div>
      ),
    },
    {
      left: {
        image: "/images/banners/plinko-plate.webp",
        title: i18n.t("home.plinko"),
        description: i18n.t("home.dropTheBallAnd"),
        link: "/plinko",
      },
      right: (
        <div>
          <img src="/images/banners/plinko-lockup.webp" alt={i18n.t("nav.plinko")} />
        </div>
      ),
    },
    {
      left: {
        image: "/images/banners/counter-strike-plate.webp",
        title: i18n.t("home.counterStrike"),
        description: i18n.t("home.openTheCasesCollect"),
        link: "/case/646ca0a4e9b0e208f5ddcfa6",
      },
      right: (
        <div>
          <img
            src="/images/banners/counter-strike-lockup.webp"
            alt={i18n.t("home.counterStrikeCases")}
          />
        </div>
      ),
    },
    {
      left: {
        image: "/images/homeBanner.webp",
        //if title is hide, it will hide the information component on the left side
        title: "hide",
        description: i18n.t("home.tryYourLuckNow"),
        link: "/slots",
      },
      right: (
        <div className="hidden 2xl:flex 2xl:mr-36">
          <img src="/images/KANICASINO.webp" alt={i18n.t("home.kanicasino")} />
        </div>
      ),
    },
  ];

  return (
    <CasinoLobbyShell>
      <main className="w-full flex justify-center px-0 pb-12">
        <div className="flex w-full max-w-[930px] flex-col gap-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.5fr_1fr]">
            <LobbyPromo title="Claim up to 300% and 100FS" copy="Start your journey with extra rewards" image="/images/homeBanner.webp" />
            <LobbyPromo title="Get weekly cashback" copy="10% back weekly" image="/images/marisaBanner.webp" />
          </div>
          <LobbyStrip><LobbyPill>◉ Daily Wheel</LobbyPill><LobbyPill>♛ VIP Club</LobbyPill><LobbyPill>✦ Bonuses</LobbyPill></LobbyStrip>
          <div className="flex gap-2 overflow-x-auto rounded-lg bg-[#111833] p-2 text-[10px] font-bold text-slate-400"><span className="rounded bg-[#202958] px-3 py-1 text-white">All</span><span className="px-3 py-1">Popular</span><span className="px-3 py-1">Slots</span><span className="px-3 py-1">Live</span><span className="px-3 py-1">Crash</span><span className="px-3 py-1">Providers</span></div>
          <LobbySection title="Original Games"><LobbyGameGrid>{[["/images/crash/idle.gif", "Crash"], ["/images/coinHeads.webp", "Roulette"], ["/images/slot/wild.webp", "Slots"], ["/images/mines.svg", "Mines"], ["/images/dice.svg", "Dice"]].map(([image, title]) => <LobbyGame key={title} image={image} title={title} />)}</LobbyGameGrid></LobbySection>
          <LobbySection title="Popular Games"><LobbyGameGrid>{[["/images/banners/blackjack-plate.webp", "3 Witch Pots"], ["/images/boo.webp", "Le Viking"], ["/images/upgrade.webp", "Mummy's Mines"], ["/images/banners/plinko-plate.webp", "Thunderkick"], ["/images/homeBanner.webp", "Dog House"]].map(([image, title]) => <LobbyGame key={title} image={image} title={title} />)}</LobbyGameGrid></LobbySection>
          <LobbyFeatureGrid><LobbyFeature title="Daily missions" image="/images/homeBanner.webp" /><LobbyFeature title="Top winter games" image="/images/marisaBanner.webp" /></LobbyFeatureGrid>
          <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          interval={7000}
          stopOnHover={false}
        >
          {BannerContent.map((_item, index) => (
            <Banner key={index} left={_item.left} right={_item.right} />
          ))}
        </Carousel>
        <CategoryBar sections={sections} loading={recommendedLoading} />

        {/* the skeleton reserves the row while loading so the sections below do not jump */}
        <CaseField>
          {recommendedLoading ? (
            <CaseListing name={i18n.t("home.recommendedCases")} loading cases={[]} />
          ) : (
            recommended.length > 0 && (
              <CaseListing
                name={i18n.t("home.recommendedCases")}
                description={i18n.t(
                  isNewCase(recommended[0]._id) ? "home.newCasesThenMostOpened" : "home.whatEveryoneIsOpening"
                )}
                cases={recommended}
                sectionId={TOP_CASES_ID}
                eager
                ordinal={1}
              />
            )
          )}
        </CaseField>

        <GameListing name={i18n.t("home.ourGames")} />

        <Leaderboard aside={<DiscordWidget />} />

        <TopFanPromo />

        <CaseField>
          {loading ? (
            <CaseListing name="Cases" loading cases={[]} />
          ) : (
            groups.map((group, index) => (
              <CaseListing
                key={group.category}
                name={`${group.category} Cases`}
                cases={group.cases}
                sectionId={group.id}
                collapsible
                ordinal={index + (recommended.length > 0 ? 2 : 1)}
              />
            ))
          )}
        </CaseField>
        </div>
      </main>
    </CasinoLobbyShell>
  );
};

export default Home;
