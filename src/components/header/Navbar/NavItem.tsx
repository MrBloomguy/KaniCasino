import { Link } from "react-router-dom";
import { NavLink } from "../gameLinks";
import NavFlare from "./NavFlare";

interface NavItemProps {
  link: NavLink;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ link, active }) => (
  <Link
    to={link.path}
    title={link.name}
    onClick={link.onClick}
    aria-current={active ? "page" : undefined}
    className={`group relative flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-semibold transition-colors 2xl:px-3 2xl:text-xs ${active ? "bg-[#55ff91]/[0.12]" : "hover:bg-white/[0.06]"}`}
  >
    <NavFlare active={active} />
    <span className={`relative transition-colors ${active ? "text-[#55ff91]" : "text-[#7f8ba7] group-hover:text-[#dbe5f5]"}`}>
      {link.icon}
    </span>
    <span
      className={`nav-label relative whitespace-nowrap transition-colors ${
        active ? "text-white" : "text-[#9aa6bc] group-hover:text-white"
      }`}
    >
      {link.name}
    </span>
    {link.badge}
  </Link>
);

export default NavItem;
