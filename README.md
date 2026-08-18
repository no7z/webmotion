# WebMotion

WebMotion 是一个面向 Agent 与创作者的高级网页动效模板库。它以用户最终感受到的构图、滚动和空间交互作为模板身份，把 React、Vue 或其他框架视为可替换的实现适配器。

当前仓库收录 E01–E10 十种体验类型，并为可安装模板提供体验契约、结构化配置、可替换素材槽位、QA 门禁、审计记录、许可证和文件校验和。示例均以浏览信息为主，不以游戏或独立 3D Viewer 为目标。

## 设计原则

- **按体验分类**：区分连续形变、全屏状态机、引导式镜头、空间索引等真实交互差异，而不是按 React/Vue 分类。
- **内容优先**：3D、滚动和转场必须帮助解释内容，不能遮挡关键信息。
- **可被 Agent 使用**：契约说明哪些体验特征必须保留；配置和素材槽位说明哪些内容可以替换。
- **可验证**：每个模板都带 QA 检查点、审计证据和可复现的示例。
- **响应式重构**：桌面与手机共享叙事目标，但允许不同的构图、镜头和交互密度。
- **中英文友好**：示例支持语言与字体选择，并分别控制中英文字距和排版节奏。

## 快速开始

需要 Node.js 20+ 和 npm。

```bash
git clone https://github.com/no7z/webmotion.git
cd webmotion

# 安装目录站、E02 演示和所有可运行适配器的依赖
for project in catalog tests/foreground-product-e2e registry/templates/*/adapters/*; do
  [ -f "$project/package.json" ] && npm install --prefix "$project"
done

npm run dev
```

打开 [http://localhost:4188/](http://localhost:4188/)。目录站和全部实例共用一个端口，实例位于 `/examples/<template-id>/`。

`npm run dev` 会先构建并同步全部实例，再启动目录服务器；`npm run dev:all` 是它的同义命令。生成的 `catalog/public/examples/` 不提交到 Git。

## 安装 Agent Skills

使用标准 Agent Skills CLI 安装：

```bash
npx skills add no7z/webmotion
```

CLI 会自动发现 `webmotion`、`webmotion-use`、`webmotion-tune`、`webmotion-audit` 和 `webmotion-pack`，并交互式选择安装范围与目标 Agent。建议安装完整集合，因为入口 Skill 会按任务调用其余四个工作流。

只为 Codex 全局安装完整集合，并跳过交互确认：

```bash
npx skills add no7z/webmotion --skill '*' --agent codex --global --yes
```

当前 GitHub 仓库是私有的，因此安装者需要已有 Git 凭据、GitHub CLI 登录或 SSH 权限；仓库公开后同一命令可直接使用。CLI 自带更新、检查和删除能力：

```bash
npx skills list --global --agent codex
npx skills update --global
npx skills remove --global webmotion webmotion-use webmotion-tune webmotion-audit webmotion-pack
```

`webmotion-use` 内置了经过校验的模板 Registry，安装后不依赖原始仓库路径。安装完成后直接对 Agent 说“用 WebMotion 做一个网页”即可；如果当前任务没有立即发现它们，新建一个 Codex 任务。

## 模板目录

| 编号 | 模板 | 体验身份 | 本地路由 | 状态 |
| --- | --- | --- | --- | --- |
| E01 | System Morph | 连续构图形变 | `/examples/system-morph/` | 可安装适配器 |
| E02 | Foreground Product Journey | 前景产品引导旅程 | `/examples/foreground-product/` | 契约与演示 |
| E03 | Fullscreen State Machine | 全屏内部状态机 | `/examples/fullscreen-state-machine/` | 可安装适配器 |
| E04 | Spatial Editorial Journey | 空间化编辑叙事 | `/examples/spatial-editorial-journey/` | 可安装适配器 |
| E05 | Guided Camera Route | 引导式镜头路线 | `/examples/guided-camera-route/` | 可安装适配器 |
| E06 | Narrative Spatial Handoff | 叙事到空间索引交接 | `/examples/narrative-spatial-handoff/` | 可安装适配器 |
| E07 | Editorial Media Rhythm | 编辑媒体节奏 | `/examples/editorial-media-rhythm/` | 可安装适配器 |
| E08 | Spatial Product Document | 空间化产品文档 | `/examples/spatial-product-document/` | 可安装适配器 |
| E09 | Click Spatial Index | 点击式空间索引 | `/examples/click-spatial-index/` | 可安装适配器 |
| E10 | Pre-rendered Spatial Document | 预渲染空间媒体文档 | `/examples/prerendered-spatial-document/` | 可安装适配器 |

E02 当前用于验证体验契约，不提供可复制的框架适配器；其余模板均可从 registry 安装。

## 查看和安装模板

```bash
# 列出全部模板
node scripts/registry.mjs list

# 查看体验契约、兼容性、素材槽位和文件清单
node scripts/registry.mjs show guided-camera-route

# 先检查将要安装的文件
node scripts/registry.mjs install guided-camera-route \
  --dest /path/to/your-project \
  --dry-run

# 安装到目标项目
node scripts/registry.mjs install guided-camera-route \
  --dest /path/to/your-project
```

模板会写入目标项目的 `.webmotion/templates/<template-id>/`。安装命令会先验证 manifest 中的 SHA-256 校验和，并拒绝覆盖已有目标。

安装后建议按这个顺序使用：

1. 阅读 `contract.json`，确认必须保留的体验特征和禁止退化项。
2. 复制 `config.example.json`，按 `schema/config.schema.json` 填写内容与动效参数。
3. 在适配器的配置文件中替换图片、模型、文字、字体和运动轨迹。
4. 使用 `qa/checkpoints.json` 验证桌面端、手机端、降级模式和 reduced motion。
5. 通过审计后再打包成可复用模板。

部分模板可在开发模式提供素材与文字替换页面；它只修改配置引用，不是图片编辑器，也不应进入最终生产页面。

## Agent Skills

仓库内的 Skills 把模板工作流拆成短而明确的步骤：

| Skill | 用途 |
| --- | --- |
| `webmotion` | 交互式入口，先补全目标、内容、素材和体验选择 |
| `webmotion-use` | 选择、检查并安装模板 |
| `webmotion-tune` | 替换素材、文字、字体和轨迹，同时守住体验契约 |
| `webmotion-audit` | 检查视觉、交互、手机重构、性能与可访问性门禁 |
| `webmotion-pack` | 将审核通过的实现整理为可复用模板 |

用户无需记住仓库内部路径；从 `webmotion` 开始，Agent 应通过简短提问补齐必要资料，再路由到对应 Skill。

## 开发单个模板

如果只修改一个案例，可启用独立的 Vite 热更新服务器：

```bash
npm run dev:template -- guided-camera-route
```

可用的模板 ID 与 `node scripts/registry.mjs list` 输出一致。完整目录验收仍应使用 `npm run dev`，以确认子路由和资源基路径正确。

## 维护与构建

```bash
# 重新生成 E01、E03、E05–E10，并更新审计、manifest 和目录数据
npm run templates:refresh

# 将十个实例构建到目录站的 /examples/ 子路由
npm run examples:sync

# 更新并验证 npx 安装包内置的模板 Registry
npm run skills:registry
npm run skills:registry:check

# 构建全部实例和最终目录站
npm run build:all

# 单独构建目录站
npm run catalog:build
```

E02 与 E04 保留各自已经审核通过的独立实现，不由通用生成器覆盖。`npm run build:all` 的最终静态产物位于 `catalog/dist/`，可部署到支持目录索引的静态托管服务。

## 项目结构

```text
webmotion/
├── catalog/                         # 模板目录站
├── registry/
│   ├── index.json                   # 模板索引
│   └── templates/<id>/              # 契约、配置、QA、审计和适配器
├── scripts/
│   ├── template-sources/            # 通用生成模板的源文件
│   ├── registry.mjs                 # 模板查看与安装命令
│   ├── sync-examples.mjs            # 构建并同步实例子路由
│   ├── sync-skill-registry.mjs      # 生成自包含的 Skill Registry
│   └── dev-all.mjs                  # 单端口开发入口
├── skills/                           # WebMotion Agent Skills
└── tests/                            # 独立 E2E 与体验验证项目
```

## 质量边界

- 推荐使用支持 WebGL2 的现代浏览器；3D 不可用时必须保留可阅读的 CSS/HTML 降级内容。
- 示例中的大体积 R3F bundle 是模板验证基线，不代表生产项目已经完成按路由拆包、模型压缩和纹理优化。
- 发布前至少检查关键信息无遮挡、3D 具有语义、手机端仍可浏览、交互可逆、reduced motion 可用。
- 模板当前使用虚拟双语内容与原创/程序化素材，不包含第三方品牌实现代码。

## 许可证

当前 registry 模板均标记为 `CC0-1.0`。每个模板的具体许可证、来源说明与素材许可记录以其 `manifest.json`、`LICENSE` 和 `ASSET_LICENSES.json` 为准。
