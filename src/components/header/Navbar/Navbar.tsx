import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import UserContext from "../../../UserContext";
import MainButton from "../../MainButton";
import { clearTokens } from "../../../services/auth/authUtils";
import { me } from "../../../services/auth/auth";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineSell, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsHeartFill, BsListCheck, BsGraphUpArrow } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaBars, FaGift } from 'react-icons/fa';
import RightContent from "./RightContent";
import { useTranslation } from "react-i18next";
import GiftTag from "../GiftTag";
import GamesMenu from "./GamesMenu";
import NavItem from "./NavItem";
import { isCurrent } from "../navActive";
import { NavLink } from "../gameLinks";
import useGiftReady from "../useGiftReady";
import { showDaisu } from "../../daisu/tour/tourEvents";
import i18n from "../../../i18n";

interface Navbar {
  openNotifications: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Navbar> = ({ openNotifications, setOpenNotifications, openSidebar, setOpenSidebar }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { isLogged, toggleLogin, toogleUserData, userData, openUserFlow, toogleUserFlow } = useContext(UserContext);
  const giftReady = useGiftReady();
  const { i18n: translator } = useTranslation();
  const { pathname, search } = useLocation();

  const linksRef = useRef<HTMLDivElement | null>(null);

  const handleHover = () => {
    setIsHovering(!isHovering);
  };

  const toggleUserFlow = () => {
    toogleUserFlow(!openUserFlow);
  }

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const Logout = () => {
    clearTokens();
    toggleLogin(false);
    toogleUserData(null);
  };

  const getUserInfo = async () => {
    await me()
      .then((response: { data: any }) => {
        toogleUserData(response);
        setLoading(false);
      })
      .catch((error: any) => {
        // a 401 is already handled globally (session expired)
        if (error?.response?.status !== 401) {
          toast.error(i18n.t("header.pleaseLoginAgain"));
          Logout();
        }
        setLoading(false);
      });
  };


  // the games moved behind GamesMenu: ten of them across the bar stopped fitting in any
  // language. what stays here is everything that is not a game.
  const links: NavLink[] = [
    {
      name: i18n.t("nav.market"),
      path: "/marketplace",
      icon: <MdOutlineSell className="text-2xl" />,
    },
    {
      name: i18n.t("predictions.title"),
      path: "/predictions",
      icon: <BsGraphUpArrow className="text-2xl" />,
    },
    {
      name: i18n.t("nav.topFan"),
      path: "/fandom",
      icon: <BsHeartFill className="text-2xl" />,
    },
    {
      name: i18n.t("nav.dailyGift"),
      path: "/gift",
      icon: <FaGift className="text-2xl" />,
      badge: giftReady ? <GiftTag /> : undefined,
    },
    // missions live on the caller's own profile, so there is nowhere to send a guest
    ...(userData?.id ? [{
      name: i18n.t("nav.missions"),
      path: `/profile/${userData.id}?tab=missions`,
      icon: <BsListCheck className="text-2xl" />,
      // in daisu's beta the missions are hers, so the link opens her room over the page
      onClick: userData?.features?.daisu
        ? (e: React.MouseEvent) => {
            e.preventDefault();
            showDaisu("room", "nav_missions");
          }
        : undefined,
    }] : []),
    // only admins see the backoffice; the api refuses everyone else anyway
    ...(userData?.isAdmin ? [{
      name: i18n.t("nav.backoffice"),
      path: "/backoffice",
      icon: <MdOutlineAdminPanelSettings className="text-2xl" />,
    }] : [])
  ];


  // the labelled row needs 1430px to 1890px depending on the language, so no css breakpoint
  // fits them all. a class hides the labels, keeping the measurement out of react's render.
  useLayoutEffect(() => {
    const row = linksRef.current;
    if (!row) return;
    const fit = () => {
      row.classList.remove("nav-icons-only");
      if (row.scrollWidth > row.clientWidth) row.classList.add("nav-icons-only");
    };
    fit();
    const done = document.fonts?.ready;
    if (done) done.then(fit).catch(() => undefined);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [links.length, translator.language, giftReady]);

  useEffect(() => {

    if (isLogged == true) {
      getUserInfo();
      toogleUserFlow(false);
    }
  }, [isLogged]);



  return (
    <div className="w-full flex justify-center">
      <nav className="sticky top-3 z-40 w-[calc(100vw-1.5rem)] max-w-[1440px] rounded-2xl border border-white/[0.09] bg-[#0d1524]/[0.97] px-2 py-0.5 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:px-4 lg:px-5" aria-label="Primary navigation">
        <div className="flex min-h-8 items-center justify-between gap-2">
          <div className="flex items-center gap-3 xl:hidden">
            <button type="button" onClick={toggleSidebar} className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.05] text-slate-200 transition hover:bg-white/[0.1]" aria-label="Open menu" aria-expanded={openSidebar}>
              <FaBars className="text-base" />
            </button>
            <Link to="/" className="flex items-center gap-2" aria-label={i18n.t("nav.kanicasino")}>
              <img src="/images/logo.webp" alt="" className="size-8 object-contain" />
              <span className="hidden text-sm font-black tracking-tight text-white sm:block">{i18n.t("nav.kanicasino")}</span>
            </Link>
          </div>
          <div className="hidden xl:flex min-w-0 flex-1 items-center">
            <Link to="/" className="shrink-0">
              <div
                className="flex items-center gap-2 "
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
              >
                <img
                  src="/images/logo.webp"
                  alt={i18n.t("common.logo")}
                  className="size-8 object-contain drop-shadow-[0_0_18px_rgba(85,255,145,0.35)]"
                />
                <div className="hidden md:flex flex-col justify-center">
                  <div className="font-black text-lg tracking-tight text-white">
                    {i18n.t("nav.kanicasino")}
                  </div>

                  <div className="absolute">
                    <div
                      className={`flex items-center justify-center transition-all duration-300 text-[#9793ba]  text-[10px] ${isHovering === false
                        ? "opacity-0 -mt-2"
                        : "opacity-100 mt-10"
                        }`}
                    >
                      {i18n.t("nav.reimuFumo")}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            {
              <div
                ref={linksRef}
                className="ml-5 flex min-w-0 flex-1 items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.025] p-0.5 xl:ml-7 2xl:gap-1.5"
              >
                <GamesMenu />
                {links.map((link, index) => (
                  <NavItem key={index} link={link} active={isCurrent(pathname, search, link.path)} />
                ))}
              </div>
            }
          </div>

          <div className="flex items-center gap-2">
            {isLogged === true ? (
              <RightContent loading={loading} userData={userData}
                openNotifications={openNotifications} setOpenNotifications={setOpenNotifications}
                Logout={Logout} />
            ) : (
              <div className="flex items-center gap-2">
                <MainButton
                  text={i18n.t("nav.signIn")}
                  onClick={toggleUserFlow}
                  textSize="text-xs sm:text-sm"
                  type="success" />
              </div>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
