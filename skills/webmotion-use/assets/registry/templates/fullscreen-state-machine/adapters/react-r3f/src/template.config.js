export default {
  "id": "fullscreen-state-machine",
  "code": "E03",
  "name": {
    "zh": "全屏状态机",
    "en": "Fullscreen State Machine"
  },
  "displayName": "Fullscreen State Machine",
  "category": "internal-fullscreen-state-machine",
  "port": 4194,
  "scene": true,
  "summary": "An internal full-screen scroller advances a persistent instrument through three discrete states while the document itself stays fixed.",
  "purpose": "Turn wheel or touch input into a small number of explicit full-screen states when ordinary document displacement would weaken the story.",
  "composition": "A fixed stage owns the viewport. One persistent object, one large copy block, a state rail, and an explicit exit change together at three discrete positions.",
  "interaction": "The document remains fixed while a focusable internal scroller owns progress. State buttons can move between stops and the final state exposes an exit.",
  "semantic3d": "Instrument orientation and highlighted strings explain tension, resonance, and release as named states.",
  "invariants": [
    "The document does not move while the internal stage is active.",
    "Exactly three named states remain reachable by wheel, touch, keyboard, and buttons.",
    "Object and copy change as one state transaction.",
    "The final state exposes an explicit exit from the internal scroller.",
    "Internal scrolling never traps keyboard focus permanently.",
    "Reduced motion uses direct state changes without continuous camera travel."
  ],
  "inputs": {
    "wheel": "Wheel input scrolls the focused internal container.",
    "touch": "Touch scrolls the internal container with native momentum.",
    "keyboard": "Tab focuses the stage; PageDown, arrows, and state buttons remain usable.",
    "pointer": "State rail buttons jump to explicit stops."
  },
  "responsive": {
    "desktop": "Object occupies the right field while copy holds the left foreground.",
    "mobile": "Object moves to the upper field and copy occupies a protected lower panel within the same internal stage."
  },
  "capabilities": [
    "internal-scroll-owner",
    "discrete-fullscreen-states",
    "persistent-object",
    "synchronized-copy-camera-state",
    "explicit-exit",
    "keyboard-stage-navigation",
    "mobile-stage-recomposition"
  ],
  "assetSlots": [
    "hero-object",
    "state-copy",
    "state-materials",
    "state-camera-poses"
  ],
  "kicker": "TENSION LAB / INTERNAL STAGE",
  "hero": {
    "zh": "滚轮不移动页面，只改变状态。",
    "en": "The wheel changes state, not the document."
  },
  "intro": {
    "zh": "适合少量、明确而需要全屏注意力的状态；最后必须给用户一个可见出口。",
    "en": "Use it for a few explicit states that require full-screen attention, with a visible exit at the end."
  },
  "releaseTitle": {
    "zh": "状态机结束，文档重新开始。",
    "en": "The state machine ends. The document resumes."
  },
  "footer": {
    "zh": "少量状态，完整注意力。",
    "en": "Few states. Full attention."
  },
  "chapters": [
    {
      "id": "01",
      "label": "TENSION",
      "title": {
        "zh": "张力先制造注意。",
        "en": "Tension creates attention."
      },
      "body": {
        "zh": "只突出一根弦和一个动作，让状态改变立即可见。",
        "en": "One string and one action are isolated so the state change is immediately legible."
      }
    },
    {
      "id": "02",
      "label": "RESONANCE",
      "title": {
        "zh": "共振让结构显形。",
        "en": "Resonance reveals structure."
      },
      "body": {
        "zh": "对象转向，活跃弦与信息重点同时改变。",
        "en": "The object turns while the active string and information emphasis change together."
      }
    },
    {
      "id": "03",
      "label": "RELEASE",
      "title": {
        "zh": "释放已经建立的动作。",
        "en": "Release the established motion."
      },
      "body": {
        "zh": "最终状态停止继续索取滚动，并提供清晰出口。",
        "en": "The final state stops asking for more scrolling and exposes a clear exit."
      }
    }
  ],
  "items": []
};
