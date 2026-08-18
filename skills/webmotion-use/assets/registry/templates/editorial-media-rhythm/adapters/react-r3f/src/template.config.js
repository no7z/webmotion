export default {
  "id": "editorial-media-rhythm",
  "code": "E07",
  "name": {
    "zh": "编辑媒体节奏",
    "en": "Editorial Media Rhythm"
  },
  "displayName": "Editorial Media Rhythm",
  "category": "editorial-media-choreography",
  "port": 4197,
  "scene": true,
  "summary": "Typography, media density, whitespace, and one bounded spatial insert create depth without a persistent 3D object.",
  "purpose": "Build a premium editorial information page when continuous 3D would distract from reading.",
  "composition": "Large typographic cover, full-bleed media field, essay spread, bounded spatial insert, touchable media cabinet, quote, and credits each use different density.",
  "interaction": "Ordinary document flow remains primary. Media and type enter through native scrolling; one embedded 3D figure answers a local question and then releases the reader.",
  "semantic3d": "The bounded spatial insert demonstrates material continuity only where the essay requires spatial evidence.",
  "invariants": [
    "No persistent 3D object follows the reader through the document.",
    "At least five distinct density rhythms are visible.",
    "The embedded 3D figure has a local information job and bounded duration.",
    "The document remains complete if the spatial insert fails.",
    "Mobile turns the media cabinet into native horizontal touch without affecting document scroll.",
    "Reduced motion preserves the same editorial sequence."
  ],
  "inputs": {
    "wheel": "Native document flow only.",
    "touch": "Native vertical document flow plus horizontal touch inside the media cabinet.",
    "keyboard": "Document links and captions remain sequentially navigable.",
    "pointer": "No required pointer-specific motion."
  },
  "responsive": {
    "desktop": "Editorial spreads use asymmetric columns and broad whitespace.",
    "mobile": "Spreads serialize; the media cabinet becomes a horizontal touch strip."
  },
  "capabilities": [
    "editorial-density-choreography",
    "bounded-spatial-insert",
    "ordinary-document-flow",
    "asymmetric-spreads",
    "touch-media-cabinet",
    "no-persistent-scene",
    "reduced-motion-document"
  ],
  "assetSlots": [
    "hero-media",
    "editorial-copy",
    "media-cabinet",
    "spatial-insert",
    "captions"
  ],
  "kicker": "IMPRINT / MATERIAL CULTURE",
  "hero": {
    "zh": "高级感来自节奏，不来自持续占屏。",
    "en": "Depth comes from rhythm, not permanent occupation."
  },
  "intro": {
    "zh": "文字、媒体和留白改变密度。3D 只在一个局部问题需要它时出现。",
    "en": "Type, media, and whitespace change density. 3D appears only when one local question needs it."
  },
  "releaseTitle": {
    "zh": "编辑顺序本身，就是空间。",
    "en": "The editorial sequence is the space."
  },
  "footer": {
    "zh": "让密度编舞，而不是让对象跟随。",
    "en": "Choreograph density, not a following object."
  },
  "chapters": [
    {
      "id": "01",
      "title": {
        "zh": "先用尺度建立论点。",
        "en": "Begin with scale as an argument."
      },
      "body": {
        "zh": "标题、图像和正文的比例变化先于任何空间特效。",
        "en": "The ratio between title, image, and body changes before any spatial effect appears."
      }
    },
    {
      "id": "02",
      "title": {
        "zh": "空间图只回答一个局部问题。",
        "en": "The spatial figure answers one local question."
      },
      "body": {
        "zh": "这段实时对象解释表面连续性，离开章节后不再跟随。",
        "en": "This realtime object explains surface continuity and does not follow beyond the section."
      }
    },
    {
      "id": "03",
      "title": {
        "zh": "最后让信用和证据占满版面。",
        "en": "End by giving credits and evidence the full field."
      },
      "body": {
        "zh": "收束不是另一个特效，而是信息权重的最后一次变化。",
        "en": "Closure is not another effect; it is the final change in information weight."
      }
    }
  ],
  "items": [
    {
      "label": "FORM"
    },
    {
      "label": "SURFACE"
    },
    {
      "label": "LIGHT"
    },
    {
      "label": "TYPE"
    },
    {
      "label": "CREDIT"
    }
  ]
};
