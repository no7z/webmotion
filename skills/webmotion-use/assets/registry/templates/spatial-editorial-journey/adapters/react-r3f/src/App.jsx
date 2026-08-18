import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import WorldScene from "./WorldScene.jsx";
import { chapters, cloudTraverse, ui } from "./content.js";
import { templateAssets } from "./assets.config.js";

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

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (start, end, value) => {
  const x = clamp01((value - start) / (end - start));
  return x * x * (3 - 2 * x);
};

function useJourneyScroll(progressRef, setProgress, setActive) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastPaintedProgress = -1;
    let lastActive = -1;

    const updateStages = () => {
      const viewport = window.innerHeight;
      let nearest = { index: 0, distance: Infinity };
      document.querySelectorAll("[data-stage]").forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, rect.height - viewport);
        const local = clamp01(-rect.top / travel);
        const entering = clamp01((viewport - rect.top) / viewport);
        const leaving = clamp01(rect.bottom / viewport);
        const presence = index === 0
          ? 1 - smoothstep(0.58, 0.96, local)
          : smoothstep(0.08, 0.92, entering) * smoothstep(0.05, 0.55, leaving);
        section.style.setProperty("--local", local.toFixed(4));
        section.style.setProperty("--presence", presence.toFixed(4));
        section.style.setProperty("--track-x", `${(-300 * local).toFixed(3)}vw`);
        progressRef.current.stages[section.id || `stage-${index}`] = { local, presence };
        const distance = Math.abs(rect.top + rect.height / 2 - viewport / 2);
        if (distance < nearest.distance) nearest = { index, distance };
      });
      if (nearest.index !== lastActive) {
        lastActive = nearest.index;
        setActive(Math.max(0, nearest.index - 1));
      }
    };

    const paintProgress = (progress) => {
      progressRef.current.global = progress;
      document.documentElement.style.setProperty("--journey-progress", progress.toFixed(5));
      if (Math.abs(progress - lastPaintedProgress) > 0.0015) {
        lastPaintedProgress = progress;
        setProgress(progress);
      }
      updateStages();
    };

    if (reduceMotion) {
      const handleNativeScroll = () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        paintProgress(clamp01(window.scrollY / maxScroll));
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      window.addEventListener("resize", handleNativeScroll);
      handleNativeScroll();
      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
        window.removeEventListener("resize", handleNativeScroll);
      };
    }

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    const handleScroll = ({ progress }) => paintProgress(progress);

    lenis.on("scroll", handleScroll);
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    updateStages();

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [progressRef, setActive, setProgress]);

  return lenisRef;
}

function LanguageSwitch({ locale, onChange }) {
  return (
    <div className="language-switch" aria-label="Language / 语言">
      <button className={locale === "en" ? "is-active" : ""} onClick={() => onChange("en")}>EN</button>
      <button className={locale === "zh" ? "is-active" : ""} onClick={() => onChange("zh")}>中文</button>
    </div>
  );
}

function FontChoice({ locale, value, onChange }) {
  return (
    <label className="font-choice">
      <span>{locale === "zh" ? "字体" : "TYPE"}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={locale === "zh" ? "选择字体风格" : "Choose typography style"}>
        {FONT_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset[locale]}</option>)}
      </select>
    </label>
  );
}

function MapOverlay({ open, locale, active, onClose, onJump }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`map-overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={ui[locale].route} aria-hidden={!open}>
      <div className="map-field">
        <div className="map-rings" />
        <svg className="map-river" viewBox="0 0 700 900" role="img" aria-label={ui[locale].route}>
          <path d="M420 40 C300 140 490 190 360 290 C210 410 450 450 310 560 C190 670 360 715 150 860" />
          {chapters.map((chapter, index) => {
            const points = [[420, 40], [365, 215], [290, 375], [345, 510], [250, 635], [260, 755], [150, 860]];
            return <circle key={chapter.id} cx={points[index][0]} cy={points[index][1]} r={index === active ? 13 : 7} />;
          })}
        </svg>
        <p className="map-coordinate">06°18′N — 74°09′W</p>
      </div>
      <aside className="map-index">
        <div className="map-index-head">
          <div>
            <span>{ui[locale].routeSub}</span>
            <h2>{ui[locale].route}</h2>
          </div>
          <button ref={closeRef} className="close-map" onClick={onClose}>{ui[locale].close} ×</button>
        </div>
        <ol>
          {chapters.map((chapter, index) => (
            <li key={chapter.id} className={index === active ? "is-active" : ""}>
              <button onClick={() => onJump(chapter.id)}>
                <span className="map-number">{chapter.number}</span>
                <span>{chapter.short[locale]}</span>
                <span className="map-arrow">↘</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

function Chapter({ chapter, index, locale }) {
  if (index === 1) return <HorizontalCloudChapter chapter={chapter} locale={locale} />;

  const copy = chapter.body[locale];
  const isEditorial = index === 1 || index === 3;
  const isImageField = index === 0 || index === 5;
  return (
    <section id={chapter.id} className={`chapter chapter-${chapter.tone}`} data-stage style={{ "--chapter-index": index }}>
      <div className="chapter-sticky">
        {isImageField && (
          <figure className={`chapter-image chapter-image-${index}`}>
            <img src={index === 0 ? templateAssets.source : templateAssets.estuary} alt="" />
            <figcaption>{ui[locale].imageCaption}</figcaption>
          </figure>
        )}

        {index === 0 && (
          <div className="depth-transition" aria-hidden="true">
            <span>2D IMAGE</span><i><b /></i><span>DEPTH FIELD</span><i><b /></i><span>3D TERRAIN</span>
          </div>
        )}

        {index === 1 && (
          <figure className="forest-image">
            <img src={templateAssets.traverse} alt="" />
            <figcaption>{ui[locale].fieldNote} · 02:17</figcaption>
          </figure>
        )}

        {index === 2 && <div className="coordinate-grid" aria-hidden="true" />}

        <div className={`chapter-copy ${isEditorial ? "chapter-copy-editorial" : ""}`}>
          <div className="chapter-meta">
            <span>{chapter.number}</span>
            <span>{chapter.kicker[locale]}</span>
          </div>
          <h2>{chapter.title[locale]}</h2>
          <div className="chapter-rule" />
          <div className="chapter-detail">
            <strong>{chapter.stat}</strong>
            <p>{copy}</p>
          </div>
        </div>

        {index === 3 && (
          <div className="species-archive" aria-label={ui[locale].archive}>
            <span>01 / GLASS FIN</span>
            <span>02 / RIVER MOTH</span>
            <span>03 / SAND OTTER</span>
            <span>04 / NIGHT HERON</span>
          </div>
        )}

        {index === 4 && <div className="rain-gauge"><span>07.2</span><small>MM / H</small></div>}
        <span className="chapter-side-label">{chapter.short[locale]} — {chapter.number}</span>
      </div>
    </section>
  );
}

function HorizontalCloudChapter({ chapter, locale }) {
  const panels = cloudTraverse[locale];
  return (
    <section id={chapter.id} className="chapter chapter-forest chapter-horizontal" data-stage>
      <div className="chapter-sticky horizontal-sticky">
        <div className="horizontal-track">
          <article className="horizontal-panel horizontal-panel-intro">
            <div className="traverse-copy">
              <div className="chapter-meta"><span>02</span><span>{panels[0].label}</span></div>
              <h2>{panels[0].title}</h2>
              <p>{panels[0].body}</p>
            </div>
            <span className="terrain-coordinate">06°18′N<br />2,940 M</span>
          </article>

          <article className="horizontal-panel horizontal-panel-photo">
            <figure>
              <img src={templateAssets.traverse} alt="" />
              <figcaption>{ui[locale].fieldNote} · TRANSECT 02</figcaption>
            </figure>
            <div className="traverse-copy traverse-copy-small">
              <span className="traverse-label">{panels[1].label}</span>
              <h2>{panels[1].title}</h2>
              <p>{panels[1].body}</p>
            </div>
          </article>

          <article className="horizontal-panel horizontal-panel-data">
            <div className="mist-sample" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="traverse-copy traverse-copy-data">
              <span className="traverse-label">{panels[2].label}</span>
              <strong>72%</strong>
              <h2>{panels[2].title}</h2>
              <p>{panels[2].body}</p>
            </div>
          </article>

          <article className="horizontal-panel horizontal-panel-outro">
            <div className="traverse-copy">
              <span className="traverse-label">{panels[3].label}</span>
              <h2>{panels[3].title}</h2>
              <p>{panels[3].body}</p>
            </div>
            <div className="ridge-exit">→</div>
          </article>
        </div>
        <div className="horizontal-progress" aria-hidden="true">
          <span>02 / 01</span><i><b /></i><span>02 / 04</span>
        </div>
        <span className="chapter-side-label">{chapter.short[locale]} — 02</span>
      </div>
    </section>
  );
}

export default function App() {
  const [locale, setLocale] = useState("zh");
  const [fontPreset, setFontPreset] = useState(initialFontPreset);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);
  const progressRef = useRef({ global: 0, stages: {} });
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const lenisRef = useJourneyScroll(progressRef, setProgress, setActive);
  const copy = ui[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.fontPreset = fontPreset;
    try { window.localStorage.setItem("webmotion-font-preset", fontPreset); } catch { /* Storage is optional. */ }
  }, [fontPreset]);

  useEffect(() => {
    if (mapOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [mapOpen, lenisRef]);

  const jumpTo = (id) => {
    setMapOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    lenisRef.current?.scrollTo(target, { offset: 4, duration: reducedMotion ? 0 : 1.8 });
  };

  return (
    <main className={`app locale-${locale}`}>
      <WorldScene progressRef={progressRef} reducedMotion={reducedMotion} />

      <header className="site-header">
        <a className="mark" href="#top" aria-label="Following the Current">
          <span>W</span><span>M</span>
        </a>
        <span className="header-title">FOLLOWING THE CURRENT</span>
        <button className="map-button" onClick={() => setMapOpen(true)}>{copy.map} <i>↘</i></button>
      </header>

      <nav className="progress-rail" aria-label="Journey progress">
        <span className="progress-icon">△</span>
        <div className="progress-track"><i style={{ transform: `scaleY(${progress})` }} /></div>
        {chapters.map((chapter, index) => (
          <button key={chapter.id} className={index === active ? "is-active" : ""} onClick={() => jumpTo(chapter.id)} aria-label={chapter.short[locale]}>
            <span />
          </button>
        ))}
        <span className="progress-icon">≈</span>
      </nav>

      <section id="top" className="hero" data-stage>
        <div className="hero-sticky">
          <p className="eyebrow">WEBMOTION / FIELD STUDY 01</p>
          <p className="hero-project">{copy.project}</p>
          <h1>{locale === "zh" ? <>循流<br />而行</> : <>FOLLOWING<br />THE CURRENT</>}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="scroll-prompt"><span>{copy.begin}</span><i /></div>
        </div>
      </section>

      {chapters.map((chapter, index) => <Chapter key={chapter.id} chapter={chapter} index={index} locale={locale} />)}

      <footer className="site-footer">
        <p>{copy.credits}</p>
        <span>WEBMOTION / 2026</span>
      </footer>

      <FontChoice locale={locale} value={fontPreset} onChange={setFontPreset} />
      <LanguageSwitch locale={locale} onChange={setLocale} />
      <MapOverlay open={mapOpen} locale={locale} active={active} onClose={() => setMapOpen(false)} onJump={jumpTo} />
    </main>
  );
}
