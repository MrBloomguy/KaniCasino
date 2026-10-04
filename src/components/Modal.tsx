import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import i18n from "../i18n";
import { play } from "../services/sound/sound";

interface ModalProps {
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ children, open, setOpen, width = "600px" }) => {
  // open/close sounds; the ref skips the very first render so a modal that mounts
  // closed stays silent
  const wasOpen = useRef(open);
  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    play(open ? "ui.open" : "ui.close");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  if (!open) return null;

  /* function to close when clicking outside modal */
  const handleClose = (e: any) => {
    if (e.target.id === "wrapped") {
      setOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020711]/80 p-3 backdrop-blur-md sm:p-6"
      id="wrapped"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="relative flex max-h-[min(88vh,760px)] w-full flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0d1524] text-white shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        aria-label={i18n.t("common.modal")}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#55ff91]/[0.08] to-transparent" />
        <button
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.06] text-xl text-slate-300 transition hover:bg-white/[0.12] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#55ff91]/60"
          onClick={() => setOpen(false)}
          aria-label={i18n.t("common.closeModal")}
        >
          <IoMdClose />
        </button>
        <div className="relative min-h-0 overflow-y-auto p-5 pt-14 sm:p-7 sm:pt-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
