# WebMotion Catalog

本地 WebMotion 模板目录站，当前展示 E01–E10 共 10 类体验。页面数据由 `registry/index.json`、每个模板的 `manifest.json`、`contract.json` 和 QA checkpoints 自动生成。

```bash
npm install
npm run dev
```

默认地址：`http://localhost:4188/`

如需同时启动总览与全部实例，请在仓库根目录运行 `npm run dev:all`。

新增模板后执行 `npm run sync`。如果 `public/previews/<template-id>.webp` 存在，目录卡片会自动使用它；否则显示程序化占位预览。
