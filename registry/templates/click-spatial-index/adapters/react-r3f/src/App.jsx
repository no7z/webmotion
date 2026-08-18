import { useEffect, useRef, useState } from "react";
import Scene from "./Scene.jsx";
import config from "./template.config.js";
import { clamp, useSectionProgress, useSmoothScroll } from "./motion.js";

const text = (value, language) => typeof value === "string" ? value : value?.[language] || value?.zh || value?.en || "";

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

function Language({ language, setLanguage }) {
  return (
    <div className="language" aria-label="语言">
      <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
      <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中文</button>
    </div>
  );
}

function Header({ language, setLanguage }) {
  return (
    <header className="wm-header">
      <a href="#top" className="wm-mark" aria-label="返回顶部"><i />WM</a>
      <span>{config.code} / {text(config.name, language)}</span>
      <Language language={language} setLanguage={setLanguage} />
    </header>
  );
}

function Shell({ children, language, setLanguage, className = "" }) {
  return (
    <main id="top" lang={language === "zh" ? "zh-CN" : "en"} className={`experience locale-${language} ${className}`} data-template={config.id}>
      <Header language={language} setLanguage={setLanguage} />
      {children}
    </main>
  );
}

function Footer({ language }) {
  return (
    <footer className="wm-footer">
      <span>WEBMOTION / {config.code}</span>
      <strong>{text(config.footer, language)}</strong>
      <a href="#top">{language === "zh" ? "回到顶部" : "BACK TO TOP"} ↑</a>
    </footer>
  );
}

function SystemMorph({ language, setLanguage }) {
  const track = useRef(null);
  const progress = useSectionProgress(track);
  useSmoothScroll();
  const active = Math.min(2, Math.floor(progress * 3));
  return (
    <Shell language={language} setLanguage={setLanguage} className="system-morph">
      <section className="system-intro">
        <p>{config.kicker}</p>
        <h1>{text(config.hero, language)}</h1>
        <div><span>01</span><p>{text(config.intro, language)}</p></div>
      </section>
      <section className="system-track" ref={track} style={{ "--progress": progress }}>
        <div className="system-stage">
          <Scene type="system" progress={progress} />
          <div className="system-counter"><b>{String(active + 1).padStart(2, "0")}</b><span>/ 03</span></div>
          <p className="system-hint">SCROLL TO UNFOLD ↓</p>
        </div>
        <div className="system-chapters">
          {config.chapters.map((chapter, index) => (
            <article key={chapter.id} data-active={index === active}>
              <span>{chapter.id} / {chapter.label}</span>
              <h2>{text(chapter.title, language)}</h2>
              <p>{text(chapter.body, language)}</p>
              <strong>{chapter.metric}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="system-release">
        <span>RELEASE / ORDINARY INFORMATION</span>
        <h2>{text(config.releaseTitle, language)}</h2>
        <div className="system-ledger">{config.items.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong><p>{text(item.note, language)}</p></article>)}</div>
      </section>
      <Footer language={language} />
    </Shell>
  );
}

function FullscreenMachine({ language, setLanguage }) {
  const [progress, setProgress] = useState(0);
  const active = Math.min(2, Math.floor(clamp(progress) * 3));
  const stage = useRef(null);
  const state = config.chapters[active];
  return (
    <Shell language={language} setLanguage={setLanguage} className="fullscreen-machine">
      <section className="machine-shell">
        <div className="machine-scroller" ref={stage} tabIndex="0" aria-label={language === "zh" ? "在全屏舞台内滚动" : "Scroll inside the full-screen stage"} onScroll={(event) => {
          const node = event.currentTarget;
          setProgress(node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight));
        }}>
          <div className="machine-track">
            <div className="machine-sticky">
              <Scene type="instrument" progress={progress} active={active} />
              <div className="machine-copy" key={state.id}>
                <span>{state.id} / {state.label}</span>
                <h1>{text(state.title, language)}</h1>
                <p>{text(state.body, language)}</p>
              </div>
              <nav aria-label="状态进度">{config.chapters.map((chapter, index) => <button key={chapter.id} aria-current={index === active ? "step" : undefined} onClick={() => stage.current?.scrollTo({ top: index * stage.current.clientHeight, behavior: "smooth" })}>{chapter.id}</button>)}</nav>
              <p className="machine-instruction">{language === "zh" ? "在此舞台内滚动" : "SCROLL INSIDE THIS STAGE"} ↓</p>
              {active === 2 && <a className="machine-exit" href="#machine-after">{language === "zh" ? "退出舞台并阅读总结" : "EXIT STAGE AND READ"} ↘</a>}
            </div>
          </div>
        </div>
      </section>
      <section id="machine-after" className="machine-after"><span>EXPLICIT EXIT</span><h2>{text(config.releaseTitle, language)}</h2><p>{text(config.intro, language)}</p></section>
      <Footer language={language} />
    </Shell>
  );
}

function GuidedRoute({ language, setLanguage }) {
  const track = useRef(null);
  const progress = useSectionProgress(track);
  useSmoothScroll();
  const active = Math.min(2, Math.floor(progress * 3));
  return (
    <Shell language={language} setLanguage={setLanguage} className="guided-route">
      <section className="route-track" ref={track}>
        <div className="route-stage">
          <Scene type="route" progress={progress} />
          <div className="route-topline"><span>{config.kicker}</span><b>{Math.round(progress * 100).toString().padStart(3, "0")}%</b></div>
          <nav>{config.chapters.map((chapter, index) => <a href={`#route-${chapter.id}`} aria-current={active === index ? "step" : undefined} key={chapter.id}><b>{chapter.id}</b><span>{chapter.label}</span></a>)}</nav>
          <div className="route-line"><i style={{ height: `${progress * 100}%` }} /></div>
        </div>
        <div className="route-stops">
          {config.chapters.map((chapter, index) => (
            <article id={`route-${chapter.id}`} key={chapter.id} className={`route-stop route-stop-${index + 1}`}>
              <span>STOP {chapter.id} / {chapter.label}</span>
              <h1>{text(chapter.title, language)}</h1>
              <p>{text(chapter.body, language)}</p>
              <dl><div><dt>{language === "zh" ? "停留" : "DWELL"}</dt><dd>{chapter.metric}</dd></div><div><dt>{language === "zh" ? "视角" : "VIEW"}</dt><dd>{chapter.view}</dd></div></dl>
            </article>
          ))}
        </div>
      </section>
      <section className="route-arrival"><span>ARRIVAL / 03</span><h2>{text(config.releaseTitle, language)}</h2><p>{text(config.intro, language)}</p></section>
      <Footer language={language} />
    </Shell>
  );
}

function NarrativeHandoff({ language, setLanguage }) {
  const [active, setActive] = useState(0);
  useSmoothScroll();
  const item = config.items[active];
  return (
    <Shell language={language} setLanguage={setLanguage} className="narrative-handoff">
      <section className="handoff-story">
        <p>{config.kicker}</p><h1>{text(config.hero, language)}</h1>
        <div className="handoff-sequence">{config.chapters.map((chapter) => <article key={chapter.id}><span>{chapter.id}</span><h2>{text(chapter.title, language)}</h2><p>{text(chapter.body, language)}</p></article>)}</div>
        <a href="#spatial-index">{language === "zh" ? "故事结束，进入空间索引" : "STORY COMPLETE, ENTER THE INDEX"} ↓</a>
      </section>
      <section id="spatial-index" className="handoff-index">
        <header><span>CONTROL HANDOFF / CLICK</span><h2>{text(config.releaseTitle, language)}</h2></header>
        <div className="handoff-world"><Scene type="globe" active={active} />{config.items.map((entry, index) => <button key={entry.label} style={{ "--x": entry.x, "--y": entry.y }} aria-pressed={active === index} onClick={() => setActive(index)}><i /><span>{entry.label}</span></button>)}</div>
        <aside key={item.label}><span>{item.code}</span><h3>{text(item.title, language)}</h3><strong>{item.value}</strong><p>{text(item.note, language)}</p></aside>
      </section>
      <Footer language={language} />
    </Shell>
  );
}

function EditorialRhythm({ language, setLanguage }) {
  useSmoothScroll();
  return (
    <Shell language={language} setLanguage={setLanguage} className="editorial-rhythm">
      <section className="editorial-cover"><p>{config.kicker}</p><h1>{text(config.hero, language)}</h1><p>{text(config.intro, language)}</p></section>
      <figure className="editorial-field"><div><i /><i /><i /><span /></div><figcaption>FIG. 01 / DENSITY BEFORE DEPTH</figcaption></figure>
      <section className="editorial-spread"><span>{config.chapters[0].id} / ESSAY</span><h2>{text(config.chapters[0].title, language)}</h2><p>{text(config.chapters[0].body, language)}</p></section>
      <section className="editorial-embedded"><div><Scene type="embedded" /></div><article><span>SPATIAL INSERT / 01</span><h2>{text(config.chapters[1].title, language)}</h2><p>{text(config.chapters[1].body, language)}</p></article></section>
      <figure className="editorial-strip">{config.items.map((item, index) => <div key={item.label}><i data-tone={index} /><span>{item.label}</span></div>)}<figcaption>MEDIA CABINET / HORIZONTAL TOUCH, DOCUMENT VERTICAL</figcaption></figure>
      <blockquote>{text(config.chapters[2].title, language)}</blockquote>
      <section className="editorial-close"><span>03 / CREDITS</span><h2>{text(config.releaseTitle, language)}</h2><p>{text(config.chapters[2].body, language)}</p></section>
      <Footer language={language} />
    </Shell>
  );
}

function ProductDocument({ language, setLanguage }) {
  useSmoothScroll();
  return (
    <Shell language={language} setLanguage={setLanguage} className="product-document">
      <section className="product-hero">
        <div className="product-copy"><p>{config.kicker}</p><h1>{text(config.hero, language)}</h1><p>{text(config.intro, language)}</p><a href="#specifications">{language === "zh" ? "查看规格" : "VIEW SPECIFICATIONS"} ↓</a></div>
        <div className="product-object"><Scene type="arch" /><span>ONE SPATIAL EXPLANATION</span></div>
      </section>
      <section className="product-facts">{config.items.slice(0, 2).map((item) => <div key={item.label}><strong>{item.value}</strong><p>{text(item.note, language)}</p></div>)}</section>
      <section id="specifications" className="product-specs"><header><span>STANDARD DOCUMENT / 02</span><h2>{text(config.releaseTitle, language)}</h2></header><dl>{config.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><article><h3>{text(config.chapters[1].title, language)}</h3><p>{text(config.chapters[1].body, language)}</p></article></section>
      <Footer language={language} />
    </Shell>
  );
}

function ClickSpatialIndex({ language, setLanguage }) {
  const [level, setLevel] = useState(0);
  const [active, setActive] = useState(0);
  const rooms = config.items.filter((item) => item.level === level);
  const room = config.items[active] || rooms[0];
  useEffect(() => { if (!rooms.some((item) => config.items.indexOf(item) === active)) setActive(config.items.indexOf(rooms[0])); }, [level]);
  return (
    <Shell language={language} setLanguage={setLanguage} className="click-index">
      <section className="index-shell">
        <header><p>{config.kicker}<br />CLICK / NOT SCROLL</p><h1>{text(config.hero, language)}</h1></header>
        <nav aria-label="楼层">{[0, 1, 2].map((value) => <button key={value} aria-pressed={level === value} onClick={() => setLevel(value)}>{String(value + 1).padStart(2, "0")} / {language === "zh" ? "层" : "LEVEL"}</button>)}</nav>
        <div className="index-world"><Scene type="building" active={level} />{rooms.map((item) => { const index = config.items.indexOf(item); return <button className="room-pin" key={item.code} style={{ "--x": item.x, "--y": item.y }} aria-pressed={index === active} onClick={() => setActive(index)}><span>{item.code}</span><b>{text(item.title, language)}</b></button>; })}</div>
        <aside key={room.code}><span>{room.code} / LEVEL {level + 1}</span><h2>{text(room.title, language)}</h2><p>{text(room.note, language)}</p><dl><div><dt>{language === "zh" ? "面积" : "AREA"}</dt><dd>{room.value}</dd></div><div><dt>{language === "zh" ? "状态" : "STATUS"}</dt><dd>OPEN</dd></div></dl><button>{language === "zh" ? "打开空间档案" : "OPEN ROOM RECORD"} ↗</button></aside>
      </section>
    </Shell>
  );
}

function PrerenderedDocument({ language, setLanguage }) {
  useSmoothScroll();
  const publicAsset = (file) => `${import.meta.env.BASE_URL}${file}`;
  return (
    <Shell language={language} setLanguage={setLanguage} className="prerendered-document">
      <section className="media-cover"><p>{config.kicker}</p><h1>{text(config.hero, language)}</h1><p>{text(config.intro, language)}</p></section>
      <figure className="media-feature"><img src={publicAsset("media/hero.svg")} alt={text(config.mediaAlt, language)} /><figcaption>PRE-RENDERED SPATIAL PLATE / NO WEBGL RUNTIME</figcaption></figure>
      <section className="media-copy"><span>01 / INFRASTRUCTURE</span><h2>{text(config.chapters[0].title, language)}</h2><p>{text(config.chapters[0].body, language)}</p></section>
      <section className="media-pair"><figure><img src={publicAsset("media/detail-a.svg")} alt="预渲染空间剖面" /><figcaption>PLATE A / SECTION</figcaption></figure><figure><img src={publicAsset("media/detail-b.svg")} alt="预渲染材质细节" /><figcaption>PLATE B / MATERIAL</figcaption></figure></section>
      <section className="media-copy media-copy-reverse"><span>02 / OPERATIONS</span><h2>{text(config.chapters[1].title, language)}</h2><p>{text(config.chapters[1].body, language)}</p></section>
      <section className="media-specs"><p>TECHNICAL RECORD</p><dl>{config.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>
      <Footer language={language} />
    </Shell>
  );
}

const experiences = {
  "system-morph": SystemMorph,
  "fullscreen-state-machine": FullscreenMachine,
  "guided-camera-route": GuidedRoute,
  "narrative-spatial-handoff": NarrativeHandoff,
  "editorial-media-rhythm": EditorialRhythm,
  "spatial-product-document": ProductDocument,
  "click-spatial-index": ClickSpatialIndex,
  "prerendered-spatial-document": PrerenderedDocument,
};

export default function App() {
  const [language, setLanguage] = useState("zh");
  const [fontPreset, setFontPreset] = useState(initialFontPreset);
  const Experience = experiences[config.id];
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.fontPreset = fontPreset;
    try { window.localStorage.setItem("webmotion-font-preset", fontPreset); } catch { /* Storage is optional. */ }
  }, [fontPreset]);
  return (
    <>
      <Experience language={language} setLanguage={setLanguage} />
      <FontChoice language={language} value={fontPreset} onChange={setFontPreset} />
    </>
  );
}
