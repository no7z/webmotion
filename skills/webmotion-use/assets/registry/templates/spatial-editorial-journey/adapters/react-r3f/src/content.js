export const chapters = [
  {
    id: "source",
    number: "01",
    kicker: { zh: "海拔 4,860 米", en: "4,860 METRES ABOVE SEA" },
    title: { zh: "水从光里醒来", en: "WATER WAKES IN LIGHT" },
    short: { zh: "源头", en: "SOURCE" },
    body: {
      zh: "在虚构的维尔德山脉，冰层每天向后退去几厘米。一条没有名字的细流，从黑色岩脊间第一次显出方向。",
      en: "In the fictional Verde range, ice retreats by centimetres each day. Between dark ridges, an unnamed stream finds its first direction.",
    },
    stat: "4,860 m",
    tone: "ice",
  },
  {
    id: "cloud",
    number: "02",
    kicker: { zh: "雾林观测站", en: "CLOUD FOREST STATION" },
    title: { zh: "森林把河流举向天空", en: "THE FOREST LIFTS THE RIVER" },
    short: { zh: "雾林", en: "CLOUD FOREST" },
    body: {
      zh: "树冠截住水汽，苔藓把雾储存在叶片之间。研究者记录的不是一场雨，而是一座森林如何持续制造雨。",
      en: "Canopies catch vapour and moss stores fog between its leaves. The record is not of one storm, but of a forest continuously making rain.",
    },
    stat: "72%",
    tone: "forest",
  },
  {
    id: "canyon",
    number: "03",
    kicker: { zh: "北纬 06° 18′", en: "06° 18′ NORTH" },
    title: { zh: "峡谷记住每一次洪水", en: "THE CANYON REMEMBERS" },
    short: { zh: "峡谷", en: "CANYON" },
    body: {
      zh: "水位落下后，岩壁上的浅色线仍标记着上一季的峰值。地貌像一份缓慢书写、无法擦除的档案。",
      en: "When the water falls, pale lines on the rock still mark last season’s peak. The land is an archive written slowly and never erased.",
    },
    stat: "+8.4 m",
    tone: "stone",
  },
  {
    id: "life",
    number: "04",
    kicker: { zh: "河网中的生命", en: "LIFE IN THE CURRENT" },
    title: { zh: "一条河，不只流向大海", en: "A RIVER FLOWS INTO LIFE" },
    short: { zh: "生命", en: "LIFE" },
    body: {
      zh: "每条支流都连接着迁徙、繁殖与觅食的时间表。改变一段流速，可能同时改写数百种生物的季节。",
      en: "Every tributary links schedules of migration, breeding and feeding. Change one current and the seasons of hundreds of species may shift with it.",
    },
    stat: "1,240",
    tone: "ember",
  },
  {
    id: "rain",
    number: "05",
    kicker: { zh: "蒸腾的脉冲", en: "THE TRANSPIRATION PULSE" },
    title: { zh: "雨在落下之前已经启程", en: "RAIN BEGINS BEFORE IT FALLS" },
    short: { zh: "雨脉", en: "RAIN" },
    body: {
      zh: "从叶片回到云层的水，沿大陆上空形成看不见的河。它让远方的土地，也进入同一个水循环。",
      en: "Water returning from leaves to clouds forms an invisible river above the continent, drawing distant ground into the same cycle.",
    },
    stat: "20 bn t",
    tone: "rain",
  },
  {
    id: "estuary",
    number: "06",
    kicker: { zh: "淡水与潮汐交界", en: "WHERE FRESH WATER MEETS TIDE" },
    title: { zh: "河流在海边分成千条路", en: "A THOUSAND ROADS TO SEA" },
    short: { zh: "河口", en: "ESTUARY" },
    body: {
      zh: "泥沙、盐分与潮汐在红树林之间重新编排河道。旅程没有结束，只是从一条主流变成无数条缝隙。",
      en: "Silt, salt and tide redraw channels through mangroves. The journey does not end; one river simply becomes a thousand openings.",
    },
    stat: "186 km",
    tone: "sand",
  },
  {
    id: "return",
    number: "07",
    kicker: { zh: "循环重新开始", en: "THE CYCLE STARTS AGAIN" },
    title: { zh: "所有抵达，都是下一次出发", en: "EVERY ARRIVAL IS A DEPARTURE" },
    short: { zh: "回归", en: "RETURN" },
    body: {
      zh: "海面升起的水汽将再次越过森林、峡谷与冰脊。沿着同一条路线，回到一切尚未命名的地方。",
      en: "Vapour rises from the sea and crosses forest, canyon and ice once more, returning along the same route to places still unnamed.",
    },
    stat: "∞",
    tone: "night",
  },
];

export const ui = {
  zh: {
    project: "一条虚构河流的空间纪实",
    intro: "从冰川的一滴水开始，沿着雾林、峡谷与河口，追踪一条河如何塑造一片大陆。",
    begin: "滚动，进入水的旅程",
    map: "路线",
    close: "关闭",
    route: "循流而行",
    routeSub: "一条河的七次变形",
    fieldNote: "现场记录",
    archive: "流域档案",
    unit: "虚构观测数据",
    imageCaption: "维尔德流域 · 独立视觉实验",
    credits: "原创概念、文案、生成图片与程序化 3D 场景，仅用于 WebMotion 交互研究。",
  },
  en: {
    project: "A SPATIAL RECORD OF A FICTIONAL RIVER",
    intro: "Beginning with one drop beneath the ice, follow a river through cloud forest, canyon and estuary—and watch it shape a continent.",
    begin: "SCROLL TO ENTER THE CURRENT",
    map: "ROUTE",
    close: "CLOSE",
    route: "FOLLOWING THE CURRENT",
    routeSub: "SEVEN TRANSFORMATIONS OF A RIVER",
    fieldNote: "FIELD NOTE",
    archive: "WATERSHED ARCHIVE",
    unit: "FICTIONAL OBSERVATION DATA",
    imageCaption: "THE VERDE WATERSHED · AN INDEPENDENT VISUAL STUDY",
    credits: "Original concept, copy, generated imagery and procedural 3D scenes for WebMotion interaction research.",
  },
};

export const cloudTraverse = {
  zh: [
    {
      label: "进入雾层",
      title: "森林把河流举向天空",
      body: "滚轮不再翻页，而是带你沿山脊横向穿行。雾、树冠和河谷在同一空间里依次显出深度。",
    },
    {
      label: "样地 02 / 苔藓带",
      title: "水悬停在空气里",
      body: "树冠截住水汽，附生植物把雾储存在叶片之间。这里的河流，有一部分从未落到地面。",
    },
    {
      label: "样地 03 / 云线",
      title: "72% 的水来自雾",
      body: "传感器记录到，旱季里大部分可用水不是来自降雨，而是树叶从移动的云中捕获的细小水滴。",
    },
    {
      label: "离开观测线",
      title: "一座森林，也是一台造雨机器",
      body: "当山体退到身后，照片、数据与地形重新合成同一个结论：森林正在制造下游的天气。",
    },
  ],
  en: [
    {
      label: "ENTERING THE MIST",
      title: "THE FOREST LIFTS THE RIVER",
      body: "The wheel no longer turns a page. It carries you laterally along the ridge as mist, canopy and valley resolve into one continuous depth field.",
    },
    {
      label: "PLOT 02 / MOSS LINE",
      title: "WATER HANGS IN THE AIR",
      body: "Canopies catch vapour and epiphytes hold fog between their leaves. Part of this river never reaches the ground.",
    },
    {
      label: "PLOT 03 / CLOUD LINE",
      title: "72% ARRIVES AS FOG",
      body: "Sensors show that in the dry season, most available water comes not from rain but from droplets combed out of moving cloud.",
    },
    {
      label: "LEAVING THE TRANSECT",
      title: "A FOREST IS A RAIN MACHINE",
      body: "As the ridge falls behind, image, data and terrain resolve into one finding: the forest is manufacturing weather downstream.",
    },
  ],
};
