# 项目封面英文翻译预览

英文封面是用项目原始 HTML/CSS/JS 在本地渲染后采集的截图，未修改或发布任何项目原站。中文封面、详情画廊保留原图；英文封面不代表原应用支持英文。

- `sources.json`：各项目公开源码及采集版本，视口为 1280×720。
- `translations.en.json`：封面可见界面文字的英文翻译。
- `localize.js`：仅供本地截图使用的翻译层，网站运行时不加载它。

重新采集时，在临时目录签出所记录的源码版本，将翻译字典复制为临时服务根目录下的 `yang-cover-translations.json`，翻译层复制为 `yang-cover-localize.js`。各项目临时副本的 `index.html` 在 `</body>` 前引入 `<script src="/yang-cover-localize.js"></script>`，目录名为 `yang-cover-项目slug`。用只监听本机的静态服务预览，由 CUA 浏览器检查并截图，再编码为 WebP 保存到 `public/media/portfolio/screens/en/`。不要把截图翻译层提交到项目原站。

示例数据为项目自带内容。英文文案按封面可读性做了必要的精简；截图不含私人业务数据，也不改变实际在线体验入口。
