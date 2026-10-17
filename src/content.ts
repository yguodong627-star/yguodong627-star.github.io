import articleData from './data/articles.json';

// 个人内容集中在这里管理。没有发布内容时，页面显示真实的空状态。
export const profile = {
  name: '杨国栋',
  role: 'AI 产品经理',
  headline: ['把想法写下来，', '把灵感做出来。'],
  description: '这里有我的思考、作品，以及不断探索的记录。',
  github: 'https://github.com/yguodong627-star',
};
export type ArticleBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph' | 'callout' | 'code'; text: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'list'; kind: 'ordered' | 'unordered' | 'checklist'; items: string[] };
export type Article = { slug: string; title: string; date: string; summary: string; tag: string; cover: string; minutes: number; blocks: ArticleBlock[] };
export type Project = {
  slug: string; title: string; english: string; tagline: string; description: string;
  category: 'AI 交互' | '生活工具' | '视觉实验' | '待确认';
  tag: string; image: string; screenshots: string[]; url: string; github: string;
  features: string[]; note?: string; featured?: boolean; pending?: boolean;
};
export const articles = articleData as Article[];
export const projects: Project[] = [
  {
    "slug": "answers-book",
    "title": "答案之书",
    "english": "THE BOOK OF ANSWERS",
    "tagline": "把犹豫，交给一页纸。",
    "category": "生活工具",
    "tag": "双语启发 / 收藏与分享",
    "description": "为日常小事犹豫时，默念问题，轻轻翻开书，获得一句中英双语启发。翻书动画与纸页声音带来安静的阅读体验，还能收藏答案、记录问题，并生成纸质卡片保存或分享。",
    "features": [
      "翻书动画与纸页声音，呈现中英双语启发",
      "收藏答案，记录当时的问题与备注",
      "生成纸质分享卡片，保存或分享",
      "网页无需登录，收藏、历史与备注保存在当前浏览器"
    ],
    "note": "体验链接打开的是可交互网页版。另有 iOS 原生应用，暂未上架；iOS 与网页数据不互通。手机宽度截图展示的是网页效果。",
    "image": "./media/portfolio/09-answers-book/screenshot-1.jpg",
    "screenshots": [
      "./media/portfolio/09-answers-book/screenshot-1.jpg",
      "./media/portfolio/09-answers-book/screenshot-2.jpg",
      "./media/portfolio/09-answers-book/screenshot-3.jpg",
      "./media/portfolio/09-answers-book/screenshot-4.jpg",
      "./media/portfolio/09-answers-book/screenshot-5.jpg",
      "./media/portfolio/09-answers-book/share-card.png"
    ],
    "url": "https://answers-book-ethan.yguodong627.chatgpt.site",
    "github": "https://github.com/yguodong627-star/answers-book"
  },
  {
    "slug": "tomjerry-chat",
    "title": "猫和老鼠聊天小屋",
    "english": "TOM & JERRY",
    "tagline": "和熟悉的角色，说点新鲜的。",
    "category": "AI 交互",
    "tag": "语音聊天 / 角色互动",
    "description": "和汤姆、杰瑞、斯派克语音聊天。角色说话时会开合嘴巴、眨眼，也可以切换模型，让对话更有陪伴感。",
    "features": [
      "汤姆、杰瑞、斯派克三个角色可切换",
      "语音对话与角色表情联动",
      "支持切换模型"
    ],
    "featured": true,
    "image": "./media/portfolio/01-tomjerry-chat/screenshot-1.png",
    "screenshots": [
      "./media/portfolio/01-tomjerry-chat/screenshot-1.png",
      "./media/portfolio/01-tomjerry-chat/screenshot-2.png",
      "./media/portfolio/01-tomjerry-chat/screenshot-3.png"
    ],
    "url": "https://yguodong627-star.github.io/tomjerry-chat/",
    "github": "https://github.com/yguodong627-star/tomjerry-chat"
  },
  {
    "slug": "lockscreen-cat",
    "title": "锁屏萌宠",
    "english": "LOCKSCREEN CAT",
    "tagline": "把日常，交给一只小萌宠。",
    "category": "生活工具",
    "tag": "iOS App / 锁屏小组件",
    "description": "用锁屏里的小猫、小狗回应步数与睡眠变化。每天一句吐槽或鼓励，也能生成卡片分享，让日常记录多一点温度。",
    "features": [
      "读取步数和睡眠，驱动萌宠表情变化",
      "小猫、小狗形象，以及每日吐槽或鼓励",
      "生成分享卡片；另提供网页版演示"
    ],
    "note": "体验链接打开的是网页版演示。iOS App 需要在 Mac 上通过 Xcode 安装。",
    "featured": true,
    "image": "./media/portfolio/02-lockscreen-cat/screenshot-2.png",
    "screenshots": [
      "./media/portfolio/02-lockscreen-cat/screenshot-1.png",
      "./media/portfolio/02-lockscreen-cat/screenshot-2.png",
      "./media/portfolio/02-lockscreen-cat/screenshot-3.png"
    ],
    "url": "https://yguodong627-star.github.io/lockscreen-cat/",
    "github": "https://github.com/yguodong627-star/lockscreen-cat"
  },
  {
    "slug": "ridge",
    "title": "岚山",
    "english": "RIDGE",
    "tagline": "把一座山，放进此刻。",
    "category": "视觉实验",
    "tag": "生成山景 / 动态壁纸",
    "description": "随真实时间变化的层叠山景。可以分享同一座山，也能导出 iPhone 壁纸，让屏幕成为一处安静的风景。",
    "features": [
      "山景随真实时间变化",
      "通过链接分享同一座山",
      "导出 iPhone 壁纸"
    ],
    "featured": true,
    "image": "./media/portfolio/07-ridge/screenshot-1.png",
    "screenshots": [
      "./media/portfolio/07-ridge/screenshot-1.png",
      "./media/portfolio/07-ridge/screenshot-2.png"
    ],
    "url": "https://yguodong627-star.github.io/vibe-ridge/",
    "github": "https://github.com/yguodong627-star/vibe-ridge"
  },
  {
    "slug": "subwake",
    "title": "订醒",
    "english": "SUBWAKE",
    "tagline": "让每一笔订阅，心里有数。",
    "category": "生活工具",
    "tag": "订阅管理 / 本地数据",
    "description": "把每月、全年订阅开销和近期扣费放在一张台账里。查看下周账单、留意试用到期，数据只保存在浏览器本地。",
    "features": [
      "汇总每月和全年订阅开销",
      "查看下周扣费与试用到期提醒",
      "数据只保存在当前浏览器本地"
    ],
    "note": "数据保存在浏览器本地。更换设备或清除浏览器数据时，需注意保留自己的记录。",
    "featured": true,
    "image": "./media/portfolio/08-subwake/screenshot-1.png",
    "screenshots": [
      "./media/portfolio/08-subwake/screenshot-1.png",
      "./media/portfolio/08-subwake/screenshot-2.png"
    ],
    "url": "https://yguodong627-star.github.io/vibe-subwake/",
    "github": "https://github.com/yguodong627-star/vibe-subwake"
  },
  {
    "slug": "ink-bloom",
    "title": "墨韵",
    "english": "INK BLOOM",
    "tagline": "一点墨，慢慢晕开。",
    "category": "视觉实验",
    "tag": "水墨互动 / PNG 导出",
    "description": "在宣纸上点按或拖动落墨，看墨色像水墨一样缓缓晕开。可以切换墨色、清空画面，也能将作品导出为 PNG。",
    "features": [
      "在宣纸上点按或拖动落墨，观看水墨晕染",
      "切换墨色与清空画面",
      "将画面导出为 PNG"
    ],
    "image": "./media/portfolio/03-ink-bloom/screenshot-1.png",
    "screenshots": [
      "./media/portfolio/03-ink-bloom/screenshot-1.png",
      "./media/portfolio/03-ink-bloom/screenshot-2.png",
      "./media/portfolio/03-ink-bloom/screenshot-5.png",
      "./media/portfolio/03-ink-bloom/screenshot-6.png"
    ],
    "url": "https://yguodong627-star.github.io/vibe-ink-bloom/",
    "github": "https://github.com/yguodong627-star/vibe-ink-bloom"
  },
  {
    "slug": "tide-breath",
    "title": "潮息",
    "english": "TIDE BREATH",
    "tagline": "跟着潮水，慢一点呼吸。",
    "category": "生活工具",
    "tag": "呼吸节奏 / 放松练习",
    "description": "跟随潮水般的视觉节奏进行呼吸练习。提供平静、方块与 4-7-8 三种模式，为睡前或日常休息留一段安静的时间。",
    "features": [
      "平静、方块、4-7-8 三种呼吸模式",
      "视觉节奏引导呼吸过程",
      "适用于日常休息与睡前放松"
    ],
    "image": "./media/portfolio/05-tide-breath/screenshot-2.png",
    "screenshots": [
      "./media/portfolio/05-tide-breath/screenshot-1.png",
      "./media/portfolio/05-tide-breath/screenshot-2.png"
    ],
    "url": "https://yguodong627-star.github.io/vibe-tide-breath/",
    "github": "https://github.com/yguodong627-star/vibe-tide-breath"
  },
  {
    "slug": "hue-weave",
    "title": "拾色",
    "english": "HUE WEAVE",
    "tagline": "把颜色，排成心动的顺序。",
    "category": "视觉实验",
    "tag": "色彩益智 / 色卡收集",
    "description": "通过渐变色排序完成关卡，在游戏中收集色卡。关卡持续生成，还能复制 HEX 或 CSS 色值，把喜欢的配色带走。",
    "features": [
      "渐变色排序的益智玩法",
      "持续生成关卡，通关收集色卡",
      "复制 HEX 或 CSS 色值"
    ],
    "image": "./media/portfolio/06-hue-weave/screenshot-2.png",
    "screenshots": [
      "./media/portfolio/06-hue-weave/screenshot-1.png",
      "./media/portfolio/06-hue-weave/screenshot-2.png"
    ],
    "url": "https://yguodong627-star.github.io/vibe-hue-weave/",
    "github": "https://github.com/yguodong627-star/vibe-hue-weave"
  },
  {
    "slug": "loom",
    "title": "织时 Loom",
    "english": "LOOM",
    "tagline": "把专注，织进每一个当下。",
    "category": "生活工具",
    "tag": "专注计时 / 本地日志",
    "description": "按番茄钟节奏在专注、短休、长休之间循环。开始前写下“此刻意图”，完成的专注段会记进“今日织就”日志，数据保存在浏览器本地。",
    "features": [
      "专注、短休、长休三种计时模式循环",
      "开始前记录“此刻意图”",
      "完成的专注段写入“今日织就”日志",
      "数据保存在浏览器本地"
    ],
    "image": "./media/portfolio/04-loom/screenshot-1.png",
    "screenshots": [
      "./media/portfolio/04-loom/screenshot-1.png",
      "./media/portfolio/04-loom/screenshot-2.png"
    ],
    "url": "https://yguodong627-star.github.io/vibe-loom/",
    "github": "https://github.com/yguodong627-star/vibe-loom"
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
