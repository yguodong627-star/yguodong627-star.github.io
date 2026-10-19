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

- `src/i18n.ts`、`src/data/translations.en.json`：中英文界面与项目介绍；语言选择保存在浏览器，文章详情的标题与正文保留中文，列表标题及文章和项目封面随语言切换。
- `src/content.ts`：姓名、身份、首页文案与 14 件作品的资料。
- `src/data/articles.json`：10 篇文章及正文结构，日期依据内容时间线安排并倒序显示；核对依据见《文章日期核对记录.md》。
- `src/articles.tsx`、`src/articles.css`：文章列表（每页 4 篇，日期倒序）、主题筛选、封面、正文、目录与阅读时间。
- `src/portfolio.tsx`：作品分类、每页 4 个的分页、真实界面封面与详情画廊。
- `src/main.tsx`：导航、首页、关于我和页脚。
- `src/experience.tsx`、`src/experience.css`、`src/data/experience.json`：首页深色工作经历区、职责展开与简历摘要。
- `src/portfolio-theme.css`：作品页深色主题、真实截图封面、筛选和语言切换样式。
- `src/styles.css`、`src/depth-motion.css`：全站视觉、响应式布局和层次效果。
- `src/use-page-motion.ts`：按页面与滚动触发的一次性入场动效；尊重减少动态效果的系统偏好。
- `public/media/articles/`：单独绘制的 SVG 文章封面，未使用原 Word 文档图片。
- `public/media/portfolio/`：真实项目界面截图；screens/en/ 为仅用于封面的英文翻译预览，原项目不变。
- `scripts/cover-previews/`：英文项目封面的来源版本、翻译文案与采集说明。
- `scripts/build-english-article-covers.mjs`：生成文章英文 SVG 封面。

头像、个人照片和完整个人简介暂不展示。首页工作经历根据用户提供的简历整理，支持中英文与职责展开。Y 字标是当前品牌视觉。首页、关于我和全站页脚展示用户授权公开的邮箱、电话（微信同号）与 GitHub，联系信息在 src/content.ts 的 profile 中维护。文末参考资料、编辑说明与延伸阅读已按要求从网页正文移除；阅读时间按正文长度估算。

详细资料维护见《文章导入说明.md》《作品内容与图片说明.md》。重新运行文章导入脚本会覆盖文章数据与主题封面，执行前应保留手动编辑。上级目录的原始 Word 文档与 portfolio 资料不会上传到此仓库。

## 发布与更新

网站已发布：<https://ysdtn.com/>

公开仓库：<https://github.com/yguodong627-star/yguodong627-star.github.io>。GitHub 仓库的 Settings → Pages 使用 GitHub Actions 发布。工作流 `.github/workflows/pages.yml` 安装锁定依赖、检查资源、构建并部署 `dist/`；更新 `main` 后重新发布。

发布流程参考 [GitHub Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 与 [Vite 静态部署指南](https://vite.dev/guide/static-deploy.html#github-pages)。自定义域名 `ysdtn.com` 已绑定并启用强制 HTTPS；`www` 证书尚待核验。新聊天接手请先读《项目交接说明.md》。

本地预览截图、依赖、构建缓存、环境文件由 `.gitignore` 排除。

## 素材

首页视频由用户选定的 MotionSites Velorah 案例提示词提供，已保存为本地文件。Instrument Serif、Inter 附有字体许可证；中文字体使用系统字体。文章与作品资料由用户提供，文章主题封面为本项目独立绘制。
