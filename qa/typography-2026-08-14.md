# WebMotion 中英文排版审计

- 日期：2026-08-14
- 浏览器：gstack browse headed Chromium
- 桌面视口：1440×900
- 手机视口：390×844
- 范围：模板目录站与 E01–E10 全部实例

## 修正原则

### 中文

- 正文使用苹方优先的系统无衬线字体栈。
- 展示标题使用 Iowan/Baskerville 拉丁字符与宋体中文字符混排字体栈。
- 标题不继承英文标题的负字距和压缩行高。
- 桌面标题采用 `letter-spacing: 0.035em`、`line-height: 1.08–1.10`。
- 手机标题采用 `letter-spacing: 0.025em`、`line-height: 1.12–1.14`。
- 正文采用约 `0.018–0.022em` 字距和 `1.85–1.90` 行高。
- 使用严格中文换行、平衡标题换行、正文优化换行及中英文自动间距。

### 英文

- 展示标题统一使用 Iowan Old Style、Baskerville、Georgia 的衬线回退栈，避免各模板采用不一致的系统默认字体。
- 桌面标题采用约 `letter-spacing: -0.01em`、`line-height: 0.98–0.99`；保留展示感，但不再使用过度压缩的字距和行高。
- 手机标题取消负字距，采用 `letter-spacing: 0`、`line-height: 1.04–1.05`。
- 手机长标题采用 `font-size: clamp(46px, 13.5vw, 58px)`，让换行承担排版，而不是把字挤进一行。
- 英文正文采用约 `letter-spacing: 0.006em`、桌面 `line-height: 1.82`、手机 `line-height: 1.78`。
- 模板目录中的英文模板名与摘要同步放宽行高和字距。

## 字体选择器

- `编辑体 / Editorial`：宋体与 Iowan/Baskerville 衬线标题，适合叙事和编辑式页面。
- `现代体 / Modern`：苹方与 Avenir/Helvetica 无衬线标题，适合产品和技术信息。
- `人文体 / Humanist`：楷体与 Optima/Avenir 标题，适合文化、档案和作品集表达。
- `几何体 / Geometric`：兰亭黑与 Futura/Century Gothic，适合建筑、系统和理性结构。
- `圆体 / Rounded`：圆体与 Arial Rounded，适合友好、生活方式和轻产品表达。
- `时尚体 / Fashion`：仿宋与 Didot/Bodoni，适合美妆、奢侈品和展览海报。
- 三种预设全部使用系统字体回退栈，不加载外部字体文件，不增加字体网络请求或首屏字体闪烁。
- 选择会写入 `localStorage`，切换中英文不会重置，刷新当前实例后仍保留。
- 选择器位于首屏导航下方，并随页面滚走，不作为固定浮层覆盖后续章节。
- 共享模板生成源已包含该能力，后续刷新 E01、E03、E05–E10 时会继续保留；E02、E04 和模板目录使用各自的等价实现。

## 浏览器证据

### 中文

| 页面 | 中文主标题手机行高比 | 手机横向溢出 | 标题超出视口 |
|---|---:|---|---|
| 模板目录 | 1.14 | 无 | 无 |
| E01 System Morph | 1.12 | 无 | 无 |
| E02 Foreground Product | 1.14 | 无 | 无 |
| E03 Fullscreen State Machine | 1.12 | 无 | 无 |
| E04 Spatial Editorial Journey | 1.12 | 无 | 无 |
| E05 Guided Camera Route | 1.12 | 无 | 无 |
| E06 Narrative Spatial Handoff | 1.12 | 无 | 无 |
| E07 Editorial Media Rhythm | 1.12 | 无 | 无 |
| E08 Spatial Product Document | 1.12 | 无 | 无 |
| E09 Click Spatial Index | 1.12 | 无 | 无 |
| E10 Pre-rendered Spatial Document | 1.12 | 无 | 无 |

### 英文

| 页面 | 英文主标题手机行高比 | 手机横向溢出 | 标题超出视口 |
|---|---:|---|---|
| 模板目录 | 1.06 | 无 | 无 |
| E01 System Morph | 1.04 | 无 | 无 |
| E02 Foreground Product | 1.05 | 无 | 无 |
| E03 Fullscreen State Machine | 1.04 | 无 | 无 |
| E04 Spatial Editorial Journey | 1.04 | 无 | 无 |
| E05 Guided Camera Route | 1.04 | 无 | 无 |
| E06 Narrative Spatial Handoff | 1.04 | 无 | 无 |
| E07 Editorial Media Rhythm | 1.04 | 无 | 无 |
| E08 Spatial Product Document | 1.04 | 无 | 无 |
| E09 Click Spatial Index | 1.04 | 无 | 无 |
| E10 Pre-rendered Spatial Document | 1.04 | 无 | 无 |

浏览器字体检查结果：`PingFang SC`、`Songti SC`、`Iowan Old Style` 均可用。所有模板的中英文切换会同步更新 `lang` 和 locale 类，不会让两种语言共用一套压缩参数。英文长标题已逐页截图核验，均在 390px 视口内正常换行并保留安全边距。

字体选择器回归结果：模板目录与 E01–E10 共 11 个页面均能在六种预设间切换；计算字体栈发生对应变化，刷新持久化通过，390×844 视口无横向溢出，控件首屏边界全部位于视口内。长页面滚动后控件离开视口，不遮挡正文或章节标题。六种中文效果已并排检查，其中时尚体使用仿宋回退，避免与编辑体的宋体视觉身份重复。

## 非阻塞提示

- React Three Fiber 页面仍会显示既有的 `THREE.Clock` 弃用警告，本次字体修改没有引入新的控制台错误。
- 最终字体审美仍需人工判断；本报告只确认字体回退、间距、换行和视口边界等客观结果。
