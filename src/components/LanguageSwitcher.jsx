
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSwitcher({ onLanguageChange }) {
  const [language, setLanguage] = useState("EN");
  const [open, setOpen] = useState(false);

  const chooseLanguage = (value) => {
    setLanguage(value);
    setOpen(false);
    onLanguageChange?.(value);
    document.documentElement.lang = value === "HI" ? "hi" : "en";
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex items-center gap-2 border border-[#002556]/15 px-4 py-3 text-sm font-medium text-[#002556] transition-colors duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A]"
      >
        <Globe size={17} />
        <span>{language === "EN" ? "English" : "हिंदी"}</span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-36 border border-[#002556]/10 bg-white p-1 shadow-xl">
          <button
            type="button"
            onClick={() => chooseLanguage("EN")}
            className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#FEC73A]/25 ${
              language === "EN"
                ? "font-semibold text-[#002556]"
                : "text-[#002556]/70"
            }`}
          >
            English
          </button>

          <button
            type="button"
            onClick={() => chooseLanguage("HI")}
            className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#FEC73A]/25 ${
              language === "HI"
                ? "font-semibold text-[#002556]"
                : "text-[#002556]/70"
            }`}
          >
            हिंदी
          </button>
        </div>
      )}
    </div>
  );
}

