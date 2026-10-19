import articleData from './data/articles.json';

// 个人内容集中在这里管理。没有发布内容时，页面显示真实的空状态。
export const profile = {
  name: '杨国栋',
  role: 'AI 产品经理',
  headline: ['把想法写下来，', '把灵感做出来。'],
  description: '这里有我的思考、作品，以及不断探索的记录。',
  github: 'https://github.com/yguodong627-star',
  email: 'ethan@163.com',
  phone: '18579856118',
};
export type ArticleBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph' | 'callout' | 'code'; text: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'list'; kind: 'ordered' | 'unordered' | 'checklist'; items: string[] };
export type Article = { slug: string; title: string; date: string; summary: string; tag: string; cover: string; minutes: number; blocks: ArticleBlock[] };
export type Project = {
  slug: string; title: string; english: string; tagline: string; description: string;
  category: '文档工具' | '工作效率' | '经营工具' | '生活工具' | '信息整理';
  tag: string; coverLabel: string; image: string; screenshots: string[]; url: string; github: string;
  features: string[]; note?: string; featured?: boolean; pending?: boolean;
};
export const articles = [...articleData as Article[]].sort((a, b) => b.date.localeCompare(a.date));
export const projects: Project[] = [
  {
    "slug": "zhoubao",
    "title": "周报台",
    "english": "WEEKLY DESK",
    "tagline": "让零散信息，成为周报的起点。",
    "description": "适合需要写周报和跟踪行业动态的产品、运营人员，在周末汇总时，聚合关注的信息源整理周报素材。部分国内站点因浏览器限制可能抓不到。",
    "category": "信息整理",
    "tag": "信息聚合 / 周报素材",
    "image": "./media/portfolio/screens/zhoubao.webp",
    "screenshots": [
      "./media/portfolio/screens/zhoubao.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-zhoubao/",
    "github": "https://github.com/yguodong627-star/vibe-zhoubao",
    "features": [
      "聚合关注的信息源",
      "整理周报素材"
    ],
    "note": "部分国内站点受浏览器限制，可能无法抓取。",
    "featured": true,
    "coverLabel": "聚合信息源，整理周报素材"
  },
  {
    "slug": "piaoju",
    "title": "票据夹",
    "english": "RECEIPT ARCHIVE",
    "tagline": "让每张票据，都有迹可循。",
    "description": "适合需要报销和对账的上班族、财务和个体户，在积攒发票票据时，上传图片识别关键信息并归档查找。清晰印刷体效果较好，歪斜或有阴影的图片可能识别失败。",
    "category": "文档工具",
    "tag": "票据识别 / 归档查找",
    "image": "./media/portfolio/screens/piaoju.webp",
    "screenshots": [
      "./media/portfolio/screens/piaoju.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-piaoju/",
    "github": "https://github.com/yguodong627-star/vibe-piaoju",
    "features": [
      "上传票据图片",
      "识别票据关键信息",
      "归档与查找票据"
    ],
    "note": "清晰印刷体识别效果较好；歪斜或带有阴影的图片可能识别失败，请核对识别结果。",
    "featured": true,
    "coverLabel": "识别票据信息，归档查找"
  },
  {
    "slug": "zhuanwen",
    "title": "转文",
    "english": "TEXT LENS",
    "tagline": "把杂乱的文字，整理成可用的资料。",
    "description": "适合整理文本和表格资料的学生与办公人群，把去空行、去重、标点整理和查找替换串成规则链；支持表格互转与批量处理，数据留在浏览器本地。",
    "category": "文档工具",
    "tag": "文本清洗 / 表格互转",
    "image": "./media/portfolio/screens/zhuanwen.webp",
    "screenshots": [
      "./media/portfolio/screens/zhuanwen.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-zhuanwen/",
    "github": "https://github.com/yguodong627-star/vibe-zhuanwen",
    "features": [
      "组合文本清洗规则，去空行与重复行",
      "整理中英文排版与标点",
      "提取邮箱、链接等文本内容",
      "表格互转与批量处理"
    ],
    "note": "数据在浏览器本地处理，整理完成后可复制或下载结果。",
    "featured": true,
    "coverLabel": "清洗文本，转换表格数据"
  },
  {
    "slug": "pdfbox",
    "title": "页匠 PDF 工具箱",
    "english": "PDF WORKSHOP",
    "tagline": "让文档处理，少几次辗转。",
    "description": "适合上班族、学生和行政人员，在处理合同、资料时，本地完成合并、拆分、水印、签名、转图片和压缩 PDF，文件不出本机。",
    "category": "文档工具",
    "tag": "本地处理 / PDF 工具箱",
    "image": "./media/portfolio/screens/pdfbox.webp",
    "screenshots": [
      "./media/portfolio/screens/pdfbox.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-pdfbox/",
    "github": "https://github.com/yguodong627-star/vibe-pdfbox",
    "features": [
      "PDF 合并与拆分",
      "添加水印与签名",
      "PDF 转图片与压缩",
      "文件在本机处理，无需上传"
    ],
    "featured": true,
    "coverLabel": "合并、拆分与处理 PDF"
  },
  {
    "slug": "gongzuotai",
    "title": "工作台",
    "english": "TASK STUDIO",
    "tagline": "让每天的进展，一目了然。",
    "description": "适合个人安排每天的待办和任务时，用看板拖动卡片管理进度。",
    "category": "工作效率",
    "tag": "任务看板 / 进度管理",
    "image": "./media/portfolio/screens/gongzuotai.webp",
    "screenshots": [
      "./media/portfolio/screens/gongzuotai.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-gongzuotai/",
    "github": "https://github.com/yguodong627-star/vibe-gongzuotai",
    "features": [
      "安排每日待办和任务",
      "拖动看板卡片管理进度"
    ],
    "coverLabel": "拖动任务卡片，管理工作进度"
  },
  {
    "slug": "crm",
    "title": "客簿",
    "english": "CLIENT NOTES",
    "tagline": "把每次跟进，接成一条线。",
    "description": "适合自由职业者和独立经营者，在跟进客户时，记录客户信息和跟进情况，不用上复杂的 CRM。",
    "category": "经营工具",
    "tag": "客户记录 / 跟进管理",
    "image": "./media/portfolio/screens/crm.webp",
    "screenshots": [
      "./media/portfolio/screens/crm.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-crm/",
    "github": "https://github.com/yguodong627-star/vibe-crm",
    "features": [
      "记录客户信息",
      "记录与跟踪客户跟进情况"
    ],
    "coverLabel": "记录客户，跟进项目与报价",
    "note": "数据仅保存在当前浏览器；当前实站为单人使用，不支持多人协作。提醒仅在打开页面时显示。"
  },
  {
    "slug": "kaidan",
    "title": "开单",
    "english": "INVOICE DESK",
    "tagline": "从报价到开单，清楚又利落。",
    "description": "适合小商家、个体户和自由职业者，在给客户报价、出销售单时，快速开出规范的单据并保存导出，不用再手写或套 Excel。",
    "category": "经营工具",
    "tag": "报价开单 / 保存导出",
    "image": "./media/portfolio/screens/kaidan.webp",
    "screenshots": [
      "./media/portfolio/screens/kaidan.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-kaidan/",
    "github": "https://github.com/yguodong627-star/vibe-kaidan",
    "features": [
      "快速制作报价与销售单",
      "保存与导出单据"
    ],
    "coverLabel": "制作报价单，保存导出"
  },
  {
    "slug": "profit-calc",
    "title": "利润定价计算器",
    "english": "PRICING LAB",
    "tagline": "每一次定价，都有依据。",
    "description": "适合电商卖家、摆摊和小店老板，在定价或调价时，输入成本、费用和目标利润率，算出不亏钱的售价和实际利润，避免凭感觉定价。",
    "category": "经营工具",
    "tag": "成本测算 / 利润定价",
    "image": "./media/portfolio/screens/profit-calc.webp",
    "screenshots": [
      "./media/portfolio/screens/profit-calc.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-profit-calc/",
    "github": "https://github.com/yguodong627-star/vibe-profit-calc",
    "features": [
      "输入成本、费用和目标利润率",
      "计算不亏钱的售价",
      "查看实际利润"
    ],
    "coverLabel": "算清成本、售价与利润",
    "note": "计算依赖输入的成本、费率与汇率；结果为估算，请结合实际账单核对。"
  },
  {
    "slug": "fenhao",
    "title": "分好",
    "english": "FAIR SHARE",
    "tagline": "一起花的钱，清清楚楚地分。",
    "description": "适合聚餐、出游和合租的朋友同事，在多人垫付费用后，算出每人该付多少、最少转账几次。",
    "category": "生活工具",
    "tag": "多人分账 / 转账优化",
    "image": "./media/portfolio/screens/fenhao.webp",
    "screenshots": [
      "./media/portfolio/screens/fenhao.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-fenhao/",
    "github": "https://github.com/yguodong627-star/vibe-fenhao",
    "features": [
      "计算多人垫付后的分摊金额",
      "计算更少转账次数的结算方案"
    ],
    "coverLabel": "多人分账，减少结算转账"
  },
  {
    "slug": "caiwu",
    "title": "细水账",
    "english": "FLOW LEDGER",
    "tagline": "把日常开销，理成生活的线索。",
    "description": "适合想搞清楚钱花在哪的个人和家庭，在月底复盘时，导入支付宝、微信账单，按类别统计支出。",
    "category": "生活工具",
    "tag": "账单导入 / 支出分析",
    "image": "./media/portfolio/screens/caiwu.webp",
    "screenshots": [
      "./media/portfolio/screens/caiwu.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-caiwu/",
    "github": "https://github.com/yguodong627-star/vibe-caiwu",
    "features": [
      "导入支付宝与微信账单",
      "按类别统计支出"
    ],
    "coverLabel": "导入账单，看清支出"
  },
  {
    "slug": "subwake",
    "title": "订醒",
    "english": "SUBWAKE",
    "tagline": "让续费之前，多一次主动选择。",
    "description": "适合订阅了很多会员和软件的人，在订阅快到期续费前，管理订阅并提醒，避免忘记取消被自动扣费。",
    "category": "生活工具",
    "tag": "订阅管理 / 续费提醒",
    "image": "./media/portfolio/screens/subwake.webp",
    "screenshots": [
      "./media/portfolio/screens/subwake.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-subwake/",
    "github": "https://github.com/yguodong627-star/vibe-subwake",
    "features": [
      "集中管理会员与软件订阅",
      "订阅到期与续费提醒"
    ],
    "coverLabel": "管理订阅，留意续费",
    "note": "数据保存在当前浏览器。续费与试用提醒在页面内显示，请自行留意到期时间并定期备份。"
  },
  {
    "slug": "liteshot",
    "title": "压片 LiteShot",
    "english": "LITESHOT",
    "tagline": "让图片轻一点，让传递快一点。",
    "description": "适合运营、设计和普通办公人群，在发图、传文件或上传网站被体积限制时，在浏览器本地压缩图片，不上传、不泄露。",
    "category": "文档工具",
    "tag": "图片压缩 / 本地处理",
    "image": "./media/portfolio/screens/liteshot.webp",
    "screenshots": [
      "./media/portfolio/screens/liteshot.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-liteshot/",
    "github": "https://github.com/yguodong627-star/vibe-liteshot",
    "features": [
      "在浏览器本地压缩图片",
      "图片无需上传"
    ],
    "coverLabel": "批量压缩与处理图片"
  },
  {
    "slug": "shoujixiang",
    "title": "拾页",
    "english": "PAGE COLLECTION",
    "tagline": "把读过的好内容，留下来。",
    "description": "适合经常看文章做资料积累的人，在浏览网页时，收藏链接并摘录要点，建立个人资料库。",
    "category": "信息整理",
    "tag": "网页收藏 / 要点摘录",
    "image": "./media/portfolio/screens/shoujixiang.webp",
    "screenshots": [
      "./media/portfolio/screens/shoujixiang.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-shoujixiang/",
    "github": "https://github.com/yguodong627-star/vibe-shoujixiang",
    "features": [
      "收藏网页链接",
      "摘录文章要点",
      "积累个人资料库"
    ],
    "coverLabel": "收藏网页，整理阅读资料"
  },
  {
    "slug": "shuanglian",
    "title": "链记",
    "english": "LINKED NOTES",
    "tagline": "让零散的笔记，连接成知识。",
    "description": "适合希望连接知识、持续复习的学习者，在浏览器本地记录笔记，通过双向链接、标签与图谱梳理关系，并安排间隔复习。",
    "category": "信息整理",
    "tag": "双链笔记 / 图谱与复习",
    "image": "./media/portfolio/screens/shuanglian.webp",
    "screenshots": [
      "./media/portfolio/screens/shuanglian.webp",
      "./media/portfolio/screens/shuanglian-graph.webp"
    ],
    "url": "https://yguodong627-star.github.io/vibe-shuanglian/",
    "github": "https://github.com/yguodong627-star/vibe-shuanglian",
    "features": [
      "用双向链接与标签连接笔记",
      "查看链接图谱与标签图谱",
      "用挖空和间隔复习回顾知识",
      "导出 Markdown ZIP 或 JSON 备份"
    ],
    "coverLabel": "双链笔记，连接知识与复习",
    "note": "笔记保存在当前浏览器，建议定期导出备份。"
  }
];

// 以下为首页产品思考的文案草稿，等待本人确认。
export const principles = [
  { title: '先理解问题', text: '弄清楚用户想完成的事，也看见现有流程里真正费力的地方。' },
  { title: '让想法可体验', text: '把抽象判断变成可以点击、可以操作、可以讨论的具体原型。' },
  { title: '在反馈里迭代', text: '让每一次尝试留下证据，再决定下一步应该改什么。' },
];
export const practice = [
  { label: 'DEFINE / 定义', question: '用户真正要完成的是什么？', summary: '先描述任务，再讨论功能。', text: '明确使用者、场景、输入与期望结果。把“提高效率”拆成一段具体过程，找出当前最难完成或最容易出错的环节。' },
  { label: 'BUILD / 构建', question: '最小的可体验版本是什么？', summary: '先走通一条真实路径。', text: '围绕最需要验证的假设，做出足够真实的交互。保留完成任务必需的步骤，让体验本身帮助发现问题。' },
  { label: 'VERIFY / 验证', question: '怎样知道它确实有用？', summary: '观察行为，也记录结果。', text: '提前约定验证方式：任务是否完成、结果是否可用、用户是否需要反复解释。把事实与推测分别记录，避免只看最好的一次表现。' },
  { label: 'ITERATE / 迭代', question: '下一轮，先改变哪一件事？', summary: '把反馈变成具体的下一步。', text: '先处理影响任务完成的阻碍，再调整表达与细节。保留已验证的部分，每次有针对性地减少一点不确定性。' },
];
