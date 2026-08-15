# WebMotion

WebMotion 是一个以“最终交互效果”为身份、以框架实现为适配器的高级网页模板库。当前目录覆盖冻结分类 E01–E10；每个可安装模板都包含体验契约、配置结构、QA 门禁、审计证据、许可证与文件校验和。

## 本地查看

```bash
npm run dev:all
```

- 模板总览：`http://localhost:4188/`
- E01 System Morph：`http://localhost:4193/`
- E02 Foreground Product Journey：`http://localhost:4191/`
- E03 Fullscreen State Machine：`http://localhost:4194/`
- E04 Spatial Editorial Journey：`http://localhost:4192/`
- E05 Guided Camera Route：`http://localhost:4195/`
- E06 Narrative Spatial Handoff：`http://localhost:4196/`
- E07 Editorial Media Rhythm：`http://localhost:4197/`
- E08 Spatial Product Document：`http://localhost:4198/`
- E09 Click Spatial Index：`http://localhost:4199/`
- E10 Pre-rendered Spatial Document：`http://localhost:4200/`

## 维护命令

```bash
npm run templates:refresh
npm run build:all
node scripts/registry.mjs list
```

`templates:refresh` 会重新生成 E01、E03、E05–E10，写入审计记录，更新清单校验和并同步目录站。E02 与 E04 保留各自已经通过的独立实现。
