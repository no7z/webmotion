export default {
  "id": "guided-camera-route",
  "code": "E05",
  "name": {
    "zh": "引导式镜头路线",
    "en": "Guided Camera Route"
  },
  "displayName": "Guided Camera Route",
  "category": "guided-camera-itinerary",
  "port": 4195,
  "scene": true,
  "summary": "Document scroll drives a continuous camera itinerary through room scale, object detail, and evidence plaque stops.",
  "purpose": "Guide readers through spatial evidence in a fixed order without turning the page into a free-roaming game.",
  "composition": "A persistent full-screen spatial corridor sits behind three materially different stops: overview, close detail, and evidence record.",
  "interaction": "Native document scroll moves a damped camera along a continuous route. Declared stops align copy, camera, and evidence while remaining reversible.",
  "semantic3d": "Camera distance and viewing angle establish context, reveal surface evidence, and conclude on searchable factual information.",
  "invariants": [
    "The route remains continuous through every stop boundary.",
    "Every camera stop delivers a distinct searchable information result.",
    "The user cannot enter free-roam or lose the route.",
    "Camera position and gaze share explicit boundary keyframes.",
    "Mobile uses a separately framed route with copy below the visual field.",
    "Reduced motion shows stable stop images and complete DOM records."
  ],
  "inputs": {
    "wheel": "Native document scroll advances the camera itinerary.",
    "touch": "Native touch momentum advances the same route.",
    "keyboard": "Page keys and stop links remain functional.",
    "pointer": "Stop navigation links scroll to declared route nodes."
  },
  "responsive": {
    "desktop": "Broad spatial field with copy entering from protected right-side zones.",
    "mobile": "Camera framing moves upward while copy occupies a stable lower gradient panel."
  },
  "capabilities": [
    "guided-camera-itinerary",
    "continuous-camera-and-gaze",
    "declared-spatial-stops",
    "reversible-route",
    "evidence-bearing-camera-distance",
    "mobile-route-recomposition",
    "reduced-motion-stop-poses"
  ],
  "assetSlots": [
    "environment-model",
    "route-subjects",
    "stop-copy",
    "camera-route",
    "lighting-config"
  ],
  "kicker": "ARCHIVE 7B / GUIDED ROUTE",
  "hero": {
    "zh": "镜头路线就是阅读顺序。",
    "en": "The camera route is the reading order."
  },
  "intro": {
    "zh": "每次停靠都交付可检索的信息；路线结束时，空间关系和事实证据同时成立。",
    "en": "Every stop delivers searchable information; at arrival, spatial relationships and factual evidence agree."
  },
  "releaseTitle": {
    "zh": "抵达时，路线已经建立因果链。",
    "en": "At arrival, the route has built the causal chain."
  },
  "footer": {
    "zh": "不能自由迷路，只能清楚抵达。",
    "en": "No free-roam drift. A clear arrival."
  },
  "chapters": [
    {
      "id": "01",
      "label": "ROOM",
      "title": {
        "zh": "先在房间尺度理解作品。",
        "en": "Meet the work at room scale."
      },
      "body": {
        "zh": "镜头交代距离、邻近物和仍未走完的路径。",
        "en": "The camera establishes distance, neighbouring objects, and the route still ahead."
      },
      "metric": "4.8 s",
      "view": "18 m"
    },
    {
      "id": "02",
      "label": "DETAIL",
      "title": {
        "zh": "靠近到足以阅读表面。",
        "en": "Move close enough to read the surface."
      },
      "body": {
        "zh": "第二停靠点只改变距离与角度，用细节解释制作方法。",
        "en": "The second stop changes distance and angle to explain how the object was made."
      },
      "metric": "7.2 s",
      "view": "0.8 m"
    },
    {
      "id": "03",
      "label": "RECORD",
      "title": {
        "zh": "最后停在可检索的证据。",
        "en": "End on searchable evidence."
      },
      "body": {
        "zh": "标题、材料、年份和结论回到普通 DOM 文本。",
        "en": "Title, material, year, and conclusion return to ordinary DOM text."
      },
      "metric": "6.0 s",
      "view": "2.4 m"
    }
  ],
  "items": []
};
