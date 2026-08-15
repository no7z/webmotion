export default {
  "id": "click-spatial-index",
  "code": "E09",
  "name": {
    "zh": "点击空间索引",
    "en": "Click Spatial Index"
  },
  "displayName": "Click Spatial Index",
  "category": "non-scroll-spatial-navigation",
  "port": 4199,
  "scene": true,
  "summary": "Floor and room buttons directly control a spatial building model and an information panel; scroll is not the navigation model.",
  "purpose": "Let readers browse hierarchical spaces directly when sequence is less important than location and comparison.",
  "composition": "A full-screen workspace contains floor tabs, an exploded building model, room pins, and a synchronized record panel.",
  "interaction": "Click or keyboard selection chooses a floor and room. Selection updates model emphasis, camera framing, pins, and the DOM record in place.",
  "semantic3d": "The building model preserves floor and room relationships while selection reveals one record without losing spatial context.",
  "invariants": [
    "Scroll never acts as the primary navigation input.",
    "Floor and room hierarchy is explicit in DOM controls.",
    "Model, pins, and information panel update in one selection transaction.",
    "The selected room remains spatially contextualized.",
    "Mobile places the model above a touch-friendly room list and record.",
    "Reduced motion switches selection without camera travel."
  ],
  "inputs": {
    "wheel": "No semantic mapping; the desktop workspace fits the viewport.",
    "touch": "Touch selects floor and room controls.",
    "keyboard": "Every floor and room is reachable with standard buttons.",
    "pointer": "Click selection owns navigation."
  },
  "responsive": {
    "desktop": "Model and record panel share a single workspace viewport.",
    "mobile": "Model, floor tabs, room pins, and record serialize vertically."
  },
  "capabilities": [
    "direct-spatial-selection",
    "hierarchical-floor-room-index",
    "synchronized-model-record",
    "no-scroll-navigation",
    "keyboard-room-controls",
    "mobile-index-stack",
    "reduced-motion-direct-selection"
  ],
  "assetSlots": [
    "building-model",
    "floor-records",
    "room-records",
    "selection-camera-poses"
  ],
  "kicker": "CIVIC ARCHIVE / OPEN PLAN",
  "hero": {
    "zh": "不要滚动故事，直接选择空间。",
    "en": "Do not scroll a story. Select the space."
  },
  "intro": {
    "zh": "当用户需要比较楼层与房间，点击比滚动顺序更诚实。",
    "en": "When readers compare floors and rooms, direct selection is more honest than a forced scroll sequence."
  },
  "releaseTitle": {
    "zh": "空间保持上下文，记录原地更新。",
    "en": "Space keeps context while records update in place."
  },
  "footer": {
    "zh": "位置是索引，不是背景。",
    "en": "Location is the index, not the backdrop."
  },
  "chapters": [],
  "items": [
    {
      "code": "L1-A",
      "level": 0,
      "x": "18%",
      "y": "58%",
      "title": {
        "zh": "到达大厅",
        "en": "Arrival hall"
      },
      "value": "184 m²",
      "note": {
        "zh": "入口层连接公共展厅、服务台和无障碍路线。",
        "en": "The arrival level connects public galleries, service desk, and accessible circulation."
      }
    },
    {
      "code": "L1-B",
      "level": 0,
      "x": "58%",
      "y": "70%",
      "title": {
        "zh": "材料档案",
        "en": "Material archive"
      },
      "value": "96 m²",
      "note": {
        "zh": "开放抽屉保存可触摸样本和出处记录。",
        "en": "Open drawers keep tactile samples with provenance records."
      }
    },
    {
      "code": "L2-A",
      "level": 1,
      "x": "30%",
      "y": "50%",
      "title": {
        "zh": "研究阅览室",
        "en": "Research room"
      },
      "value": "142 m²",
      "note": {
        "zh": "二层安静阅读区与数字档案并置。",
        "en": "A quiet second-floor reading room sits beside the digital archive."
      }
    },
    {
      "code": "L2-B",
      "level": 1,
      "x": "68%",
      "y": "44%",
      "title": {
        "zh": "修复工作室",
        "en": "Conservation studio"
      },
      "value": "118 m²",
      "note": {
        "zh": "观察窗让维护工作成为展览证据。",
        "en": "An observation window makes conservation work part of the evidence."
      }
    },
    {
      "code": "L3-A",
      "level": 2,
      "x": "38%",
      "y": "40%",
      "title": {
        "zh": "屋顶论坛",
        "en": "Roof forum"
      },
      "value": "210 m²",
      "note": {
        "zh": "可变座席面向城市天际线和公共讲座。",
        "en": "Flexible seating faces the skyline and public lectures."
      }
    },
    {
      "code": "L3-B",
      "level": 2,
      "x": "72%",
      "y": "58%",
      "title": {
        "zh": "气候露台",
        "en": "Climate terrace"
      },
      "value": "166 m²",
      "note": {
        "zh": "雨水、遮阳和本地植物成为实时教学系统。",
        "en": "Rainwater, shade, and native plants form a live teaching system."
      }
    }
  ]
};
