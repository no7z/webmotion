import { useEffect, useMemo, useState } from "react";
import PerfumeScene from "./PerfumeScene";
import { experience } from "./experience.config";
import { useChapterScroll } from "./useChapterScroll";

const FONT_PRESETS = [
  { id: "editorial", zh: "编辑体", en: "Editorial" },
  { id: "modern", zh: "现代体", en: "Modern" },
  { id: "humanist", zh: "人文体", en: "Humanist" },
  { id: "geometric", zh: "几何体", en: "Geometric" },
  { id: "rounded", zh: "圆体", en: "Rounded" },
  { id: "fashion", zh: "时尚体", en: "Fashion" },
];

const initialFontPreset = () => {
  try {
    const saved = window.localStorage.getItem("webmotion-font-preset");
    return FONT_PRESETS.some((preset) => preset.id === saved) ? saved : "editorial";
  } catch {
    return "editorial";
  }
};

function FontChoice({ language, value, onChange }) {
  return (
    <label className="font-choice">
      <span>{language === "zh" ? "字体" : "TYPE"}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={language === "zh" ? "选择字体风格" : "Choose typography style"}>
        {FONT_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset[language]}</option>)}
      </select>
    </label>
  );
}

function useReducedMotion() {
  const forced = new URLSearchParams(window.location.search).get("motion") === "reduce";
  const [reduced, setReduced] = useState(forced);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(forced || media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [forced]);
  return reduced;
}

export default function App() {
  const [language, setLanguage] = useState("zh");
  const [fontPreset, setFontPreset] = useState(initialFontPreset);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const scrollToChapter = useChapterScroll(reducedMotion);
  const copy = useMemo(() => experience.copy[language], [language]);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.fontPreset = fontPreset;
    try { window.localStorage.setItem("webmotion-font-preset", fontPreset); } catch { /* Storage is optional. */ }
  }, [fontPreset]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(window.scrollY / maxScroll, 1));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeChapter = Math.min(Math.floor(progress / 0.235), 3);

  return (
    <main className={`locale-${language}`} lang={language === "zh" ? "zh-CN" : "en"} data-reduced-motion={reducedMotion}>
      <a className="skip-link" href="#story">Skip to story</a>
      <div className="noise" />
      <PerfumeScene reducedMotion={reducedMotion} />

      <header className="topbar">
        <a className="brand" href="#story" aria-label="Éclat 07 home">
          <span className="brand-mark">07</span>
          <span>{experience.brand}</span>
        </a>
        <nav aria-label="Story chapters">
          {copy.nav.map((item, index) => (
            <a
              key={item}
              href={`#chapter-${index + 1}`}
              className={activeChapter === index ? "active" : ""}
              onClick={scrollToChapter}
            >
              {String(index + 1).padStart(2, "0")}
              <span>{item}</span>
            </a>
          ))}
        </nav>
        <div className="language" aria-label="Language">
          <button aria-pressed={language === "zh"} className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中</button>
          <button aria-pressed={language === "en"} className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
        </div>
      </header>

      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div id="story" className="story">
        {copy.chapters.map((chapter, index) => {
          const Heading = index === 0 ? "h1" : "h2";
          return (
            <section
              id={`chapter-${index + 1}`}
              className={`chapter chapter-${index + 1} ${index % 2 ? "align-right" : "align-left"}`}
              data-chapter-snap
              key={chapter.eyebrow}
            >
              <div className="orb" aria-hidden="true" />
              <div className="chapter-word" aria-hidden="true">{chapter.word}</div>
              <article className="copy-card">
                <p className="eyebrow">{chapter.eyebrow}</p>
                <Heading>{chapter.heading}</Heading>
                <div className="copy-line" />
                <p className="body">{chapter.body}</p>
                <p className="fact">{chapter.fact}</p>
              </article>
              {index === 0 && (
                <div className="scroll-cue" aria-hidden="true">
                  <span>{copy.scroll}</span>
                  <i />
                </div>
              )}
            </section>
          );
        })}

        <footer>
          <p className="eyebrow">WEBMOTION / E2E 001</p>
          <h2>{copy.footerTitle}</h2>
          <p>{copy.footerBody}</p>
          <div className="test-badge">
            <span>foreground-product</span>
            <span>contract-only</span>
            <span>React + R3F test implementation</span>
          </div>
        </footer>
      </div>
      <FontChoice language={language} value={fontPreset} onChange={setFontPreset} />
    </main>
  );
}
