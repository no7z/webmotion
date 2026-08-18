# WebMotion Catalog

本地 WebMotion 模板目录站，当前展示 E01–E10 共 10 类体验。页面数据由 `registry/index.json`、每个模板的 `manifest.json`、`contract.json` 和 QA checkpoints 自动生成。

```bash
cd ..
npm run dev
```

默认地址：`http://localhost:4188/`。全部实例由同一服务器从 `/examples/<template-id>/` 提供。

根目录命令会先构建实例并同步到 `catalog/public/examples/`，随后只启动目录站。直接在 `catalog/` 内执行 `npm run dev` 时，不会刷新这些生成文件。

新增模板后执行 `npm run sync`。如果 `public/previews/<template-id>.webp` 存在，目录卡片会自动使用它；否则显示程序化占位预览。
