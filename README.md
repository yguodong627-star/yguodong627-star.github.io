# YANG · 杨国栋的个人网站

React + Vite + TypeScript + Tailwind CSS 的个人网站，面向 GitHub Pages 静态托管。首页、文章、作品、关于我使用哈希路由，详情链接可以直接打开和刷新。

## 本地运行与检查

```sh
npm ci
npm run dev
npm run check:content
npm run build
npm run preview
```

构建结果在 `dist/`，无需手动编辑。资源使用相对路径；字体、视频、封面和作品截图均随网站部署。

## 内容管理

- `src/content.ts`：姓名、身份、首页文案与 9 件作品的资料。
- `src/data/articles.json`：10 篇文章及正文结构，发布日期统一为“日期待定”。确定日期后修改对应的 `date` 字段。
- `src/articles.tsx`、`src/articles.css`：文章列表、主题筛选、封面、正文、目录与阅读时间。
- `src/portfolio.tsx`：作品分类、卡片、详情和截图浏览。
- `src/main.tsx`：导航、首页、关于我和页脚。
- `src/styles.css`、`src/depth-motion.css`：全站视觉、响应式布局和层次效果。
- `src/use-page-motion.ts`：按页面与滚动触发的一次性入场动效；尊重减少动态效果的系统偏好。
- `public/media/articles/`：单独绘制的 SVG 文章封面，未使用原 Word 文档图片。
- `public/media/portfolio/`：作品截图副本，原始资料不在此仓库。

头像、个人照片、完整个人简介、工作经历和新增联系方式暂不展示。Y 字标是当前品牌视觉。现有 GitHub 联系入口保留。文末参考资料、编辑说明与延伸阅读已按要求从网页正文移除；阅读时间按正文长度估算。

详细资料维护见《文章导入说明.md》《作品内容与图片说明.md》。重新运行文章导入脚本会覆盖文章数据与主题封面，执行前应保留手动编辑。上级目录的原始 Word 文档与 portfolio 资料不会上传到此仓库。

## 发布与更新

网站已发布：<https://yguodong627-star.github.io/>

公开仓库：<https://github.com/yguodong627-star/yguodong627-star.github.io>。GitHub 仓库的 Settings → Pages 使用 GitHub Actions 发布。工作流 `.github/workflows/pages.yml` 安装锁定依赖、检查资源、构建并部署 `dist/`；更新 `main` 后重新发布。

发布流程参考 [GitHub Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 与 [Vite 静态部署指南](https://vite.dev/guide/static-deploy.html#github-pages)。自定义域名 `ysdtn.com` 将在默认地址验证通过后单独配置。

本地预览截图、依赖、构建缓存、环境文件由 `.gitignore` 排除。

## 素材

首页视频由用户选定的 MotionSites Velorah 案例提示词提供，已保存为本地文件。Instrument Serif、Inter 附有字体许可证；中文字体使用系统字体。文章与作品资料由用户提供，文章主题封面为本项目独立绘制。
