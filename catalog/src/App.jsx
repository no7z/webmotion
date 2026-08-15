import { useEffect, useMemo, useRef, useState } from "react";
import registry from "./generated/templates.json";

const FONT_PRESETS = [
  { id: "editorial", label: "编辑体 / Editorial" },
  { id: "modern", label: "现代体 / Modern" },
  { id: "humanist", label: "人文体 / Humanist" },
  { id: "geometric", label: "几何体 / Geometric" },
  { id: "rounded", label: "圆体 / Rounded" },
  { id: "fashion", label: "时尚体 / Fashion" },
];

const initialFontPreset = () => {
  try {
    const saved = window.localStorage.getItem("webmotion-font-preset");
    return FONT_PRESETS.some((preset) => preset.id === saved) ? saved : "editorial";
  } catch {
    return "editorial";
  }
};

function FontChoice({ value, onChange }) {
  return (
    <label className="font-choice">
      <span>字体</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label="选择字体风格">
        {FONT_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
      </select>
    </label>
  );
}

const capabilityLabels = {
  "continuous-scroll-state": "连续滚动状态",
  "foreground-persistent-subject": "前景主体常驻",
  "semantic-3d-chapters": "语义化 3D 章节",
  "protected-copy-zones": "文字保护区",
  "independent-mobile-trajectory": "独立手机轨迹",
  "reduced-motion-fallback": "减少动态效果",
  "2d-to-3d-terrain-morph": "2D 转 3D 地形",
  "vertical-to-horizontal-traverse": "纵向转横向旅程",
  "shared-camera-boundary-keyframes": "共享相机边界",
  "delta-damped-camera-and-gaze": "相机与视线缓动",
  "distinct-editorial-chapter-compositions": "差异化章节构图",
  "semantic-procedural-3d": "程序化语义 3D",
  "bilingual-content": "中英双语",
};

const availabilityLabels = {
  adapter: "可直接使用",
  "contract-only": "交互契约",
  draft: "草稿",
  retired: "已归档",
};

const assetLabels = {
  "product-model": "产品模型",
  "product-poster": "产品海报",
  "chapter-media": "章节图片或视频",
  "brand-fonts": "品牌字体",
  "source-image": "源头图片",
  "traverse-image": "横向旅程图片",
  "closing-image": "结尾图片",
  "chapter-copy": "章节文案",
  "camera-trajectories": "相机轨迹",
};

const formatBytes = (bytes) => {
  if (!bytes) return "—";
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
};

function Mark() {
  return (
    <span className="mark" aria-label="WebMotion">
      <span>W</span><span>M</span>
    </span>
  );
}

function TemplatePreview({ template, eager = false }) {
  return (
    <div className={`template-preview template-preview-${template.order}`}>
      {template.preview ? (
        <img src={template.preview} alt={`${template.name} 模板预览`} loading={eager ? "eager" : "lazy"} />
      ) : (
        <div className="preview-fallback" aria-hidden="true"><i /><i /><i /></div>
      )}
      <span className="preview-index">{String(template.order).padStart(2, "0")}</span>
      <span className={`availability availability-${template.availability}`}>
        <i />{availabilityLabels[template.availability] || template.availability}
      </span>
      <div className="preview-grid" aria-hidden="true" />
    </div>
  );
}

function TemplateCard({ template, onOpen }) {
  return (
    <article className="template-card">
      <button className="card-hit" onClick={() => onOpen(template)} aria-label={`查看 ${template.name} 模板详情`}>
        <TemplatePreview template={template} eager={template.order === 1} />
        <div className="card-copy">
          <div className="card-meta">
            <span>{template.experienceSpec ? `${template.experienceSpec} · ` : ""}{template.category.replaceAll("-", " ")}</span>
            <span>v{template.version}</span>
          </div>
          <h2>{template.name}</h2>
          <p>{template.summary}</p>
          <div className="card-footer">
            <span>{template.capabilities.length} 项交互能力</span>
            <span>查看详情 <span className="card-arrow" aria-hidden="true">↗</span></span>
          </div>
        </div>
      </button>
      {template.demo?.url && (
        <a className="demo-link" href={template.demo.url} target="_blank" rel="noreferrer">
          <span>{template.demo.label || "打开实例"}</span>
          <i aria-hidden="true">↗</i>
        </a>
      )}
    </article>
  );
}

function TemplateDetail({ template, onClose }) {
  const closeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!template) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [template, onClose]);

  if (!template) return null;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(template.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="detail-shell" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <button className="detail-backdrop" onClick={onClose} aria-label="关闭模板详情" />
      <section className="detail-panel">
        <header className="detail-nav">
          <Mark />
          <span>{String(template.order).padStart(2, "0")} / {String(registry.templates.length).padStart(2, "0")}</span>
          <button ref={closeRef} className="close-button" onClick={onClose}>关闭 <span>×</span></button>
        </header>

        <div className="detail-hero">
          <TemplatePreview template={template} eager />
          <div className="detail-title-block">
            <span>{template.experienceSpec ? `${template.experienceSpec} · ` : ""}{template.category.replaceAll("-", " ")} · v{template.version}</span>
            <h2 id="detail-title">{template.name}</h2>
            <p>{template.identity.informationGoal || template.summary}</p>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <section>
              <span className="section-label">体验身份 / EXPERIENCE</span>
              <h3>这个模板真正复用的是什么？</h3>
              <p>{template.identity.composition}</p>
              <p>{template.identity.interaction}</p>
            </section>

            <section>
              <span className="section-label">交互能力 / CAPABILITIES</span>
              <div className="capability-list">
                {template.capabilities.map((capability) => (
                  <span key={capability}>{capabilityLabels[capability] || capability.replaceAll("-", " ")}</span>
                ))}
              </div>
            </section>

            <section>
              <span className="section-label">必须保持 / INVARIANTS</span>
              <ol className="invariant-list">
                {template.invariants.slice(0, 6).map((invariant) => <li key={invariant}>{invariant}</li>)}
              </ol>
            </section>
          </div>

          <aside className="detail-aside">
            <div className="metric-grid">
              <div><span>状态</span><strong>{availabilityLabels[template.availability]}</strong></div>
              <div><span>适配器</span><strong>{template.availableAdapters.length || 0}</strong></div>
              <div><span>QA 门禁</span><strong>{template.qaGateCount}</strong></div>
              <div><span>模板包</span><strong>{formatBytes(template.packageBytes)}</strong></div>
            </div>

            <section className="aside-section">
              <span className="section-label">适配器 / ADAPTERS</span>
              {template.adapters.map((adapter) => (
                <div className="adapter-row" key={adapter.id}>
                  <span>{adapter.id}</span>
                  <em>{adapter.available ? "AVAILABLE" : "PLANNED"}</em>
                </div>
              ))}
            </section>

            <section className="aside-section">
              <span className="section-label">可替换内容 / SLOTS</span>
              <ul className="slot-list">
                {template.assetSlots.map((slot) => (
                  <li key={slot.id}><span>{assetLabels[slot.id] || slot.id}</span><em>{slot.required ? "必需" : "可选"}</em></li>
                ))}
              </ul>
            </section>

            <button className="prompt-button" onClick={copyPrompt}>
              <span>{copied ? "已复制调用词" : "复制 Agent 调用词"}</span>
              <i aria-hidden="true">{copied ? "✓" : "↗"}</i>
            </button>
            {template.demo?.url && (
              <a className="detail-demo-link" href={template.demo.url} target="_blank" rel="noreferrer">
                <span>{template.demo.label || "打开实例网站"}</span>
                <i aria-hidden="true">↗</i>
              </a>
            )}
            <p className="license-note">{template.license} · {template.fileCount} 个校验文件</p>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [fontPreset, setFontPreset] = useState(initialFontPreset);

  useEffect(() => {
    document.documentElement.dataset.fontPreset = fontPreset;
    try { window.localStorage.setItem("webmotion-font-preset", fontPreset); } catch { /* Storage is optional. */ }
  }, [fontPreset]);

  const visibleTemplates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return registry.templates.filter((template) => {
      const filterMatches = filter === "all" || template.availability === filter;
      const haystack = [template.experienceSpec, template.name, template.id, template.category, template.summary, ...template.capabilities].filter(Boolean).join(" ").toLowerCase();
      return filterMatches && (!normalized || haystack.includes(normalized));
    });
  }, [filter, query]);

  const adapterCount = registry.templates.filter((template) => template.availability === "adapter").length;

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回顶部"><Mark /><span>WEBMOTION</span></a>
        <div className="header-center">TEMPLATE LIBRARY <span>β</span></div>
        <a className="header-count" href="#catalog">{String(registry.templates.length).padStart(2, "0")} 模板 ↓</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div>
          <p className="hero-kicker">INTERACTION-FIRST WEB SYSTEMS / 交互优先的网页系统</p>
          <h1>把交互，<br />做成可复用的<span>模板。</span></h1>
          <div className="hero-footer">
            <p>不是皮肤，不是框架脚手架。每个模板都保存构图、滚动映射、3D 语义、手机重构和验收标准。</p>
            <div className="hero-stats">
              <div><strong>{String(registry.templates.length).padStart(2, "0")}</strong><span>模板总数</span></div>
              <div><strong>{String(adapterCount).padStart(2, "0")}</strong><span>可用适配器</span></div>
              <div><strong>{registry.registryVersion}</strong><span>注册表版本</span></div>
            </div>
          </div>
        </section>

        <section className="catalog-section" id="catalog">
          <div className="catalog-heading">
            <span>01 / CATALOG</span>
            <h2>选择一种体验语法</h2>
            <p>先按最终效果选择，再决定 React、Vue 或原生 Three.js。</p>
          </div>

          <div className="catalog-tools">
            <label className="search-field">
              <span>搜索</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="名称、能力或类型" />
              <i aria-hidden="true">⌕</i>
            </label>
            <div className="filter-group" aria-label="模板状态筛选">
              {[
                ["all", "全部"],
                ["adapter", "可直接使用"],
                ["contract-only", "交互契约"],
              ].map(([value, label]) => (
                <button key={value} className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>

          <div className="template-grid">
            {visibleTemplates.map((template) => <TemplateCard key={template.id} template={template} onOpen={setSelected} />)}
          </div>

          {!visibleTemplates.length && (
            <div className="empty-state"><strong>没有匹配的模板</strong><button onClick={() => { setQuery(""); setFilter("all"); }}>清除筛选</button></div>
          )}
        </section>

        <section className="catalog-footer">
          <div><Mark /><span>WEBMOTION / {new Date(registry.generatedAt).getFullYear()}</span></div>
          <p>框架可以替换，体验契约必须保留。</p>
          <a href="#top">回到顶部 ↑</a>
        </section>
      </main>

      <TemplateDetail template={selected} onClose={() => setSelected(null)} />
      <FontChoice value={fontPreset} onChange={setFontPreset} />
    </>
  );
}
