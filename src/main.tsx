import { useLanguage, t, setLanguage } from './i18n';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Pause, Play, Github, Layers, Target, Lightbulb, RefreshCw, Plus, PenLine } from 'lucide-react';
import { Button } from './components/ui/button';
import { profile, articles, projects, principles, practice } from './content';
import { ProjectCard, WorksPage, ProjectPage } from './portfolio';
import { ArticlesPage, ArticlePage, ArticleCard } from './articles';
import './styles.css';
import './articles.css';
import './depth-motion.css';
import './portfolio-theme.css';
import './header.css';
import { usePageMotion } from './use-page-motion';

const nav = [{ path: '/', label: '首页' }, { path: '/articles', label: '文章' }, { path: '/works', label: '作品' }, { path: '/about', label: '关于我' }];
const media = `${import.meta.env.BASE_URL}media/`;

function App() {
  const language = useLanguage();
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const home = path === '/';
  const works = path === '/works' || path.startsWith('/works/');
  usePageMotion(path);
  useEffect(() => {
    if (!home) return;
    const updateHeader = () => {
      const hero = document.querySelector('.hero');
      const header = document.querySelector('.site-header');
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > (header?.clientHeight ?? 104));
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, [home]);
  useEffect(() => {
    const onHash = () => { setPath(window.location.hash.slice(1) || '/'); setMenu(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    const article = articles.find(a => `/articles/${a.slug}` === path);
    const project = projects.find(p => `/works/${p.slug}` === path);
    document.title = home ? t('YANG · 杨国栋 — 不断前进的AI产品经理') : `${t(article?.title ?? project?.title ?? nav.find(n => n.path === path)?.label ?? '页面未找到')} — YANG`;
    if (home && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { video.current?.pause(); setPaused(true); }
  }, [path, home, language]);
  useEffect(() => {
    document.body.classList.toggle('works-theme', works);
    return () => document.body.classList.remove('works-theme');
  }, [works]);
  function toggleVideo() {
    if (!video.current) return;
    if (video.current.paused) video.current.play().then(() => setPaused(false)).catch(() => setVideoFailed(true));
    else { video.current.pause(); setPaused(true); }
  }
  return <>
    <a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}>{t("跳至主要内容")}</a>
    <header className={`site-header ${home && overHero ? 'over-video' : ''} ${works ? 'works-header' : ''}`}>
      <a className="wordmark" href="#/" aria-label={t("YANG 首页")}>YANG</a>
      <nav className="desktop-nav" aria-label={t("主导航")}>{nav.map(n => <a key={n.path} href={`#${n.path}`} aria-current={(n.path === '/' ? path === '/' : path.startsWith(n.path)) ? 'page' : undefined}>{t(n.label)}</a>)}</nav>
      <div className="header-tools"><button className="language-switch" type="button" onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} aria-label={language === 'zh' ? 'Switch to English' : '切换为中文'}><span className={language === 'zh' ? 'is-active' : ''} lang="zh-CN">中</span><span aria-hidden="true">/</span><span className={language === 'en' ? 'is-active' : ''} lang="en">EN</span></button><a className="header-social" href={profile.github} target="_blank" rel="noreferrer" aria-label={t("访问我的 GitHub")}><Github size={17}/><span>GitHub</span><ArrowUpRight size={13}/></a></div>
      <Button variant="ghost" size="icon" className="menu-toggle" aria-label={t(menu ? '关闭导航' : '打开导航')} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X size={22}/> : <Menu size={22}/>}</Button>
      {menu && <nav className="mobile-nav liquid-glass" id="mobile-nav" aria-label={t("移动导航")}>{nav.map(n => <a key={n.path} href={`#${n.path}`} onClick={() => setMenu(false)} aria-current={(n.path === '/' ? path === '/' : path.startsWith(n.path)) ? 'page' : undefined}>{t(n.label)}<ArrowUpRight size={16}/></a>)}</nav>}
    </header>
    <main id="main" className={home ? 'home-main' : undefined} tabIndex={-1}>
      {home ? <>
        <section className="hero" aria-label={t("个人网站介绍")}>
          <video ref={video} className="hero-video" autoPlay loop muted playsInline poster={`${media}hero-poster.jpg`} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onError={() => setVideoFailed(true)} aria-hidden="true"><source src={`${media}hero.mp4`} type="video/mp4"/></video>
          <div className="hero-content">
            <p className="eyebrow animate-fade-rise">YANG GUODONG / PERSONAL WEBSITE</p>
            <h1 className="animate-fade-rise">{t("杨国栋")}<span className="hero-role">{t("AI 产品经理")}</span></h1>
            <h2 className="hero-statement animate-fade-rise-delay">{t(profile.headline[0])}<br/>{t(profile.headline[1])}</h2>
            <p className="hero-description animate-fade-rise-delay">{t(profile.description)}</p>
            <div className="hero-actions animate-fade-rise-delay-2"><Button asChild size="lg" className="hero-cta"><a href="#/works">{t("探索作品")}<ArrowUpRight size={17}/></a></Button><a className="hero-secondary" href="#/articles">{t("阅读文章")}<ArrowRight size={15}/></a></div>
          </div>
          <div className="hero-bottom"><a href="#discover" className="scroll-cue" onClick={e => { e.preventDefault(); document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }); }}><ArrowDown size={15}/><span>{t("向下探索")}</span></a><span className="hero-note">THOUGHTS, IDEAS & THINGS I MAKE</span>{!videoFailed && <Button variant="ghost" size="icon" onClick={toggleVideo} aria-label={t(paused ? '播放背景视频' : '暂停背景视频')}>{paused ? <Play size={16}/> : <Pause size={16}/>}</Button>}</div>
        </section>
        <section className="viewpoint-band" aria-labelledby="viewpoint-title"><div className="page-shell viewpoint-content"><p className="section-index">00 / PRODUCT THINKING </p><h2 id="viewpoint-title">{t("把问题想清楚，")}<br/><span>{t("再把东西做出来。")}</span></h2><p className="viewpoint-description">{t("从理解一个具体的问题开始，让想法在实践与反馈中逐渐成形。")}</p><div className="principles-grid">{principles.map((item, i) => { const Icon = [Target, Lightbulb, RefreshCw][i]; return <article className="principle" key={item.title}><span className="principle-number">0{i + 1}</span><Icon size={30} strokeWidth={1}/><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>; })}</div></div></section>
        <div className="home-content">
          <section id="discover" className="home-section page-shell" aria-labelledby="home-works-title">
            <div className="content-section-heading"><div><p className="section-index">01 / SELECTED WORKS</p><h2 id="home-works-title">{t("把灵感，做成作品。")}</h2></div><a className="section-more" href="#/works">{t("全部作品")}<ArrowUpRight size={17}/></a></div>
            <div className="portfolio-grid home-portfolio-grid">{projects.filter(p => p.featured).slice(0, 4).map(p => <ProjectCard key={p.slug} project={p}/>)}</div>
          </section>
          <section className="practice-band" aria-labelledby="practice-title"><div className="page-shell practice-layout"><div className="practice-intro"><p className="section-index">02 / IN PRACTICE </p><h2 id="practice-title">{t("从想法到作品，")}<br/>{t("经过四个问题。")}</h2><p>{t("定义、构建、验证、迭代。")}<br/>{t("让每一步，都有明确的下一步。")}</p><span className="practice-hint">{t("点击问题，展开查看")}<ArrowRight size={14}/></span></div><div className="practice-list">{practice.map((item, i) => <details key={item.label} className="practice-item" open={i === 0}><summary><span className="practice-number">0{i + 1}</span><div><span className="practice-label">{t(item.label)}</span><h3>{t(item.question)}</h3><p>{t(item.summary)}</p></div><Plus className="practice-plus" size={20} strokeWidth={1}/></summary><p className="practice-detail">{t(item.text)}</p></details>)}</div></div></section>
          <section className="home-section writing-section page-shell" aria-labelledby="home-writing-title">
            <div className="content-section-heading"><div><p className="section-index">03 / JOURNAL</p><h2 id="home-writing-title">{t("把思考，落在文字里。")}</h2><p className="section-description">{t("关于 AI、产品与创造的思考，记录理解如何在实践中逐渐清晰。")}</p></div><a className="section-more" href="#/articles">{t("全部文章")}<ArrowUpRight size={17}/></a></div>
            {articles.length ? <div className="journal-home-grid">{articles.slice(0, 3).map(a => <ArticleCard key={a.slug} article={a} compact/>)}</div> : <div className="home-article-empty"><span className="article-index">—</span><div><h3>{t("文字，正在酝酿。")}</h3><p>{t("新的思考会在这里慢慢展开。")}</p></div><a href="#/articles" aria-label={t("进入文章列表")}><ArrowUpRight size={22}/></a></div>}
          </section>
          <section className="home-section home-about page-shell" aria-labelledby="home-about-title"><div><p className="section-index">04 / ABOUT ME</p><h2 id="home-about-title">{t("你好，我是杨国栋。")}</h2><p className="home-about-role">{t("AI 产品经理")}</p><p className="home-about-description">{t(profile.description)}</p><div className="about-tags"><span>{t("AI 产品")}</span><span>{t("写作与思考")}</span><span>{t("创造与实践")}</span></div><a className="text-link" href="#/about">{t("更多关于我")}<ArrowUpRight size={16}/></a></div><div className="about-monogram" aria-label={t("杨国栋字标")}><span>{t("杨")}</span><small>YANG GUODONG</small></div></section>
          <section className="contact-band"><div className="page-shell"><p className="section-index">05 / KEEP IN TOUCH</p><div className="contact-layout"><div><h2>{t("让想法，继续发生。")}</h2><p>{t("更多探索和更新，也可以在 GitHub 找到我。")}</p></div><a className="contact-button" href={profile.github} target="_blank" rel="noreferrer"><Github size={19}/> {t("访问我的 GitHub")}<ArrowUpRight size={18}/></a></div></div></section>
        </div>
      </> : path === '/articles' ? <ArticlesPage/>
        : path === '/works' ? <WorksPage/>
        : path.startsWith('/works/') && projects.find(p => `/works/${p.slug}` === path) ? <ProjectPage key={path} project={projects.find(p => `/works/${p.slug}` === path)!}/>
        : path === '/about' ? <AboutPage/>
        : path.startsWith('/articles/') && articles.find(a => `/articles/${a.slug}` === path) ? <ArticlePage key={path} article={articles.find(a => `/articles/${a.slug}` === path)!}/>
        : <section className="page-shell inner-page"><PageTitle kicker="404" title={t("这一页还没有故事。")} description="回到首页，继续探索。"/><Button asChild><a href="#/">{t("返回首页")}<ArrowRight size={16}/></a></Button></section>}
    </main>
    <footer className="rich-footer"><div className="page-shell"><div className="footer-top"><div><a className="footer-brand" href="#/">YANG</a><p>{t("把想法写下来，把灵感做出来。")}</p></div><nav aria-label={t("页脚导航")}><span>{t("导航 / MENU")}</span>{nav.map(n => <a key={n.path} href={`#${n.path}`}>{t(n.label)}</a>)}</nav><div className="footer-contact"><span>{t("联系 / CONTACT")}</span><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {t("杨国栋")}</span><span>THOUGHTS & CREATIONS</span></div></div></footer>
  </>;
}
function AboutPage() {
  useLanguage();
  const spaces = [
    { icon: Target, label: 'PRODUCT / AI', title: '产品与 AI', text: '关于问题、场景、体验与产品判断的思考。' },
    { icon: PenLine, label: 'WORDS / IDEAS', title: '写作与思考', text: '把值得留下的想法写下来，也给新的理解留出空间。' },
    { icon: Layers, label: 'WORK / PRACTICE', title: '作品与实践', text: '展示做过的东西，记录想法如何逐渐成为可体验的作品。' },
  ];
  return <div className="about-full">
    <section className="about-hero page-shell" aria-labelledby="about-title"><div className="about-hero-copy"><p className="section-index">{t("ABOUT ME / 关于我")}</p><h1 id="about-title">{t("你好，我是杨国栋。")}<br/><span>{t("很高兴，在这里相遇。")}</span></h1><p className="about-identity">{t("AI 产品经理")}</p><p className="about-hero-description">{t(profile.description)}<br/>{t("把想法写下来，把灵感做出来。")}</p><div className="about-hero-links"><a className="about-primary-link" href="#/works">{t("看看我的作品")}<ArrowUpRight size={16}/></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16}/></a></div></div><div className="about-identity-art" aria-label={t("YANG 个人字标")}><span className="identity-art-label">YANG / PERSONAL SPACE</span><span className="identity-art-letter">Y</span><span className="identity-art-caption"><span>{t("杨国栋")}<br/>{t("AI 产品经理")}</span><span>THOUGHTS<br/>& CREATIONS ↗</span></span></div></section>
    <section className="about-facts page-shell" aria-label={t("个人空间概况")}><div><span className="fact-value">{t("AI 产品经理")}</span><span className="fact-label">{t("当前身份 / ROLE")}</span></div><div><span className="fact-value">{String(projects.length).padStart(2, '0')}<small> {t("件")}</small></span><span className="fact-label">{t("当前展示作品 / WORKS")}</span></div><div><span className="fact-value">{t("持续更新")}<span className="status-dot"/></span><span className="fact-label">{t("这个空间的状态 / STATUS")}</span></div></section>
    <section className="about-interests page-shell" aria-labelledby="about-interests-title"><div className="content-section-heading"><div><p className="section-index">01 / WHAT YOU WILL FIND HERE</p><h2 id="about-interests-title">{t("在这里，读到与看到。")}</h2></div><span className="small-label">{t("思考 · 记录 · 实践")}</span></div><div className="about-interest-grid">{spaces.map(item => <article key={item.title}><item.icon size={30} strokeWidth={1}/><span>{t(item.label)}</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}</div></section>
    <section className="about-recent page-shell"><div className="content-section-heading"><div><p className="section-index">02 / RECENT WRITING</p><h2>{t("最近写下的。")}</h2><p className="section-description">{t("关于 AI、产品与实践的近期思考。")}</p></div><a className="section-more" href="#/articles">{t("全部文章")}<ArrowUpRight size={16}/></a></div><div className="journal-home-grid">{articles.slice(0, 3).map(a => <ArticleCard key={a.slug} article={a} compact/>)}</div></section>
    <section className="contact-band about-contact"><div className="page-shell"><p className="section-index">03 / GET IN TOUCH</p><div className="contact-layout"><div><h2>{t("从一个想法，开始聊聊。")}</h2><p>{t("更多作品与更新，可以在 GitHub 找到我。")}</p></div><a className="contact-button" href={profile.github} target="_blank" rel="noreferrer"><Github size={19}/> {t("访问我的 GitHub")}<ArrowUpRight size={18}/></a></div></div></section>
  </div>;
}
function PageTitle({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  useLanguage(); return <div className="page-title animate-fade-rise"><p className="eyebrow">{t(kicker)}</p><h1>{t(title)}</h1><p>{t(description)}</p></div>; }
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
