export default {
  "id": "prerendered-spatial-document",
  "code": "E10",
  "name": {
    "zh": "预渲染空间文档",
    "en": "Pre-rendered Spatial Document"
  },
  "displayName": "Pre-rendered Spatial Document",
  "category": "prerendered-spatial-media-document",
  "port": 4200,
  "scene": false,
  "summary": "Pre-rendered spatial plates provide visual scale and atmosphere inside an ordinary corporate information document with no WebGL runtime.",
  "purpose": "Deliver reliable spatial storytelling when realtime interaction adds cost but no additional information value.",
  "composition": "Large typographic cover, one pre-rendered hero plate, text spread, two spatial detail plates, operations copy, and technical record follow normal document flow.",
  "interaction": "Native document scrolling and ordinary image loading only. Media can be replaced by video, image sequences, or responsive pictures without a realtime scene.",
  "semantic3d": "Pre-rendered plates communicate infrastructure scale, sectional organization, and material detail while DOM content carries claims and specifications.",
  "invariants": [
    "No WebGL canvas or realtime scene runtime is included.",
    "Every spatial plate has descriptive alternative text and a caption.",
    "The document remains understandable if media fails to load.",
    "Media does not capture wheel, touch, or keyboard input.",
    "Mobile uses responsive crops and serialized copy.",
    "Reduced motion removes optional playback while preserving still plates."
  ],
  "inputs": {
    "wheel": "Native document scroll only.",
    "touch": "Native touch document flow only.",
    "keyboard": "Standard document navigation.",
    "pointer": "Optional playback controls for replaceable video slots."
  },
  "responsive": {
    "desktop": "Full-width plates alternate with asymmetric editorial spreads.",
    "mobile": "Plates use authored responsive crops and all spreads serialize."
  },
  "capabilities": [
    "zero-webgl-runtime",
    "prerendered-spatial-media",
    "ordinary-document-flow",
    "responsive-picture-slots",
    "media-failure-readable",
    "mobile-responsive-crops",
    "reduced-motion-stills"
  ],
  "assetSlots": [
    "hero-plate",
    "section-plate",
    "material-plate",
    "document-copy",
    "technical-records"
  ],
  "kicker": "NORTH ARRAY / OPERATIONS",
  "hero": {
    "zh": "空间可以预渲染，信息不能被烘焙进图片。",
    "en": "Space may be pre-rendered. Information must not be baked into imagery."
  },
  "intro": {
    "zh": "当用户只需要理解尺度、剖面和材质，稳定媒体比实时场景更合适；所有结论仍由文档承担。",
    "en": "When readers only need scale, section, and material, stable media is a better carrier than realtime graphics; the document still carries every conclusion."
  },
  "releaseTitle": {
    "zh": "稳定媒体负责尺度，文档负责决策。",
    "en": "Stable media carries scale. The document carries decisions."
  },
  "footer": {
    "zh": "没有 WebGL，也可以有空间高级感。",
    "en": "Spatial sophistication without WebGL."
  },
  "mediaAlt": {
    "zh": "大型清洁能源设施的预渲染鸟瞰图",
    "en": "Pre-rendered aerial view of a large clean-energy facility"
  },
  "chapters": [
    {
      "id": "01",
      "title": {
        "zh": "用一幅总图建立基础设施尺度。",
        "en": "Use one master plate to establish infrastructure scale."
      },
      "body": {
        "zh": "重复单元、维护通道和周边能源设施在同一画面中可比较。",
        "en": "Repeated units, service routes, and surrounding energy systems remain comparable in one frame."
      }
    },
    {
      "id": "02",
      "title": {
        "zh": "再用剖面解释运营关系。",
        "en": "Then use sections to explain operations."
      },
      "body": {
        "zh": "局部图回答冷却、检修和材料寿命，不承担导航。",
        "en": "Detail plates answer cooling, service, and material-life questions without becoming navigation."
      }
    }
  ],
  "items": [
    {
      "label": "CAPACITY",
      "value": "280 MW"
    },
    {
      "label": "MODULES",
      "value": "640"
    },
    {
      "label": "UPTIME",
      "value": "99.2%"
    },
    {
      "label": "WATER",
      "value": "CLOSED LOOP"
    }
  ]
};
