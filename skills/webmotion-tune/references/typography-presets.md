# Typography presets

Use these presets when the user has not supplied a licensed brand font. Present names and short descriptions, not raw CSS stacks.

| ID | 中文 | English | Intended character | Latin display fallback | CJK display fallback |
|---|---|---|---|---|---|
| `editorial` | 编辑体 | Editorial | 叙事、杂志、文化内容 | Iowan Old Style, Baskerville | Songti SC, STSong |
| `modern` | 现代体 | Modern | 产品、科技、清晰信息 | Avenir Next, Helvetica Neue | PingFang SC, Hiragino Sans GB |
| `humanist` | 人文体 | Humanist | 作品集、档案、柔和表达 | Optima, Avenir Next | Kaiti SC, STKaiti |
| `geometric` | 几何体 | Geometric | 建筑、系统、理性结构 | Futura, Century Gothic | Lantinghei SC, Hiragino Sans GB |
| `rounded` | 圆体 | Rounded | 友好、生活方式、轻产品 | Arial Rounded MT Bold | Yuanti SC, Hiragino Maru Gothic ProN |
| `fashion` | 时尚体 | Fashion | 美妆、奢侈品、展览海报 | Didot, Bodoni 72 | STFangsong, FangSong |

## Implementation contract

- Default to `editorial` only when the user has not chosen.
- Store the selected ID under `webmotion-font-preset`; treat storage failure as non-fatal.
- Apply the preset through CSS custom properties so components do not hardcode language-specific font families.
- Keep system fallbacks after every preferred face. Do not add a remote font request unless the user supplies or approves the font and its license.
- Use the preset for display and body variables, while preserving monospace utility labels when they are part of the template identity.
- Changing the preset must not reset locale, chapter, scroll, model, or camera state.
- Audit every offered preset for title wrapping, horizontal overflow, control occlusion, font fallback, and refresh persistence at desktop and mobile viewports.
