import { Pagination, PAGE_SIZE } from './pagination';
import { useLanguage, t, readTime, itemCount } from './i18n';
import { useState, type MouseEvent } from 'react';
import { ArrowLeft, ArrowUpRight, List, Github } from 'lucide-react';
import { articles, profile, type Article, type ArticleBlock } from './content';

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  target?.focus({ preventScroll: true });
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s<>"）。，；、]+|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return <>{parts.map((part, i) => part.startsWith('https://') || part.startsWith('http://')
    ? <a key={i} href={part} target="_blank" rel="noreferrer">{t(part)}</a>
    : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code>
    : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong>
    : part.startsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part)}</>;
}

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  const language = useLanguage();
  return <article className={`journal-card ${compact ? 'journal-card-compact' : ''}`}>
    <a className="journal-cover-link" href={`#/articles/${article.slug}`} aria-label={t(`阅读${article.title}`)}><img src={language === 'en' ? article.cover.replace('/articles/', '/articles/en/') : article.cover} alt={t(`${article.title}主题封面`)} loading="lazy" decoding="async"/></a>
    <div className="journal-card-copy"><div className="journal-meta"><span>{t(article.tag)}</span><time dateTime={article.date}>{article.date}</time></div><h2><a href={`#/articles/${article.slug}`}>{t(article.title)}</a></h2><p>{t(article.summary)}</p><div className="journal-card-bottom"><a href={`#/articles/${article.slug}`} className="journal-read-button">{t("阅读全文")}<ArrowUpRight size={15}/></a><span className="journal-reading-time">{readTime(article.minutes)}</span></div></div>
  </article>;
}

function AuthorCard() {
  useLanguage();
  return <section className="journal-author"><p className="section-index">{t("ABOUT / 关于作者")}</p><div className="journal-author-identity"><span className="journal-avatar" aria-hidden="true">Y</span><div><h2>{t("杨国栋")}</h2><p>{t(profile.role)}</p></div></div><p>{t(profile.description)}</p><a className="text-link" href="#/about">{t("更多关于我")}<ArrowUpRight size={14}/></a><a className="journal-author-github" href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/>GitHub <ArrowUpRight size={13}/></a></section>;
}

export function ArticlesPage() {
  useLanguage();
  const [topic, setTopic] = useState('全部文章');
  const [page, setPage] = useState(1);
  const topics = ['全部文章', 'AI 洞察', '技术入门', '产品方法'];
  const visible = topic === '全部文章' ? articles : articles.filter(a => a.tag === topic);
  const currentPage = Math.min(page, Math.max(1, Math.ceil(visible.length / PAGE_SIZE)));
  const paged = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <section className="page-shell journal-page">
    <header className="journal-intro"><p className="section-index">{t("JOURNAL / 文章")}</p><h1>{t("把想法写下来，")}<br/><span>{t("让思考有迹可循。")}</span></h1><p>{t("关于 AI 的理解、产品的判断，以及从想法到实践的过程。")}<br/>{t("把值得继续追问的问题，慢慢写清楚。")}</p></header>
    <div className="journal-topicbar" id="article-results"><div><p className="section-index">{t("EXPLORE TOPICS / 按主题阅读")}</p><div className="portfolio-filters" role="group" aria-label={t("按文章主题筛选")}>{topics.map(topicName => <button key={topicName} type="button" aria-pressed={topic === topicName} onClick={() => { setTopic(topicName); setPage(1); }}>{t(topicName)}<span>{topicName === '全部文章' ? articles.length : articles.filter(a => a.tag === topicName).length}</span></button>)}</div></div><p className="journal-count" aria-live="polite">{itemCount(visible.length, 'articles')}</p></div>
    <div className="journal-layout"><div className="journal-results"><div className="journal-list">{paged.map(a => <ArticleCard key={a.slug} article={a}/>)}</div><Pagination current={currentPage} total={visible.length} onChange={setPage} target="article-results" caption="文字记录思考，也为下一次探索留下线索。"/></div><aside className="journal-sidebar" aria-label={t("作者与推荐文章")}><AuthorCard/><section className="journal-recommend"><h2 className="section-index">{t("START HERE / 从这里读起")}</h2>{['agent-refund-workflow', 'rag-finetuning-context', 'ai-feature-prd'].map((slug, i) => { const a = articles.find(a => a.slug === slug)!; return <a href={`#/articles/${a.slug}`} key={slug}><span>0{i + 1}</span><div><small>{t(a.tag)}</small><h3>{t(a.title)}</h3></div><ArrowUpRight size={16}/></a>; })}</section><div className="journal-side-note"><span>{String(articles.length).padStart(2, '0')}</span><p>{t("篇思考与记录")}<br/>{t("保持好奇，继续前进。")}</p></div></aside></div>
  </section>;
}

function BodyBlock({ block, index }: { block: ArticleBlock; index: number }) {
  useLanguage();
  if (block.type === 'heading') {
    const Heading = block.level === 2 ? 'h2' : 'h3';
    return <Heading id={`section-${index}`} tabIndex={-1}><Inline text={block.text}/></Heading>;
  }
  if (block.type === 'table') return <div className="article-table-scroll" tabIndex={0} role="region" aria-label={t("文章表格，可横向滚动")}><table><thead><tr>{block.rows[0].map((cell, i) => <th scope="col" key={i}><Inline text={cell}/></th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}><Inline text={cell}/></td>)}</tr>)}</tbody></table></div>;
  if (block.type === 'list') {
    const Tag = block.kind === 'ordered' ? 'ol' : 'ul';
    return <Tag className={block.kind === 'checklist' ? 'article-checklist' : undefined}>{block.items.map((item, i) => <li key={i}><Inline text={item}/></li>)}</Tag>;
  }
  if (block.type === 'callout') return <aside className="article-keynote"><span>{t("阅读提要")}</span><p><Inline text={block.text}/></p></aside>;
  if (block.type === 'code') return <pre tabIndex={0}><code>{block.text}</code></pre>;
  return <p><Inline text={block.text}/></p>;
}

export function ArticlePage({ article }: { article: Article }) {
  const language = useLanguage();
  const headings = article.blocks.map((b, i) => ({ ...b, index: i })).filter(b => b.type === 'heading' && b.level === 2);
  const toc = <nav aria-label={t("文章目录")}>{headings.map((h, i) => <a key={h.index} href={`#section-${h.index}`} onClick={e => scrollToSection(e, `section-${h.index}`)}><span>{String(i + 1).padStart(2, '0')}</span>{'text' in h ? h.text : ''}</a>)}</nav>;
  return <article className="page-shell journal-post">
    <a className="back-link" href="#/articles"><ArrowLeft size={15}/>{t("全部文章")}</a>
    <header className="journal-post-header"><div className="journal-meta"><span>{t(article.tag)}</span><time dateTime={article.date}>{article.date}</time><span>{readTime(article.minutes)}</span></div><h1 lang="zh-CN">{article.title}</h1><p lang="zh-CN">{article.summary}</p><div className="journal-byline"><span className="journal-avatar" aria-hidden="true">Y</span><span>{t("杨国栋")}<small>{t("AI 产品经理")}</small></span></div></header>
    <p className="article-language-note" hidden={language !== 'en'}>{t('文章正文保留中文原文。')}</p><figure className="journal-post-cover"><img src={language === 'en' ? article.cover.replace('/articles/', '/articles/en/') : article.cover} alt={t(`${article.title}主题封面`)}/></figure>
    <details className="journal-mobile-toc"><summary><List size={16}/>{t("本文目录")}<span>{itemCount(headings.length, 'sections')}</span></summary>{toc}</details>
    <div className="journal-reading-layout"><div className="journal-prose" lang="zh-CN">{article.blocks.map((block, i) => <BodyBlock key={i} block={block} index={i}/>)}<div className="journal-endmark">— END —</div></div><aside className="journal-reading-sidebar"><div className="journal-toc"><p className="section-index">{t("ON THIS PAGE / 本文目录")}</p>{toc}<a className="journal-toc-back" href="#/articles"><ArrowLeft size={13}/>{t("返回文章列表")}</a></div></aside></div>

  </article>;
}
