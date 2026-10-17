"""Import text structure only; original Word documents and embedded media stay untouched."""
from pathlib import Path
import json
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / 'articles'
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
META = [
    ('03_', 'ai-coding-tools', 'AI 洞察', 'AI CODING', '工具与交付', '编辑代码、执行工程任务、生成应用，是三种不同的工作入口。用预约系统拆解工具选择、业务规则与交付责任。', '#dde6e8', '#476979', 'code'),
    ('05_', 'jev-typed-decisions', 'AI 洞察', 'TYPED DECISIONS', '有限答案的价值', '当任务只需要一个类别或判断，稳定的出口比自由表达更重要。也要看清：类型正确，为什么不等于判断正确。', '#e8e1d3', '#8b704b', 'decision'),
    ('06_', 'agent-refund-workflow', '技术入门', 'AGENT / ACTION', '从回答到行动', '从一笔退款出发，分清模型判断、工具执行与业务事实。Agent 的能力，也包括停止、确认和带着上下文交接。', '#dce7df', '#547867', 'flow'),
    ('10_', 'multi-agent-research', '产品方法', 'MULTI AGENT', '分工之后，如何合拢', '用一份竞品报告比较单 Agent 与多 Agent。并行能扩大分工空间，但交接、证据和统一口径同样需要验收。', '#e1dfeb', '#71638d', 'network'),
    ('13_', 'rag-finetuning-context', '技术入门', 'RAG / CONTEXT', '先给问题分类', '知识更新、临时分析和稳定输出，需要的未必是同一种方案。把 RAG、微调与长上下文放回具体任务里比较。', '#e4e6d8', '#737c50', 'layers'),
    ('16_', 'ai-feature-prd', '产品方法', 'AI PRODUCT / PRD', '把需求写到可验收', '“支持智能生成”之后，还有输入、结果、禁止事项和失败路径。把一句愿望，写成团队能够开发与验收的行为。', '#e9ddd7', '#996c59', 'document'),
    ('2026-10-12-', 'embedding-retrieval', '技术入门', 'EMBEDDING', '意思相近，怎样计算', '从向量、分块和索引讲到混合检索与重排。让“搜得到”有清楚的定义，也让检索与答案分别接受检查。', '#dbe7eb', '#4e7b8a', 'vector'),
    ('2026-10-13-Muse', 'agent-memory-long-tasks', 'AI 洞察', 'MEMORY / FOCUS', '记得住，也做得久', '从 Muse Wonder 的主动记忆与长任务切入，讨论个人 Agent 应怎样定义记忆规则、用户控制、确认与任务恢复。', '#dce6de', '#5c7c6a', 'memory'),
    ('2026-10-13-Token', 'token-cost-estimation', '产品方法', 'TOKEN / COST', '算到一次任务完成', '输入、输出、缓存与重试，会一起进入账单。从一次真实调用算到月度规模，再讨论成本与体验如何取舍。', '#e9e1d3', '#96784c', 'chart'),
    ('2026-10-15-', 'deep-review-document-gates', 'AI 洞察', 'DEEP REVIEW', '写完之后，认真挑刺', '从长文档深审的产品形态出发，梳理准入、冻结输入、人机分工与人工终签，让评审留下可回溯的证据。', '#e7dcd9', '#986758', 'review'),
]


def clean(text):
    text = text.replace('\u00a0', ' ').strip()
    text = text.replace('这张图对产品经理的翻译很直白', '这组变化对产品经理的启示很直白')
    text = text.replace('配图为原创概念插画，不是产品界面或测试证明。', '')
    text = text.replace('和昨天热点篇（视觉 Harness / 无损回看）也可以对照着看：那边问的是', '从视觉回看到主动记忆，可以把两个问题放在一起：一边问的是')
    text = text.replace('也请和本账号旧文对照：第一批里有《如何设计一份答案验收表》《AI 功能怎么写 PRD》《失败体验也要设计》——那些谈的是单条输出、功能说明与失败路径。本篇刻意不重复那条线。 今天谈的是', '单条输出验收、AI 功能 PRD 与失败路径设计，各自有明确的检查范围。这里进一步讨论的是')
    text = text.replace('再和昨天热点篇（Gemini 4 Argon 选型总账）并排看：那边问', '把成本与深审并排看：前者问')
    text = text.replace('；这边问「第 N 次生成出来的长文，谁有空挑刺」', '；后者问「第 N 次生成出来的长文，谁有空挑刺」')
    text = text.replace('写法与视觉语言参考：Jev 是什么？与大模型有何区别，又能在 Agent 中做什么？。参考文章仅用于分析写法，厂商事实以以上官方或研究资料核验。', '延伸阅读：Jev 是什么？与大模型有何区别，又能在 Agent 中做什么？')
    return text


def paragraphs(el):
    return '\n'.join(''.join(t.text or '' for t in p.iter(W + 't')) for p in el.iter(W + 'p'))


def convert(path):
    doc = ET.fromstring(zipfile.ZipFile(path).read('word/document.xml'))
    blocks, title, skipped = [], '', []
    code = None
    for el in doc.find(W + 'body'):
        if el.tag == W + 'tbl':
            rows = [[clean(paragraphs(c)) for c in r.findall(W + 'tc')] for r in el.findall(W + 'tr')]
            if len(rows) == 1 and len(rows[0]) == 1:
                text = re.sub(r'^导语[：:]\s*', '', rows[0][0])
                blocks.append({'type': 'callout', 'text': text})
            elif rows:
                blocks.append({'type': 'table', 'rows': rows})
            continue
        if el.tag != W + 'p':
            continue
        text = clean(paragraphs(el))
        style_el = el.find(W + 'pPr/' + W + 'pStyle')
        style = style_el.get(W + 'val') if style_el is not None else ''
        if not text:
            continue
        if text == '参考下列文章的选题展开、章节组织或视觉形式；未复制作者经历、段落或测试结果。':
            skipped.append(text)
            continue
        if style == 'Title':
            title = text
            continue
        if text.startswith('```'):
            if code is None:
                code = []
            else:
                blocks.append({'type': 'code', 'text': '\n'.join(code)})
                code = None
            continue
        if code is not None:
            code.append(text)
            continue
        if style == 'Caption' or re.match(r'^(今日配图风格|图\s*\d+\s*[：:｜|])', text) or text in ['---', '———']:
            skipped.append(text)
            continue
        if style.startswith('Heading'):
            level = 2 if style == 'Heading1' else 3
            text = re.sub(r'^([一二三四五六七八九十]+、|\d{2}\s+)', '', text)
            text = text.replace('写作参考', '延伸阅读').replace('资料与核验说明', '参考资料与说明')
            # These are short follow-up subsections, not a second top-level outline.
            if text in ['把判断放回实际工作', '预约系统的验收条件怎样落地', '一笔退款的完整状态记录', '竞品报告的对照任务书', '政策更新的一次端到端检查', '一页PRD怎样写到可以开发']:
                level = 3
            blocks.append({'type': 'heading', 'level': level, 'text': text})
        elif style in ['ListNumber', 'ListBullet'] or text.startswith('☐'):
            kind = 'checklist' if text.startswith('☐') else ('ordered' if style == 'ListNumber' else 'unordered')
            text = re.sub(r'^☐\s*', '', text)
            if blocks and blocks[-1]['type'] == 'list' and blocks[-1]['kind'] == kind:
                blocks[-1]['items'].append(text)
            else:
                blocks.append({'type': 'list', 'kind': kind, 'items': [text]})
        else:
            text = re.sub(r'\[\d+\]', '', text)
            # Split very long prose at sentence boundaries; never split URLs or templates.
            chunks = [text]
            if len(text) > 230 and 'https://' not in text and not text.startswith('['):
                chunks, current = [], ''
                for sentence in re.findall(r'.+?(?:[。！？]|$)', text):
                    current += sentence
                    if len(current) >= 110:
                        chunks.append(current)
                        current = ''
                if current:
                    if chunks and len(current) < 45:
                        chunks[-1] += current
                    else:
                        chunks.append(current)
            blocks.extend({'type': 'paragraph', 'text': t} for t in chunks)
    if code is not None:
        blocks.append({'type': 'code', 'text': '\n'.join(code)})
    # The public article ends with its body, before source/editorial appendices.
    for index, block in enumerate(blocks):
        if block['type'] == 'heading' and block['text'] in ['参考资料与说明', '参考来源', '资料与核验说明', '写作参考', '延伸阅读']:
            blocks = blocks[:index]
            break
    return title, blocks, skipped


def motif(kind, ink):
    # Original code-native line illustrations, not Word images or product screenshots.
    common = f'fill="none" stroke="{ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"'
    shapes = {
        'code': '<rect x="500" y="110" width="330" height="230" rx="10"/><path d="M500 153H830M524 132h3m15 0h3m15 0h3M585 205l-25 25 25 25m150-50 25 25-25 25m-60-70-27 95M540 307h160"/>',
        'decision': '<path d="M665 105l110 100-110 100-110-100zM555 205h-65v130m285-130h65v130"/><rect x="445" y="335" width="90" height="55" rx="7"/><rect x="795" y="335" width="90" height="55" rx="7"/><path d="m470 360 12 12 21-25M825 355l25 20m0-20-25 20"/>',
        'flow': '<rect x="490" y="110" width="130" height="70" rx="10"/><rect x="720" y="110" width="130" height="70" rx="10"/><rect x="720" y="280" width="130" height="70" rx="10"/><rect x="490" y="280" width="130" height="70" rx="10"/><path d="M620 145h100m-15-10 15 10-15 10M785 180v100m-10-15 10 15 10-15M720 315H620m15-10-15 10 15 10M555 280v-70"/>',
        'network': '<rect x="610" y="105" width="120" height="75" rx="8"/><rect x="610" y="330" width="120" height="55" rx="8"/><circle cx="515" cy="255" r="36"/><circle cx="670" cy="255" r="36"/><circle cx="825" cy="255" r="36"/><path d="M640 180l-100 45m130-45v39m30-39 100 45M540 285l75 55m55-49v39m130-45-75 55"/>',
        'layers': '<path d="m490 155 175-65 175 65-175 65zM490 235l175 65 175-65M490 315l175 65 175-65M490 155v160m350-160v160m-175-95v160"/><path d="m515 205 150 55 150-55m-300 80 150 55 150-55" opacity=".3"/>',
        'document': '<path d="M550 100h190l65 65v210H550zM740 100v65h65M585 205h100m-100 35h170m-170 35h135"/><rect x="595" y="315" width="20" height="20"/><path d="m600 323 7 7 13-17m12 12h110"/>',
        'vector': '<path d="M500 360V110m0 250h350M500 360l215-210" opacity=".45"/><circle cx="650" cy="210" r="13"/><circle cx="687" cy="185" r="10"/><circle cx="675" cy="237" r="10"/><circle cx="710" cy="210" r="10"/><circle cx="790" cy="310" r="9"/><circle cx="560" cy="170" r="9"/><circle cx="595" cy="310" r="9"/><ellipse cx="680" cy="210" rx="65" ry="63" stroke-dasharray="6 8"/>',
        'memory': '<rect x="515" y="100" width="225" height="220" rx="12"/><path d="M545 140h120m-120 35h160m-160 35h140m-140 35h80"/><rect x="665" y="245" width="170" height="120" rx="10"/><path d="M705 288h90m-90 28h65m-215 4v45h90m-15-10 15 10-15 10"/>',
        'chart': '<path d="M495 355h360M525 355V260h65v95m45 0V200h65v155m45 0V130h65v225"/><path d="m530 210 120-75 130-45m-25-5 25 5-13 22"/><path d="M495 260h360m-360-60h360m-360-60h360" stroke-dasharray="3 9" opacity=".25"/>',
        'review': '<path d="M515 95h220v265H515zM550 140h150m-150 35h125m-125 35h145m-145 35h90m-90 35h110"/><circle cx="755" cy="285" r="70"/><path d="m805 335 50 50m-130-103 20 20 43-43"/>',
    }
    return f'<g {common}>{shapes[kind]}</g>'


def cover(slug, english, label, paper, ink, kind, index):
    grid = ''.join(f'<path d="M{x} 70V410"/>' for x in range(465, 886, 35)) + ''.join(f'<path d="M465 {y}H885"/>' for y in range(95, 411, 35))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
<rect width="960" height="540" fill="{paper}"/>
<g fill="none" stroke="{ink}" stroke-width=".6" opacity=".09">{grid}</g>
<path d="M48 65H912M48 474H912" stroke="{ink}" opacity=".3"/>
<g fill="{ink}" font-family="Inter,Arial,sans-serif"><text x="48" y="45" font-size="13" letter-spacing="3">YANG / FIELD NOTES</text><text x="912" y="45" font-size="13" text-anchor="end">{index:02d}</text>
<text x="48" y="160" font-size="14" letter-spacing="2">{english}</text>
<text x="48" y="234" font-size="34" font-family="PingFang SC,Microsoft YaHei,sans-serif">{label.split('，')[0]}</text>
<text x="48" y="287" font-size="34" font-family="PingFang SC,Microsoft YaHei,sans-serif">{('，'.join(label.split('，')[1:])) if '，' in label else ''}</text>
<text x="48" y="445" font-size="12" letter-spacing="2">IDEAS · SYSTEMS · PRACTICE</text><text x="48" y="508" font-size="12" letter-spacing="2">AI PRODUCT THINKING</text><text x="912" y="508" font-size="12" text-anchor="end">杨国栋 / YANG</text></g>
{motif(kind, ink)}</svg>'''
    target = ROOT / f'public/media/articles/{slug}.svg'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(svg)


result, audit = [], []
for index, (prefix, slug, category, english, label, summary, paper, ink, kind) in enumerate(META, 1):
    matches = list(SOURCE.glob(prefix + '*.docx'))
    assert len(matches) == 1, prefix
    source = matches[0]
    title, blocks, skipped = convert(source)
    text = ''.join(b.get('text', '') + ''.join(b.get('items', [])) + ''.join(''.join(r) for r in b.get('rows', [])) for b in blocks)
    result.append({'slug': slug, 'title': title, 'tag': category, 'date': '日期待定', 'summary': summary, 'cover': f'./media/articles/{slug}.svg', 'minutes': max(1, round(len(text) / 420)), 'blocks': blocks})
    audit.append(f'| {source.name} | {slug} | {category} | {len(blocks)} | {len(skipped)} |')
    cover(slug, english, label, paper, ink, kind, index)

(ROOT / 'src/data/articles.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
(ROOT / '文章导入说明.md').write_text('''# 文章导入说明

10 篇 Word 文章导入为结构化网页正文。原始文档未改动，未提取或使用文档图片。单独绘制了 10 张 SVG 主题封面，保存在 public/media/articles，可独立替换。网页发布日期统一为“日期待定”；正文中的资料日期、来源日期与示例计算日期保留，避免改变论述条件。

保留正文、表格、列表和代码模板；按用户要求去掉文末参考资料、说明与延伸阅读；按正文长度估算并显示“预计 X 分钟读完”。删除配图风格指令、图片标题和单独的分隔标记；部分长段落按句意拆分，统一标题层级，原有编号改由目录承担。原文中的产品参数、价格与厂商说法按来稿保留，本次属于排版导入，不代表重新完成事实核验。

网站数据集中在 src/data/articles.json。以后确定日期，可修改对应文章的 date 字段。导入脚本 scripts/import-articles.py 会覆盖该数据与封面，重新导入前请先保留手动编辑。

| 原始文件 | 文章路径 | 分类 | 内容块 | 移除的配图标记等 |
| --- | --- | --- | --- | --- |
''' + '\n'.join(audit) + '\n')
print(f'已导入 {len(result)} 篇文章，生成 {len(result)} 张独立 SVG 封面。')
