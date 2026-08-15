import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(import.meta.dirname, "template-sources");
const templateRoot = path.join(root, "registry/templates");

const localized = (zh, en) => ({ zh, en });

const definitions = [
  {
    id: "system-morph", code: "E01", name: localized("连续系统变形", "System Morph"), displayName: "System Morph",
    category: "continuous-composition-morph", port: 4193, scene: true,
    summary: "One persistent subject continuously unfolds into a distributed system before releasing an ordinary information document.",
    purpose: "Explain how one product, material, or idea expands into a complete system without replacing the visual subject between chapters.",
    composition: "A full-viewport persistent subject transforms from a single object into a spatial sample field; the immersive stage then ends and releases a stable technical ledger.",
    interaction: "Native vertical document progress continuously controls subject scale, density, distribution, and camera distance. Reverse scrolling restores every intermediate composition.",
    semantic3d: "The spatial multiplication shows how one unit becomes a family of modules and which properties remain shared.",
    invariants: ["One visual subject remains identifiable from the first frame through the distributed system state.", "Composition parameters interpolate continuously and reversibly.", "The immersive stage has an explicit release into ordinary information.", "Each of the three states produces a distinct information result.", "Mobile serializes the sample field without hiding content.", "Reduced motion exposes three stable poses and the full ledger."],
    inputs: { wheel: "Native document scroll maps to continuous composition progress.", touch: "Native vertical touch momentum advances the same continuous state.", keyboard: "Page navigation remains native.", pointer: "Optional bounded lighting response only." },
    responsive: { desktop: "Wide sample field with copy placed in protected right-side zones.", mobile: "Subject stays above a serialized copy stack and the system grid uses a tighter authored spread." },
    capabilities: ["continuous-composition-morph", "persistent-semantic-subject", "distributed-system-state", "ordinary-document-release", "reverse-scroll-restoration", "mobile-serialization", "reduced-motion-fallback"],
    assetSlots: ["subject-material", "module-colors", "chapter-copy", "system-ledger", "motion-keyframes"],
    kicker: "AER / MATERIAL INTELLIGENCE", hero: localized("一个主语，连续长成一套系统。", "One subject continuously becomes a system."), intro: localized("主语不被替换。尺度、密度与关系持续变化，最后把阅读主导权交还给普通文档。", "The subject is never replaced. Scale, density, and relationships change continuously before ordinary reading takes over."), releaseTitle: localized("变形结束，证据开始。", "The morph ends. Evidence begins."), footer: localized("一个单位，解释一套系统。", "One unit explains the system."),
    chapters: [
      { id: "01", label: "SUBJECT", title: localized("先识别一个稳定主语。", "Establish one stable subject."), body: localized("低密度画面只建立材质、轮廓与首要行动。", "A low-density field establishes material, silhouette, and the primary action."), metric: "01 UNIT" },
      { id: "02", label: "SYSTEM", title: localized("主语展开为十二个工作模块。", "The subject unfolds into twelve working modules."), body: localized("所有模块共享一个来源，却用位置和颜色解释不同职责。", "Every module shares one origin while position and color explain distinct roles."), metric: "12 MODULES" },
      { id: "03", label: "RELEASE", title: localized("空间收束，规格进入文档。", "Space resolves into a document."), body: localized("沉浸舞台完成解释后主动退出，不长期占用信息阅读。", "The immersive stage exits after explanation instead of occupying the entire document."), metric: "100% READABLE" }
    ],
    items: [
      { label: "DENSITY", value: "0.82", note: localized("单位体积的有效覆盖率", "Effective coverage per unit volume") },
      { label: "RECOVERY", value: "96%", note: localized("反向路径可恢复的状态", "States restored in reverse travel") },
      { label: "MODULES", value: "12", note: localized("由同一主语释放的功能模块", "Functional modules released by one subject") }
    ]
  },
  {
    id: "fullscreen-state-machine", code: "E03", name: localized("全屏状态机", "Fullscreen State Machine"), displayName: "Fullscreen State Machine",
    category: "internal-fullscreen-state-machine", port: 4194, scene: true,
    summary: "An internal full-screen scroller advances a persistent instrument through three discrete states while the document itself stays fixed.",
    purpose: "Turn wheel or touch input into a small number of explicit full-screen states when ordinary document displacement would weaken the story.",
    composition: "A fixed stage owns the viewport. One persistent object, one large copy block, a state rail, and an explicit exit change together at three discrete positions.",
    interaction: "The document remains fixed while a focusable internal scroller owns progress. State buttons can move between stops and the final state exposes an exit.",
    semantic3d: "Instrument orientation and highlighted strings explain tension, resonance, and release as named states.",
    invariants: ["The document does not move while the internal stage is active.", "Exactly three named states remain reachable by wheel, touch, keyboard, and buttons.", "Object and copy change as one state transaction.", "The final state exposes an explicit exit from the internal scroller.", "Internal scrolling never traps keyboard focus permanently.", "Reduced motion uses direct state changes without continuous camera travel."],
    inputs: { wheel: "Wheel input scrolls the focused internal container.", touch: "Touch scrolls the internal container with native momentum.", keyboard: "Tab focuses the stage; PageDown, arrows, and state buttons remain usable.", pointer: "State rail buttons jump to explicit stops." },
    responsive: { desktop: "Object occupies the right field while copy holds the left foreground.", mobile: "Object moves to the upper field and copy occupies a protected lower panel within the same internal stage." },
    capabilities: ["internal-scroll-owner", "discrete-fullscreen-states", "persistent-object", "synchronized-copy-camera-state", "explicit-exit", "keyboard-stage-navigation", "mobile-stage-recomposition"],
    assetSlots: ["hero-object", "state-copy", "state-materials", "state-camera-poses"],
    kicker: "TENSION LAB / INTERNAL STAGE", hero: localized("滚轮不移动页面，只改变状态。", "The wheel changes state, not the document."), intro: localized("适合少量、明确而需要全屏注意力的状态；最后必须给用户一个可见出口。", "Use it for a few explicit states that require full-screen attention, with a visible exit at the end."), releaseTitle: localized("状态机结束，文档重新开始。", "The state machine ends. The document resumes."), footer: localized("少量状态，完整注意力。", "Few states. Full attention."),
    chapters: [
      { id: "01", label: "TENSION", title: localized("张力先制造注意。", "Tension creates attention."), body: localized("只突出一根弦和一个动作，让状态改变立即可见。", "One string and one action are isolated so the state change is immediately legible.") },
      { id: "02", label: "RESONANCE", title: localized("共振让结构显形。", "Resonance reveals structure."), body: localized("对象转向，活跃弦与信息重点同时改变。", "The object turns while the active string and information emphasis change together.") },
      { id: "03", label: "RELEASE", title: localized("释放已经建立的动作。", "Release the established motion."), body: localized("最终状态停止继续索取滚动，并提供清晰出口。", "The final state stops asking for more scrolling and exposes a clear exit.") }
    ],
    items: []
  },
  {
    id: "guided-camera-route", code: "E05", name: localized("引导式镜头路线", "Guided Camera Route"), displayName: "Guided Camera Route",
    category: "guided-camera-itinerary", port: 4195, scene: true,
    summary: "Document scroll drives a continuous camera itinerary through room scale, object detail, and evidence plaque stops.",
    purpose: "Guide readers through spatial evidence in a fixed order without turning the page into a free-roaming game.",
    composition: "A persistent full-screen spatial corridor sits behind three materially different stops: overview, close detail, and evidence record.",
    interaction: "Native document scroll moves a damped camera along a continuous route. Declared stops align copy, camera, and evidence while remaining reversible.",
    semantic3d: "Camera distance and viewing angle establish context, reveal surface evidence, and conclude on searchable factual information.",
    invariants: ["The route remains continuous through every stop boundary.", "Every camera stop delivers a distinct searchable information result.", "The user cannot enter free-roam or lose the route.", "Camera position and gaze share explicit boundary keyframes.", "Mobile uses a separately framed route with copy below the visual field.", "Reduced motion shows stable stop images and complete DOM records."],
    inputs: { wheel: "Native document scroll advances the camera itinerary.", touch: "Native touch momentum advances the same route.", keyboard: "Page keys and stop links remain functional.", pointer: "Stop navigation links scroll to declared route nodes." },
    responsive: { desktop: "Broad spatial field with copy entering from protected right-side zones.", mobile: "Camera framing moves upward while copy occupies a stable lower gradient panel." },
    capabilities: ["guided-camera-itinerary", "continuous-camera-and-gaze", "declared-spatial-stops", "reversible-route", "evidence-bearing-camera-distance", "mobile-route-recomposition", "reduced-motion-stop-poses"],
    assetSlots: ["environment-model", "route-subjects", "stop-copy", "camera-route", "lighting-config"],
    kicker: "ARCHIVE 7B / GUIDED ROUTE", hero: localized("镜头路线就是阅读顺序。", "The camera route is the reading order."), intro: localized("每次停靠都交付可检索的信息；路线结束时，空间关系和事实证据同时成立。", "Every stop delivers searchable information; at arrival, spatial relationships and factual evidence agree."), releaseTitle: localized("抵达时，路线已经建立因果链。", "At arrival, the route has built the causal chain."), footer: localized("不能自由迷路，只能清楚抵达。", "No free-roam drift. A clear arrival."),
    chapters: [
      { id: "01", label: "ROOM", title: localized("先在房间尺度理解作品。", "Meet the work at room scale."), body: localized("镜头交代距离、邻近物和仍未走完的路径。", "The camera establishes distance, neighbouring objects, and the route still ahead."), metric: "4.8 s", view: "18 m" },
      { id: "02", label: "DETAIL", title: localized("靠近到足以阅读表面。", "Move close enough to read the surface."), body: localized("第二停靠点只改变距离与角度，用细节解释制作方法。", "The second stop changes distance and angle to explain how the object was made."), metric: "7.2 s", view: "0.8 m" },
      { id: "03", label: "RECORD", title: localized("最后停在可检索的证据。", "End on searchable evidence."), body: localized("标题、材料、年份和结论回到普通 DOM 文本。", "Title, material, year, and conclusion return to ordinary DOM text."), metric: "6.0 s", view: "2.4 m" }
    ], items: []
  },
  {
    id: "narrative-spatial-handoff", code: "E06", name: localized("叙事到空间索引", "Narrative Spatial Handoff"), displayName: "Narrative Spatial Handoff",
    category: "narrative-to-spatial-index", port: 4196, scene: true,
    summary: "A long scroll narrative visibly ends before control passes to a clickable globe or hotspot index.",
    purpose: "Build enough context through narrative progression, then let readers directly select places, records, or nodes.",
    composition: "A typographic longform story occupies the first act. A clear threshold introduces a separate full-screen spatial index with hotspots and a record panel.",
    interaction: "Native scroll owns the story. After an explicit handoff, pointer and keyboard selection own the spatial index; further scrolling does not change selection.",
    semantic3d: "The globe encodes geographic distribution and makes selected records spatially comparable.",
    invariants: ["The narrative visibly concludes before the index accepts spatial selection.", "Scroll does not silently continue controlling the index.", "Every hotspot has an equivalent DOM button and record.", "Selection updates the globe and information panel together.", "Mobile serializes the globe, hotspot list, and record panel.", "Reduced motion keeps selection usable with a static globe pose."],
    inputs: { wheel: "Native scroll progresses only the narrative act.", touch: "Native touch progresses the story and then the serialized index.", keyboard: "Hotspot buttons and records are fully keyboard accessible.", pointer: "Click selection owns the index after handoff." },
    responsive: { desktop: "Globe and active record share the index viewport.", mobile: "The globe becomes an upper visual region followed by the hotspot list and selected record." },
    capabilities: ["two-act-interaction", "explicit-control-handoff", "scroll-narrative", "click-spatial-index", "synchronized-selection-record", "keyboard-hotspots", "mobile-index-serialization"],
    assetSlots: ["narrative-copy", "spatial-base", "hotspot-records", "selection-camera-poses"],
    kicker: "CIVIC MEMORY / TWO ACTS", hero: localized("先理解为什么，再选择在哪里。", "Understand why before choosing where."), intro: localized("滚动负责建立语境；点击负责在空间中检索。两种输入不在同一时刻争夺控制权。", "Scroll builds context. Click retrieves spatial records. The two inputs never compete for control at the same time."), releaseTitle: localized("现在由你选择地点。", "Now choose the place."), footer: localized("故事交代语境，索引交还控制。", "Story gives context. The index returns control."),
    chapters: [
      { id: "01", title: localized("一座城市把记忆写进公共物。", "A city writes memory into public objects."), body: localized("第一章建立这些地点为何值得被记录。", "The first act establishes why these places deserve a record.") },
      { id: "02", title: localized("时间留下不均匀的证据。", "Time leaves uneven evidence."), body: localized("档案、磨损和口述历史组成不同强度的线索。", "Archives, wear, and oral histories form evidence of different strength.") },
      { id: "03", title: localized("故事结束，检索开始。", "The story ends. Retrieval begins."), body: localized("下一屏明确把控制权从滚动交给热点选择。", "The next screen explicitly hands control from scrolling to hotspot selection.") }
    ],
    items: [
      { code: "N-01", label: "NORTH", x: "68%", y: "28%", title: localized("海港钟楼", "Harbour clock tower"), value: "1912", note: localized("公共钟记录港口从风帆转向电力。", "A public clock records the harbour's transition from sail to electricity.") },
      { code: "B-04", label: "BASIN", x: "31%", y: "38%", title: localized("雨量观测塔", "Rain observatory"), value: "37 yrs", note: localized("手写记录补上三十七年的气候空白。", "Handwritten records bridge thirty-seven years of missing climate data.") },
      { code: "Y-12", label: "YARD", x: "38%", y: "70%", title: localized("修船厂档案", "Shipyard archive"), value: "480", note: localized("工单让工业技能重新可见。", "Work orders make industrial knowledge visible again.") },
      { code: "E-09", label: "EDGE", x: "74%", y: "66%", title: localized("潮汐界碑", "Tidal marker"), value: "+2.4 m", note: localized("历史刻度把风暴潮变成可比较证据。", "Historic marks turn storm surge into comparable evidence.") }
    ]
  },
  {
    id: "editorial-media-rhythm", code: "E07", name: localized("编辑媒体节奏", "Editorial Media Rhythm"), displayName: "Editorial Media Rhythm",
    category: "editorial-media-choreography", port: 4197, scene: true,
    summary: "Typography, media density, whitespace, and one bounded spatial insert create depth without a persistent 3D object.",
    purpose: "Build a premium editorial information page when continuous 3D would distract from reading.",
    composition: "Large typographic cover, full-bleed media field, essay spread, bounded spatial insert, touchable media cabinet, quote, and credits each use different density.",
    interaction: "Ordinary document flow remains primary. Media and type enter through native scrolling; one embedded 3D figure answers a local question and then releases the reader.",
    semantic3d: "The bounded spatial insert demonstrates material continuity only where the essay requires spatial evidence.",
    invariants: ["No persistent 3D object follows the reader through the document.", "At least five distinct density rhythms are visible.", "The embedded 3D figure has a local information job and bounded duration.", "The document remains complete if the spatial insert fails.", "Mobile turns the media cabinet into native horizontal touch without affecting document scroll.", "Reduced motion preserves the same editorial sequence."],
    inputs: { wheel: "Native document flow only.", touch: "Native vertical document flow plus horizontal touch inside the media cabinet.", keyboard: "Document links and captions remain sequentially navigable.", pointer: "No required pointer-specific motion." },
    responsive: { desktop: "Editorial spreads use asymmetric columns and broad whitespace.", mobile: "Spreads serialize; the media cabinet becomes a horizontal touch strip." },
    capabilities: ["editorial-density-choreography", "bounded-spatial-insert", "ordinary-document-flow", "asymmetric-spreads", "touch-media-cabinet", "no-persistent-scene", "reduced-motion-document"],
    assetSlots: ["hero-media", "editorial-copy", "media-cabinet", "spatial-insert", "captions"],
    kicker: "IMPRINT / MATERIAL CULTURE", hero: localized("高级感来自节奏，不来自持续占屏。", "Depth comes from rhythm, not permanent occupation."), intro: localized("文字、媒体和留白改变密度。3D 只在一个局部问题需要它时出现。", "Type, media, and whitespace change density. 3D appears only when one local question needs it."), releaseTitle: localized("编辑顺序本身，就是空间。", "The editorial sequence is the space."), footer: localized("让密度编舞，而不是让对象跟随。", "Choreograph density, not a following object."),
    chapters: [
      { id: "01", title: localized("先用尺度建立论点。", "Begin with scale as an argument."), body: localized("标题、图像和正文的比例变化先于任何空间特效。", "The ratio between title, image, and body changes before any spatial effect appears.") },
      { id: "02", title: localized("空间图只回答一个局部问题。", "The spatial figure answers one local question."), body: localized("这段实时对象解释表面连续性，离开章节后不再跟随。", "This realtime object explains surface continuity and does not follow beyond the section.") },
      { id: "03", title: localized("最后让信用和证据占满版面。", "End by giving credits and evidence the full field."), body: localized("收束不是另一个特效，而是信息权重的最后一次变化。", "Closure is not another effect; it is the final change in information weight.") }
    ], items: [{ label: "FORM" }, { label: "SURFACE" }, { label: "LIGHT" }, { label: "TYPE" }, { label: "CREDIT" }]
  },
  {
    id: "spatial-product-document", code: "E08", name: localized("空间增强产品文档", "Spatial Product Document"), displayName: "Spatial Product Document",
    category: "spatially-enhanced-document", port: 4198, scene: true,
    summary: "One spatial product hero explains a structural promise, then yields to an ordinary specifications and evidence document.",
    purpose: "Use 3D to clarify one product structure without making every section depend on a persistent canvas.",
    composition: "A split but asymmetric hero pairs product copy with one contained spatial object. Facts, specifications, and evidence continue as conventional DOM sections.",
    interaction: "Ordinary document flow. The hero object uses bounded ambient motion and one CTA scrolls to standard specifications.",
    semantic3d: "The spatial arch explains how one continuous scan captures a full structure instead of isolated samples.",
    invariants: ["The spatial object is contained to the hero and does not follow into specifications.", "The hero makes one structural product claim visible.", "Facts and specifications are standard searchable DOM content.", "The page remains useful when WebGL is unavailable.", "Mobile places the spatial object before the copy and preserves the CTA.", "Reduced motion leaves a stable product pose."],
    inputs: { wheel: "Native document scroll only.", touch: "Native touch document flow.", keyboard: "CTA and document structure remain keyboard accessible.", pointer: "Optional bounded product tilt; no semantic state depends on pointer." },
    responsive: { desktop: "Asymmetric copy and contained spatial object share the hero.", mobile: "Spatial object is placed first, then copy and standard facts serialize." },
    capabilities: ["bounded-spatial-product-hero", "standard-document-flow", "semantic-structure-visualization", "searchable-specifications", "webgl-fallback", "mobile-hero-reorder", "reduced-motion-stable-pose"],
    assetSlots: ["product-model", "product-copy", "key-facts", "specifications", "fallback-poster"],
    kicker: "ARC ONE / STRUCTURAL CAPTURE", hero: localized("一次空间扫描，解释完整结构。", "One spatial scan explains the complete structure."), intro: localized("首屏只用 3D 解释完整拱形捕获；随后页面回到价格、规格和证据。", "The hero uses 3D only to explain full-arch capture; pricing, specifications, and evidence then return to ordinary document flow."), releaseTitle: localized("空间解释结束，产品文档继续。", "The spatial explanation ends. The product document continues."), footer: localized("一处空间证据，完整普通文档。", "One spatial proof. A complete ordinary document."),
    chapters: [{ id: "01", title: localized("在首屏理解整体结构。", "Understand the complete structure in the hero."), body: localized("连续拱形比一组孤立图片更清楚地解释捕获范围。", "A continuous arch explains capture coverage more clearly than isolated images.") }, { id: "02", title: localized("所有购买信息保持普通可读。", "Keep every buying fact ordinarily readable."), body: localized("扫描范围、精度、时间、兼容性和维护条款都保留在标准文档中。", "Coverage, accuracy, time, compatibility, and service terms remain in a standard document.") }],
    items: [{ label: "CAPTURE", value: "14 s", note: localized("完成一次全结构捕获", "One full-structure capture") }, { label: "ACCURACY", value: "24 μm", note: localized("重复测量的中位误差", "Median repeat measurement error") }, { label: "FORMAT", value: "STL / PLY", note: localized("开放输出格式", "Open output formats") }, { label: "WARRANTY", value: "36 months", note: localized("标准服务周期", "Standard service period") }]
  },
  {
    id: "click-spatial-index", code: "E09", name: localized("点击空间索引", "Click Spatial Index"), displayName: "Click Spatial Index",
    category: "non-scroll-spatial-navigation", port: 4199, scene: true,
    summary: "Floor and room buttons directly control a spatial building model and an information panel; scroll is not the navigation model.",
    purpose: "Let readers browse hierarchical spaces directly when sequence is less important than location and comparison.",
    composition: "A full-screen workspace contains floor tabs, an exploded building model, room pins, and a synchronized record panel.",
    interaction: "Click or keyboard selection chooses a floor and room. Selection updates model emphasis, camera framing, pins, and the DOM record in place.",
    semantic3d: "The building model preserves floor and room relationships while selection reveals one record without losing spatial context.",
    invariants: ["Scroll never acts as the primary navigation input.", "Floor and room hierarchy is explicit in DOM controls.", "Model, pins, and information panel update in one selection transaction.", "The selected room remains spatially contextualized.", "Mobile places the model above a touch-friendly room list and record.", "Reduced motion switches selection without camera travel."],
    inputs: { wheel: "No semantic mapping; the desktop workspace fits the viewport.", touch: "Touch selects floor and room controls.", keyboard: "Every floor and room is reachable with standard buttons.", pointer: "Click selection owns navigation." },
    responsive: { desktop: "Model and record panel share a single workspace viewport.", mobile: "Model, floor tabs, room pins, and record serialize vertically." },
    capabilities: ["direct-spatial-selection", "hierarchical-floor-room-index", "synchronized-model-record", "no-scroll-navigation", "keyboard-room-controls", "mobile-index-stack", "reduced-motion-direct-selection"],
    assetSlots: ["building-model", "floor-records", "room-records", "selection-camera-poses"],
    kicker: "CIVIC ARCHIVE / OPEN PLAN", hero: localized("不要滚动故事，直接选择空间。", "Do not scroll a story. Select the space."), intro: localized("当用户需要比较楼层与房间，点击比滚动顺序更诚实。", "When readers compare floors and rooms, direct selection is more honest than a forced scroll sequence."), releaseTitle: localized("空间保持上下文，记录原地更新。", "Space keeps context while records update in place."), footer: localized("位置是索引，不是背景。", "Location is the index, not the backdrop."),
    chapters: [],
    items: [
      { code: "L1-A", level: 0, x: "18%", y: "58%", title: localized("到达大厅", "Arrival hall"), value: "184 m²", note: localized("入口层连接公共展厅、服务台和无障碍路线。", "The arrival level connects public galleries, service desk, and accessible circulation.") },
      { code: "L1-B", level: 0, x: "58%", y: "70%", title: localized("材料档案", "Material archive"), value: "96 m²", note: localized("开放抽屉保存可触摸样本和出处记录。", "Open drawers keep tactile samples with provenance records.") },
      { code: "L2-A", level: 1, x: "30%", y: "50%", title: localized("研究阅览室", "Research room"), value: "142 m²", note: localized("二层安静阅读区与数字档案并置。", "A quiet second-floor reading room sits beside the digital archive.") },
      { code: "L2-B", level: 1, x: "68%", y: "44%", title: localized("修复工作室", "Conservation studio"), value: "118 m²", note: localized("观察窗让维护工作成为展览证据。", "An observation window makes conservation work part of the evidence.") },
      { code: "L3-A", level: 2, x: "38%", y: "40%", title: localized("屋顶论坛", "Roof forum"), value: "210 m²", note: localized("可变座席面向城市天际线和公共讲座。", "Flexible seating faces the skyline and public lectures.") },
      { code: "L3-B", level: 2, x: "72%", y: "58%", title: localized("气候露台", "Climate terrace"), value: "166 m²", note: localized("雨水、遮阳和本地植物成为实时教学系统。", "Rainwater, shade, and native plants form a live teaching system.") }
    ]
  },
  {
    id: "prerendered-spatial-document", code: "E10", name: localized("预渲染空间文档", "Pre-rendered Spatial Document"), displayName: "Pre-rendered Spatial Document",
    category: "prerendered-spatial-media-document", port: 4200, scene: false,
    summary: "Pre-rendered spatial plates provide visual scale and atmosphere inside an ordinary corporate information document with no WebGL runtime.",
    purpose: "Deliver reliable spatial storytelling when realtime interaction adds cost but no additional information value.",
    composition: "Large typographic cover, one pre-rendered hero plate, text spread, two spatial detail plates, operations copy, and technical record follow normal document flow.",
    interaction: "Native document scrolling and ordinary image loading only. Media can be replaced by video, image sequences, or responsive pictures without a realtime scene.",
    semantic3d: "Pre-rendered plates communicate infrastructure scale, sectional organization, and material detail while DOM content carries claims and specifications.",
    invariants: ["No WebGL canvas or realtime scene runtime is included.", "Every spatial plate has descriptive alternative text and a caption.", "The document remains understandable if media fails to load.", "Media does not capture wheel, touch, or keyboard input.", "Mobile uses responsive crops and serialized copy.", "Reduced motion removes optional playback while preserving still plates."],
    inputs: { wheel: "Native document scroll only.", touch: "Native touch document flow only.", keyboard: "Standard document navigation.", pointer: "Optional playback controls for replaceable video slots." },
    responsive: { desktop: "Full-width plates alternate with asymmetric editorial spreads.", mobile: "Plates use authored responsive crops and all spreads serialize." },
    capabilities: ["zero-webgl-runtime", "prerendered-spatial-media", "ordinary-document-flow", "responsive-picture-slots", "media-failure-readable", "mobile-responsive-crops", "reduced-motion-stills"],
    assetSlots: ["hero-plate", "section-plate", "material-plate", "document-copy", "technical-records"],
    kicker: "NORTH ARRAY / OPERATIONS", hero: localized("空间可以预渲染，信息不能被烘焙进图片。", "Space may be pre-rendered. Information must not be baked into imagery."), intro: localized("当用户只需要理解尺度、剖面和材质，稳定媒体比实时场景更合适；所有结论仍由文档承担。", "When readers only need scale, section, and material, stable media is a better carrier than realtime graphics; the document still carries every conclusion."), releaseTitle: localized("稳定媒体负责尺度，文档负责决策。", "Stable media carries scale. The document carries decisions."), footer: localized("没有 WebGL，也可以有空间高级感。", "Spatial sophistication without WebGL."), mediaAlt: localized("大型清洁能源设施的预渲染鸟瞰图", "Pre-rendered aerial view of a large clean-energy facility"),
    chapters: [{ id: "01", title: localized("用一幅总图建立基础设施尺度。", "Use one master plate to establish infrastructure scale."), body: localized("重复单元、维护通道和周边能源设施在同一画面中可比较。", "Repeated units, service routes, and surrounding energy systems remain comparable in one frame.") }, { id: "02", title: localized("再用剖面解释运营关系。", "Then use sections to explain operations."), body: localized("局部图回答冷却、检修和材料寿命，不承担导航。", "Detail plates answer cooling, service, and material-life questions without becoming navigation.") }],
    items: [{ label: "CAPACITY", value: "280 MW" }, { label: "MODULES", value: "640" }, { label: "UPTIME", value: "99.2%" }, { label: "WATER", value: "CLOSED LOOP" }]
  }
];

const commonSchema = (definition) => ({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: `https://webmotion.local/schemas/${definition.id}.config.schema.json`,
  title: `${definition.displayName} configuration`, type: "object", additionalProperties: false,
  required: ["locale", "content", "motion"],
  properties: {
    locale: { type: "object", required: ["default", "supported"], properties: { default: { type: "string" }, supported: { type: "array", items: { type: "string" }, minItems: 1 } } },
    content: { type: "object", required: ["hero", "chapters"], properties: { hero: { $ref: "#/$defs/localized" }, intro: { $ref: "#/$defs/localized" }, chapters: { type: "array", items: { $ref: "#/$defs/chapter" } }, items: { type: "array", items: { type: "object" } } } },
    assets: { type: "object", additionalProperties: { $ref: "#/$defs/asset" } },
    motion: { type: "object", required: ["desktop", "mobile", "reduced"], properties: { desktop: { type: "object" }, mobile: { type: "object" }, reduced: { enum: ["stable-states", "direct-selection", "static-media"] } } }
  },
  $defs: {
    localized: { type: "object", required: ["zh", "en"], properties: { zh: { type: "string" }, en: { type: "string" } } },
    chapter: { type: "object", required: ["id", "title", "body"], properties: { id: { type: "string" }, title: { $ref: "#/$defs/localized" }, body: { $ref: "#/$defs/localized" } } },
    asset: { type: "object", required: ["src", "license", "provenance"], properties: { src: { type: "string" }, alt: { type: "string" }, license: { type: "string" }, provenance: { type: "string" } } }
  }
});

const qaFor = (definition) => ({
  schemaVersion: 1, template: definition.id,
  requiredGates: [
    { id: "composition-identity", question: `Does the page preserve the ${definition.category} composition rather than falling back to a generic split screen?`, test: "Compare the running desktop and mobile page with contract.identity.composition." },
    { id: "interaction-identity", question: `Does ${definition.interaction}`, test: "Exercise forward, reverse, fast, slow, pointer, touch, and keyboard input where applicable." },
    { id: "information-first", question: "Does readable DOM information remain the primary outcome?", test: "Disable WebGL or media and verify headings, records, facts, and navigation remain understandable." },
    { id: "semantic-spatial-role", question: "Does every spatial state perform the declared information job?", test: "Map each visual state or selection to the claim it explains." },
    { id: "unobstructed-content", question: "Are important text and controls readable at every transition and selection?", test: "Inspect 1440x900, 1280x720, 390x844, and 360x800." },
    { id: "mobile-recomposition", question: "Is mobile deliberately reconstructed rather than scaled down?", test: "Compare content order, visual framing, controls, and protected copy zones." },
    { id: "reduced-motion", question: "Is every information result available with reduced motion enabled?", test: "Emulate prefers-reduced-motion and traverse or select every state." }
  ],
  runtime: ["No console errors or missing assets.", "No horizontal document overflow.", "No jump, flash, or stale frame at boundaries.", "Refresh and resize preserve a valid semantic state.", "Native browsing input is not trapped."],
  performance: { desktop: "No sustained jank during the primary interaction.", mobile: "Use DPR cap and preserve native touch momentum.", assetFailure: "Fallback content remains readable." }
});

const heroSvg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f6f7fb"/><stop offset="1" stop-color="#dce1ea"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="22" stdDeviation="20" flood-opacity=".16"/></filter></defs><rect width="1600" height="1000" fill="url(#g)"/><g filter="url(#s)" transform="translate(120 170)"><path d="M70 510L530 330l680 80-430 240z" fill="#c9ced8"/><path d="M530 330l680 80v90l-680-72z" fill="#aeb5c2"/><path d="M70 510l460-180v98L70 610z" fill="#e8eaf0"/><g fill="#202738">${Array.from({length:18},(_,i)=>`<rect x="${180+(i%6)*150}" y="${430+Math.floor(i/6)*58}" width="100" height="28" transform="skewY(-8)"/>`).join("")}</g><g stroke="#8e96a6" stroke-width="8">${[0,1,2,3,4].map(i=>`<path d="M${160+i*260} 440v-210m0 0l-70 80m70-80l70 80"/>`).join("")}</g></g><path d="M0 850h1600" stroke="#aeb4c0"/><text x="90" y="110" font-family="monospace" font-size="18" letter-spacing="5" fill="#232a3b">NORTH ARRAY / MASTER SPATIAL PLATE</text></svg>`;
const detailSvg = (tone, flip = false) => `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="${tone}"/><g transform="${flip ? "translate(1000 0) scale(-1 1)" : ""}"><path d="M110 720L480 300l400 210-360 300z" fill="#f1f2f5"/><path d="M480 300l400 210v95L480 405z" fill="#b7bdc8"/><path d="M110 720l370-420v105L110 830z" fill="#d8dce4"/><g stroke="#252b39" stroke-width="10" fill="none"><path d="M200 690l300-320 290 150-300 250z"/><path d="M280 650l230-220 190 100-220 180z"/></g></g><text x="70" y="90" font-family="monospace" font-size="17" letter-spacing="4" fill="#242a38">PRE-RENDERED SECTION / WEBMOTION</text></svg>`;

function writeJson(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`); }
function write(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, value); }

for (const definition of definitions) {
  const base = path.join(templateRoot, definition.id);
  const adapterId = definition.scene ? "react-r3f" : "react-media";
  const adapter = path.join(base, "adapters", adapterId);
  fs.mkdirSync(path.join(adapter, "src"), { recursive: true });
  for (const source of ["main.jsx", "motion.js", "Scene.jsx", "App.jsx", "styles.css"]) {
    if (!definition.scene && source === "Scene.jsx") {
      write(path.join(adapter, "src", source), "export default function Scene() { return null; }\n");
    } else {
      write(path.join(adapter, "src", source), fs.readFileSync(path.join(sourceRoot, source), "utf8"));
    }
  }
  write(path.join(adapter, "src/template.config.js"), `export default ${JSON.stringify(definition, null, 2)};\n`);
  const dependencies = { "@vitejs/plugin-react": "^6.0.5", "lenis": "^1.3.25", react: "^19.2.8", "react-dom": "^19.2.8", vite: "^8.2.0" };
  if (definition.scene) { dependencies["@react-three/fiber"] = "^9.7.0"; dependencies.three = "^0.185.1"; }
  writeJson(path.join(adapter, "package.json"), { name: `webmotion-${definition.id}`, private: true, version: "0.1.0", type: "module", scripts: { dev: "vite --host 0.0.0.0", build: "vite build", preview: "vite preview --host 0.0.0.0" }, dependencies });
  write(path.join(adapter, "vite.config.js"), `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nexport default defineConfig({ plugins: [react()], server: { port: ${definition.port}, strictPort: true } });\n`);
  write(path.join(adapter, "index.html"), `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#0b0b0c"/><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='32' fill='%230b0b0c'/%3E%3Ctext x='32' y='40' text-anchor='middle' font-family='Arial' font-size='20' fill='%23d8ff53'%3E${definition.code}%3C/text%3E%3C/svg%3E"/><title>WebMotion — ${definition.displayName}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>\n`);
  write(path.join(adapter, "README.md"), `# ${definition.displayName} React adapter\n\nRun \`npm install --ignore-scripts\` and \`npm run dev\`. Content and art direction live in \`src/template.config.js\`; the interaction contract lives at \`../../contract.json\`.\n`);
  if (!definition.scene) {
    write(path.join(adapter, "public/media/hero.svg"), heroSvg);
    write(path.join(adapter, "public/media/detail-a.svg"), detailSvg("#d8dde7"));
    write(path.join(adapter, "public/media/detail-b.svg"), detailSvg("#d9d1c4", true));
  }
  writeJson(path.join(adapter, "ASSET_LICENSES.json"), { schemaVersion: 1, assets: definition.scene ? [] : [{ path: "public/media/hero.svg", license: "CC0-1.0", provenance: "Original procedural SVG authored for WebMotion." }, { path: "public/media/detail-a.svg", license: "CC0-1.0", provenance: "Original procedural SVG authored for WebMotion." }, { path: "public/media/detail-b.svg", license: "CC0-1.0", provenance: "Original procedural SVG authored for WebMotion." }] });

  const contract = {
    schemaVersion: 1, template: definition.id, experienceSpec: definition.code,
    identity: { category: definition.category, informationGoal: definition.purpose, composition: definition.composition, interaction: definition.interaction, semantic3d: definition.semantic3d },
    invariants: definition.invariants,
    stateModel: { owner: "experience-state", deterministic: "The same progress or selection input must reconstruct the same information and visual state.", states: definition.chapters.map((chapter) => chapter.id), selectionItems: definition.items.map((item) => item.code || item.label) },
    layers: [{ id: "base", role: "page atmosphere and ordinary media", depth: 0 }, { id: "spatial", role: "declared spatial information carrier", depth: 20 }, { id: "editorial", role: "headings, records, captions, facts, and controls", depth: 40 }, { id: "utility", role: "navigation, language, progress, and accessibility controls", depth: 60 }],
    inputs: definition.inputs, responsive: definition.responsive,
    reducedMotion: { behavior: definition.scene ? "Disable smoothing and continuous ambient travel; expose stable states or direct selection." : "Keep still spatial plates and disable optional playback.", required: "All headings, records, controls, and conclusions remain available." },
    provenance: "Original WebMotion contract and demonstration adapter based on observable interaction mechanics only. No reference-site source code, assets, copy, fonts, models, or brand identity are included."
  };
  writeJson(path.join(base, "contract.json"), contract);
  writeJson(path.join(base, "schema/config.schema.json"), commonSchema(definition));
  writeJson(path.join(base, "config.example.json"), { locale: { default: "zh", supported: ["zh", "en"] }, content: { hero: definition.hero, intro: definition.intro, chapters: definition.chapters, items: definition.items }, assets: {}, motion: { desktop: {}, mobile: {}, reduced: definition.scene ? "stable-states" : "static-media" } });
  writeJson(path.join(base, "qa/checkpoints.json"), qaFor(definition));
  write(path.join(base, "LICENSE"), "CC0 1.0 Universal\n\nTo the extent possible under law, the author has waived all copyright and related or neighboring rights to this WebMotion template package.\n");
  write(path.join(base, "README.md"), `# ${definition.displayName}\n\nWebMotion ${definition.code} template for ${definition.purpose.toLowerCase()}\n\n## Interaction identity\n\n${definition.interaction}\n\n## Adapter\n\nThe included ${adapterId} adapter uses fictional bilingual copy and original procedural visuals. Replace content in \`adapters/${adapterId}/src/template.config.js\`.\n`);
  const manifest = {
    schemaVersion: 1, id: definition.id, name: definition.displayName, version: "0.1.0", availability: "adapter", license: "CC0-1.0",
    provenance: "Original WebMotion contract, fictional bilingual content, procedural visuals, and adapter code. No third-party brand assets or copied implementation code.",
    experience: { spec: definition.code, category: definition.category, capabilities: definition.capabilities },
    adapters: [{ id: adapterId, available: true, path: `adapters/${adapterId}`, entry: `adapters/${adapterId}/src/main.jsx`, compatibility: definition.scene ? { react: ">=19 <20", reactThreeFiber: ">=9 <10", three: ">=0.185 <0.186", vite: ">=8 <9" } : { react: ">=19 <20", vite: ">=8 <9" } }],
    assetSlots: definition.assetSlots.map((id) => ({ id, type: id.includes("copy") || id.includes("record") || id.includes("ledger") || id.includes("spec") ? "structured-content" : id.includes("motion") || id.includes("camera") || id.includes("route") ? "motion-config" : "replaceable-media", required: true, distribution: "replaceable-demo-included", config: `adapters/${adapterId}/src/template.config.js` })),
    compatibility: { webmotion: ">=0.1.0", browser: definition.scene ? "Modern browser with WebGL2 recommended; readable fallback required" : "Modern browser; no WebGL required", framework: `Framework-neutral contract with a ${adapterId} adapter` },
    entrypoints: { contract: "contract.json", configExample: "config.example.json", configSchema: "schema/config.schema.json", qa: "qa/checkpoints.json", adapter: `adapters/${adapterId}` }, files: []
  };
  writeJson(path.join(base, "manifest.json"), manifest);
  console.log(`Generated ${definition.code} ${definition.id}`);
}

const indexPath = path.join(root, "registry/index.json");
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
for (const entry of index.templates) {
  if (entry.id === "foreground-product") entry.experienceSpec = "E02";
  if (entry.id === "spatial-editorial-journey") entry.experienceSpec = "E04";
}
for (const definition of definitions) {
  const entry = { id: definition.id, name: definition.displayName, version: "0.1.0", availability: "adapter", experienceSpec: definition.code, category: definition.category, summary: definition.summary, demo: { url: `http://localhost:${definition.port}/`, label: "打开实例" }, license: "CC0-1.0" };
  const current = index.templates.findIndex((item) => item.id === definition.id);
  if (current >= 0) index.templates[current] = entry; else index.templates.push(entry);
}
index.templates.sort((a, b) => (a.experienceSpec || "Z99").localeCompare(b.experienceSpec || "Z99"));
index.registryVersion = "0.2.0";
index.generatedAt = new Date().toISOString();
writeJson(indexPath, index);
