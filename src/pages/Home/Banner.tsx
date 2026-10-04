import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BannerProps } from "./Types";
import i18n from "../../i18n";


const Banner: React.FC<BannerProps> = ({ left, right }) => {
  return (
    <div
      className={`relative w-full max-w-[1440px] h-[300px] sm:h-[360px] lg:h-[430px] rounded-2xl overflow-hidden bg-no-repeat flex bg-cover bg-center shadow-[0_20px_70px_rgba(0,0,0,0.35)]`}
      style={{ backgroundImage: `url(${left.image})` }}
    >
      <div className="flex items-center justify-center w-full ">
        <div className="flex max-w-7xl w-full h-full items-center justify-between px-5 sm:px-10 lg:px-16">
          {
            left.title !== "hide" ? (
              <div className="w-[min(78%,330px)] h-auto min-h-44 rounded-2xl border border-white/15 bg-[#101622]/85 backdrop-blur-md flex items-center justify-center shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-[#101622]/60 hover:bg-[#101622]/80 transition-all flex flex-col items-center justify-center px-6 py-7">
                  <div className="flex flex-col ">
                    <span className="text-lg font-semibold text-white text-start">
                      {left?.title}
                    </span>
                    <span className="text-base text-[#dfddef] text-left ">
                      {left?.description}
                    </span>
                    <Link to={left?.link}>
                      <div className="flex items-center gap-2 mt-2 text-[#70699b] hover:text-[#CF3464] transition-all ">
                        {i18n.t("home.goToPage")} <AiOutlineArrowRight />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null
          }
          <div className="flex justify-end w-full">
            {
              right
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
