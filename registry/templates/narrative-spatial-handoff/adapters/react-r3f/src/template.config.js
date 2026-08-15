export default {
  "id": "narrative-spatial-handoff",
  "code": "E06",
  "name": {
    "zh": "叙事到空间索引",
    "en": "Narrative Spatial Handoff"
  },
  "displayName": "Narrative Spatial Handoff",
  "category": "narrative-to-spatial-index",
  "port": 4196,
  "scene": true,
  "summary": "A long scroll narrative visibly ends before control passes to a clickable globe or hotspot index.",
  "purpose": "Build enough context through narrative progression, then let readers directly select places, records, or nodes.",
  "composition": "A typographic longform story occupies the first act. A clear threshold introduces a separate full-screen spatial index with hotspots and a record panel.",
  "interaction": "Native scroll owns the story. After an explicit handoff, pointer and keyboard selection own the spatial index; further scrolling does not change selection.",
  "semantic3d": "The globe encodes geographic distribution and makes selected records spatially comparable.",
  "invariants": [
    "The narrative visibly concludes before the index accepts spatial selection.",
    "Scroll does not silently continue controlling the index.",
    "Every hotspot has an equivalent DOM button and record.",
    "Selection updates the globe and information panel together.",
    "Mobile serializes the globe, hotspot list, and record panel.",
    "Reduced motion keeps selection usable with a static globe pose."
  ],
  "inputs": {
    "wheel": "Native scroll progresses only the narrative act.",
    "touch": "Native touch progresses the story and then the serialized index.",
    "keyboard": "Hotspot buttons and records are fully keyboard accessible.",
    "pointer": "Click selection owns the index after handoff."
  },
  "responsive": {
    "desktop": "Globe and active record share the index viewport.",
    "mobile": "The globe becomes an upper visual region followed by the hotspot list and selected record."
  },
  "capabilities": [
    "two-act-interaction",
    "explicit-control-handoff",
    "scroll-narrative",
    "click-spatial-index",
    "synchronized-selection-record",
    "keyboard-hotspots",
    "mobile-index-serialization"
  ],
  "assetSlots": [
    "narrative-copy",
    "spatial-base",
    "hotspot-records",
    "selection-camera-poses"
  ],
  "kicker": "CIVIC MEMORY / TWO ACTS",
  "hero": {
    "zh": "先理解为什么，再选择在哪里。",
    "en": "Understand why before choosing where."
  },
  "intro": {
    "zh": "滚动负责建立语境；点击负责在空间中检索。两种输入不在同一时刻争夺控制权。",
    "en": "Scroll builds context. Click retrieves spatial records. The two inputs never compete for control at the same time."
  },
  "releaseTitle": {
    "zh": "现在由你选择地点。",
    "en": "Now choose the place."
  },
  "footer": {
    "zh": "故事交代语境，索引交还控制。",
    "en": "Story gives context. The index returns control."
  },
  "chapters": [
    {
      "id": "01",
      "title": {
        "zh": "一座城市把记忆写进公共物。",
        "en": "A city writes memory into public objects."
      },
      "body": {
        "zh": "第一章建立这些地点为何值得被记录。",
        "en": "The first act establishes why these places deserve a record."
      }
    },
    {
      "id": "02",
      "title": {
        "zh": "时间留下不均匀的证据。",
        "en": "Time leaves uneven evidence."
      },
      "body": {
        "zh": "档案、磨损和口述历史组成不同强度的线索。",
        "en": "Archives, wear, and oral histories form evidence of different strength."
      }
    },
    {
      "id": "03",
      "title": {
        "zh": "故事结束，检索开始。",
        "en": "The story ends. Retrieval begins."
      },
      "body": {
        "zh": "下一屏明确把控制权从滚动交给热点选择。",
        "en": "The next screen explicitly hands control from scrolling to hotspot selection."
      }
    }
  ],
  "items": [
    {
      "code": "N-01",
      "label": "NORTH",
      "x": "68%",
      "y": "28%",
      "title": {
        "zh": "海港钟楼",
        "en": "Harbour clock tower"
      },
      "value": "1912",
      "note": {
        "zh": "公共钟记录港口从风帆转向电力。",
        "en": "A public clock records the harbour's transition from sail to electricity."
      }
    },
    {
      "code": "B-04",
      "label": "BASIN",
      "x": "31%",
      "y": "38%",
      "title": {
        "zh": "雨量观测塔",
        "en": "Rain observatory"
      },
      "value": "37 yrs",
      "note": {
        "zh": "手写记录补上三十七年的气候空白。",
        "en": "Handwritten records bridge thirty-seven years of missing climate data."
      }
    },
    {
      "code": "Y-12",
      "label": "YARD",
      "x": "38%",
      "y": "70%",
      "title": {
        "zh": "修船厂档案",
        "en": "Shipyard archive"
      },
      "value": "480",
      "note": {
        "zh": "工单让工业技能重新可见。",
        "en": "Work orders make industrial knowledge visible again."
      }
    },
    {
      "code": "E-09",
      "label": "EDGE",
      "x": "74%",
      "y": "66%",
      "title": {
        "zh": "潮汐界碑",
        "en": "Tidal marker"
      },
      "value": "+2.4 m",
      "note": {
        "zh": "历史刻度把风暴潮变成可比较证据。",
        "en": "Historic marks turn storm surge into comparable evidence."
      }
    }
  ]
};
