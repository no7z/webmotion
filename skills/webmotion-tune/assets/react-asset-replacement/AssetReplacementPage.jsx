import { useEffect, useMemo, useRef, useState } from "react";

const COPY = {
  zh: {
    eyebrow: "WEBMOTION / 本地开发工具",
    title: "内容替换",
    subtitle: "在左侧替换图片、文字与展示数字，右侧查看真实成品。颜色、布局和动画结构保持不动。",
    preview: "网站实时预览",
    openSite: "单独打开网站",
    replace: "选择替换文件",
    drop: "或拖放到这里",
    reset: "恢复默认",
    current: "当前文件",
    source: "来源",
    license: "许可",
    required: "必需",
    replacing: "正在替换…",
    saveText: "保存文字",
    savingText: "正在保存…",
    saveMetric: "保存指标",
    savingMetric: "正在保存…",
    amount: "数值",
    unit: "单位",
    languageValue: "当前编辑：中文内容",
    restored: "已恢复默认内容",
    replaced: "素材已替换，预览已刷新",
    textSaved: "文字已保存，预览已刷新",
    metricSaved: "指标已保存，预览已刷新",
    empty: "尚未声明可替换内容",
    error: "替换失败",
  },
  en: {
    eyebrow: "WEBMOTION / LOCAL DEVELOPMENT TOOL",
    title: "Content replacement",
    subtitle: "Replace images, copy, and display metrics on the left and inspect the real site on the right. Color, layout, and motion structure stay unchanged.",
    preview: "Live site preview",
    openSite: "Open site separately",
    replace: "Choose replacement",
    drop: "or drop a file here",
    reset: "Restore default",
    current: "Current file",
    source: "Source",
    license: "License",
    required: "Required",
    replacing: "Replacing…",
    saveText: "Save copy",
    savingText: "Saving…",
    saveMetric: "Save metric",
    savingMetric: "Saving…",
    amount: "Value",
    unit: "Unit",
    languageValue: "Editing: English content",
    restored: "Default content restored",
    replaced: "Asset replaced and preview refreshed",
    textSaved: "Copy saved and preview refreshed",
    metricSaved: "Metric saved and preview refreshed",
    empty: "No replaceable content is declared",
    error: "Replacement failed",
  },
};

function labelFor(slot, locale) {
  if (typeof slot.label === "string") return slot.label;
  return slot.label?.[locale] || slot.label?.en || slot.id;
}

function filename(value) {
  if (!value) return "—";
  return decodeURIComponent(value.split("?")[0].split("/").pop() || value);
}

function textValue(slot, locale) {
  return typeof slot.value === "string" ? slot.value : (slot.value?.[locale] || "");
}

function defaultTextValue(slot, locale) {
  return typeof slot.defaultValue === "string" ? slot.defaultValue : (slot.defaultValue?.[locale] || "");
}

function Preview({ slot }) {
  if (slot.kind === "image" || slot.kind === "logo") {
    return <img src={slot.value} alt="" />;
  }
  if (slot.kind === "video") {
    return <video src={slot.value} muted playsInline controls preload="metadata" />;
  }
  return (
    <div className={`wm-assets-file wm-assets-file--${slot.kind}`}>
      <span>{slot.kind === "model" ? "3D" : "Aa"}</span>
      <strong>{filename(slot.value)}</strong>
    </div>
  );
}

function AssetCard({ slot, locale, busy, onUpload, onReset }) {
  const t = COPY[locale];
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const submit = (file) => {
    if (file) onUpload(slot.id, file);
  };

  return (
    <article className="wm-assets-card">
      <div className="wm-assets-card__preview"><Preview slot={slot} /></div>
      <div className="wm-assets-card__body">
        <div className="wm-assets-card__heading">
          <div>
            <span className="wm-assets-kind">{slot.kind}</span>
            <h2>{labelFor(slot, locale)}</h2>
          </div>
          {slot.required && <span className="wm-assets-required">{t.required}</span>}
        </div>
        <dl>
          <div><dt>{t.current}</dt><dd title={slot.value}>{filename(slot.value)}</dd></div>
          {slot.source && <div><dt>{t.source}</dt><dd>{slot.source}</dd></div>}
          {slot.license && <div><dt>{t.license}</dt><dd>{slot.license}</dd></div>}
        </dl>
        <div
          className={`wm-assets-drop ${dragging ? "is-dragging" : ""}`}
          onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            submit(event.dataTransfer.files?.[0]);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={(slot.accept || []).join(",")}
            onChange={(event) => submit(event.target.files?.[0])}
          />
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
            {busy ? t.replacing : t.replace}
          </button>
          <span>{t.drop}</span>
        </div>
        <button className="wm-assets-reset" type="button" onClick={() => onReset(slot.id)} disabled={busy || slot.value === slot.defaultValue}>
          {t.reset}
        </button>
      </div>
    </article>
  );
}

function TextCard({ slot, locale, busy, onSave, onReset }) {
  const t = COPY[locale];
  const current = textValue(slot, locale);
  const original = defaultTextValue(slot, locale);
  const [draft, setDraft] = useState(current);

  useEffect(() => setDraft(current), [current, locale]);

  return (
    <article className="wm-assets-card wm-assets-card--text">
      <div className="wm-assets-card__body">
        <div className="wm-assets-card__heading">
          <div>
            <span className="wm-assets-kind">text</span>
            <h2>{labelFor(slot, locale)}</h2>
          </div>
          {slot.required && <span className="wm-assets-required">{t.required}</span>}
        </div>
        <div className="wm-assets-text-language">{t.languageValue}</div>
        <textarea
          value={draft}
          rows={slot.multiline === false ? 2 : 5}
          maxLength={slot.maxLength || 2000}
          onChange={(event) => setDraft(event.target.value)}
          aria-label={labelFor(slot, locale)}
        />
        <div className="wm-assets-text-actions">
          <span>{draft.length} / {slot.maxLength || 2000}</span>
          <div>
            <button className="wm-assets-reset" type="button" onClick={() => onReset(slot.id, locale)} disabled={busy || current === original}>
              {t.reset}
            </button>
            <button className="wm-assets-save" type="button" onClick={() => onSave(slot.id, locale, draft)} disabled={busy || draft === current}>
              {busy ? t.savingText : t.saveText}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function MetricCard({ slot, locale, busy, onSave, onReset }) {
  const t = COPY[locale];
  const current = slot.value || { amount: "", unit: "" };
  const original = slot.defaultValue || { amount: "", unit: "" };
  const [amount, setAmount] = useState(current.amount);
  const [unit, setUnit] = useState(current.unit);

  useEffect(() => {
    setAmount(current.amount);
    setUnit(current.unit);
  }, [current.amount, current.unit]);

  const changed = amount !== current.amount || unit !== current.unit;
  const atDefault = current.amount === original.amount && current.unit === original.unit;

  return (
    <article className="wm-assets-card wm-assets-card--metric">
      <div className="wm-assets-card__body">
        <div className="wm-assets-card__heading">
          <div>
            <span className="wm-assets-kind">metric</span>
            <h2>{labelFor(slot, locale)}</h2>
          </div>
          {slot.required && <span className="wm-assets-required">{t.required}</span>}
        </div>
        <div className="wm-assets-metric-fields">
          <label>
            <span>{t.amount}</span>
            <input value={amount} maxLength={slot.amountMaxLength || 32} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label>
            <span>{t.unit}</span>
            <input value={unit} maxLength={slot.unitMaxLength || 24} onChange={(event) => setUnit(event.target.value)} />
          </label>
        </div>
        <div className="wm-assets-text-actions">
          <span>{amount}{unit ? ` ${unit}` : ""}</span>
          <div>
            <button className="wm-assets-reset" type="button" onClick={() => onReset(slot.id)} disabled={busy || atDefault}>{t.reset}</button>
            <button className="wm-assets-save" type="button" onClick={() => onSave(slot.id, amount, unit)} disabled={busy || !changed}>{busy ? t.savingMetric : t.saveMetric}</button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AssetReplacementPage({ initialState }) {
  const [state, setState] = useState(initialState);
  const [locale, setLocale] = useState("zh");
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);
  const t = COPY[locale];
  const previewPath = state.previewPath || "/";
  const previewUrl = `${previewPath}${previewPath.includes("?") ? "&" : "?"}webmotionPreview=${previewKey}`;
  const groups = useMemo(() => {
    const result = new Map();
    for (const slot of state.slots || []) {
      const key = slot.group || "assets";
      if (!result.has(key)) result.set(key, []);
      result.get(key).push(slot);
    }
    return [...result.entries()];
  }, [state.slots]);

  const update = async (id, request) => {
    setBusyId(id);
    setNotice(null);
    try {
      const response = await request();
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || `${response.status}`);
      setState(body);
      setPreviewKey((value) => value + 1);
      const message = request.kind === "reset" ? t.restored : request.kind === "text" ? t.textSaved : request.kind === "metric" ? t.metricSaved : t.replaced;
      setNotice({ type: "success", text: message });
    } catch (error) {
      setNotice({ type: "error", text: `${t.error}: ${error.message}` });
    } finally {
      setBusyId("");
    }
  };

  const upload = (id, file) => {
    const request = () => fetch(`/__webmotion/assets/upload?id=${encodeURIComponent(id)}&filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: file,
    });
    request.kind = "upload";
    return update(id, request);
  };

  const saveText = (id, localeKey, value) => {
    const request = () => fetch("/__webmotion/assets/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, locale: localeKey, value }),
    });
    request.kind = "text";
    return update(id, request);
  };

  const saveMetric = (id, amount, unit) => {
    const request = () => fetch("/__webmotion/assets/metric", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, amount, unit }),
    });
    request.kind = "metric";
    return update(id, request);
  };

  const reset = (id, localeKey) => {
    const request = () => fetch("/__webmotion/assets/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, locale: localeKey }),
    });
    request.kind = "reset";
    return update(id, request);
  };

  return (
    <main className="wm-assets-shell">
      <header className="wm-assets-header">
        <div>
          <p>{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <span>{t.subtitle}</span>
        </div>
        <div className="wm-assets-locale" aria-label="Language">
          <button className={locale === "zh" ? "is-active" : ""} onClick={() => setLocale("zh")} type="button">中文</button>
          <button className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")} type="button">EN</button>
        </div>
      </header>

      {notice && <div className={`wm-assets-notice is-${notice.type}`}>{notice.text}</div>}

      <div className="wm-assets-layout">
        <section className="wm-assets-list" aria-label={t.title}>
          {groups.length === 0 && <div className="wm-assets-empty">{t.empty}</div>}
          {groups.map(([group, slots]) => (
            <div className="wm-assets-group" key={group}>
              <div className="wm-assets-group__title"><span>{group}</span><b>{String(slots.length).padStart(2, "0")}</b></div>
              {slots.map((slot) => (
                slot.kind === "text"
                  ? <TextCard key={slot.id} slot={slot} locale={locale} busy={busyId === slot.id} onSave={saveText} onReset={reset} />
                  : slot.kind === "metric"
                    ? <MetricCard key={slot.id} slot={slot} locale={locale} busy={busyId === slot.id} onSave={saveMetric} onReset={reset} />
                    : <AssetCard key={slot.id} slot={slot} locale={locale} busy={busyId === slot.id} onUpload={upload} onReset={reset} />
              ))}
            </div>
          ))}
        </section>

        <section className="wm-assets-preview">
          <div className="wm-assets-preview__bar">
            <div><i /><span>{t.preview}</span></div>
            <a href={previewPath} target="_blank" rel="noreferrer">{t.openSite} ↗</a>
          </div>
          <iframe key={previewKey} src={previewUrl} title={t.preview} />
        </section>
      </div>
    </main>
  );
}
