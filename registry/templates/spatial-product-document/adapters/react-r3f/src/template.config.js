export default {
  "id": "spatial-product-document",
  "code": "E08",
  "name": {
    "zh": "空间增强产品文档",
    "en": "Spatial Product Document"
  },
  "displayName": "Spatial Product Document",
  "category": "spatially-enhanced-document",
  "port": 4198,
  "scene": true,
  "summary": "One spatial product hero explains a structural promise, then yields to an ordinary specifications and evidence document.",
  "purpose": "Use 3D to clarify one product structure without making every section depend on a persistent canvas.",
  "composition": "A split but asymmetric hero pairs product copy with one contained spatial object. Facts, specifications, and evidence continue as conventional DOM sections.",
  "interaction": "Ordinary document flow. The hero object uses bounded ambient motion and one CTA scrolls to standard specifications.",
  "semantic3d": "The spatial arch explains how one continuous scan captures a full structure instead of isolated samples.",
  "invariants": [
    "The spatial object is contained to the hero and does not follow into specifications.",
    "The hero makes one structural product claim visible.",
    "Facts and specifications are standard searchable DOM content.",
    "The page remains useful when WebGL is unavailable.",
    "Mobile places the spatial object before the copy and preserves the CTA.",
    "Reduced motion leaves a stable product pose."
  ],
  "inputs": {
    "wheel": "Native document scroll only.",
    "touch": "Native touch document flow.",
    "keyboard": "CTA and document structure remain keyboard accessible.",
    "pointer": "Optional bounded product tilt; no semantic state depends on pointer."
  },
  "responsive": {
    "desktop": "Asymmetric copy and contained spatial object share the hero.",
    "mobile": "Spatial object is placed first, then copy and standard facts serialize."
  },
  "capabilities": [
    "bounded-spatial-product-hero",
    "standard-document-flow",
    "semantic-structure-visualization",
    "searchable-specifications",
    "webgl-fallback",
    "mobile-hero-reorder",
    "reduced-motion-stable-pose"
  ],
  "assetSlots": [
    "product-model",
    "product-copy",
    "key-facts",
    "specifications",
    "fallback-poster"
  ],
  "kicker": "ARC ONE / STRUCTURAL CAPTURE",
  "hero": {
    "zh": "一次空间扫描，解释完整结构。",
    "en": "One spatial scan explains the complete structure."
  },
  "intro": {
    "zh": "首屏只用 3D 解释完整拱形捕获；随后页面回到价格、规格和证据。",
    "en": "The hero uses 3D only to explain full-arch capture; pricing, specifications, and evidence then return to ordinary document flow."
  },
  "releaseTitle": {
    "zh": "空间解释结束，产品文档继续。",
    "en": "The spatial explanation ends. The product document continues."
  },
  "footer": {
    "zh": "一处空间证据，完整普通文档。",
    "en": "One spatial proof. A complete ordinary document."
  },
  "chapters": [
    {
      "id": "01",
      "title": {
        "zh": "在首屏理解整体结构。",
        "en": "Understand the complete structure in the hero."
      },
      "body": {
        "zh": "连续拱形比一组孤立图片更清楚地解释捕获范围。",
        "en": "A continuous arch explains capture coverage more clearly than isolated images."
      }
    },
    {
      "id": "02",
      "title": {
        "zh": "所有购买信息保持普通可读。",
        "en": "Keep every buying fact ordinarily readable."
      },
      "body": {
        "zh": "扫描范围、精度、时间、兼容性和维护条款都保留在标准文档中。",
        "en": "Coverage, accuracy, time, compatibility, and service terms remain in a standard document."
      }
    }
  ],
  "items": [
    {
      "label": "CAPTURE",
      "value": "14 s",
      "note": {
        "zh": "完成一次全结构捕获",
        "en": "One full-structure capture"
      }
    },
    {
      "label": "ACCURACY",
      "value": "24 μm",
      "note": {
        "zh": "重复测量的中位误差",
        "en": "Median repeat measurement error"
      }
    },
    {
      "label": "FORMAT",
      "value": "STL / PLY",
      "note": {
        "zh": "开放输出格式",
        "en": "Open output formats"
      }
    },
    {
      "label": "WARRANTY",
      "value": "36 months",
      "note": {
        "zh": "标准服务周期",
        "en": "Standard service period"
      }
    }
  ]
};
