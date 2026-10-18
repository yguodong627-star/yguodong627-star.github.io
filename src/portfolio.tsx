import { Pagination, PAGE_SIZE } from './pagination';
import { useLanguage, t, itemCount } from './i18n';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronLeft, Github } from 'lucide-react';
import { projects, type Project } from './content';

export function ProjectCover({ project }: { project: Project }) {
  useLanguage();
  return <div className={`portfolio-cover screenshot-cover cover--${project.slug}`}>
    <div className="cover-live-window"><div className="cover-live-bar" aria-hidden="true"><i/><i/><i/><span>{project.url.replace('https://', '')}</span></div><img src={project.image} alt={t(`${project.title}真实项目界面`)} loading="lazy" decoding="async"/></div>
  </div>;
}

export function ProjectCard({ project }: { project: Project }) {
  useLanguage();
  return <article className="portfolio-card">
    <a className="portfolio-cover-link" href={`#/works/${project.slug}`} aria-label={t(`查看${project.title}详情`)}><ProjectCover project={project}/></a>
    <div className="portfolio-card-meta"><p className="portfolio-tag">{t(project.tag)}</p><a className="portfolio-title-link" href={`#/works/${project.slug}`}><h3>{t(project.title)}</h3><ArrowUpRight size={23} strokeWidth={1.5}/></a><p className="portfolio-description">{t(project.description)}</p><div className="portfolio-card-links"><a href={`#/works/${project.slug}`}>{t("查看作品")}<ArrowRight size={14}/></a><a href={project.url} target="_blank" rel="noreferrer">{t("在线体验")}<ArrowUpRight size={14}/></a><a href={project.github} target="_blank" rel="noreferrer" aria-label={t(`${project.title} GitHub 仓库`)}><Github size={14}/> {t("代码")}</a></div></div>
  </article>;
}

export function WorksPage() {
  useLanguage();
  const [category, setCategory] = useState('全部');
  const [page, setPage] = useState(1);
  const categories = ['全部', ...new Set(projects.map(p => p.category))];
  const visible = category === '全部' ? projects : projects.filter(p => p.category === category);
  const currentPage = Math.min(page, Math.max(1, Math.ceil(visible.length / PAGE_SIZE)));
  const paged = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <section className="page-shell inner-page works-page"><div className="page-title animate-fade-rise"><p className="eyebrow">{t("SELECTED WORKS / 作品集")}</p><h1><span>{t("让想法，")}</span><span>{t("有一个具体的模样。")}</span></h1><p>{t("从具体的日常需求出发，把信息整理、文档处理与工作流程，做成可以体验的工具。")}</p></div><div className="works-lab-strip"><span><i aria-hidden="true"/> {t("PRODUCT LAB / 产品实践")}</span><span>{String(projects.length).padStart(2, '0')} {t("件作品")}<span className="lab-divider">/</span>{t("从需求到可体验的工具")}</span></div><div className="portfolio-toolbar" id="works-results"><div className="portfolio-filters" role="group" aria-label={t("按作品类型筛选")}>{categories.map(c => <button type="button" key={c} onClick={() => { setCategory(c); setPage(1); }} aria-pressed={category === c}>{t(c)}<span>{c === '全部' ? projects.length : projects.filter(p => p.category === c).length}</span></button>)}</div><p aria-live="polite">{itemCount(visible.length, 'projects')}</p></div><div className="portfolio-grid">{paged.map(p => <ProjectCard key={p.slug} project={p}/>)}</div><Pagination current={currentPage} total={visible.length} onChange={setPage} target="works-results" caption="让想法落地，让每一次尝试都有具体的模样。"/></section>;
}

export function ProjectPage({ project }: { project: Project }) {
  useLanguage();
  const [selected, setSelected] = useState(0);
  const nextProject = projects[(projects.findIndex(p => p.slug === project.slug) + 1) % projects.length];
  return <article className="project-detail"><div className="page-shell"><a className="back-link project-back" href="#/works"><ChevronLeft size={16}/>{t("全部作品")}</a><header className="project-detail-heading"><div><p className="section-index">{t(project.english)} / {t(project.tag)}</p><h1>{t(project.title)}</h1><p className="project-tagline">{t(project.tagline)}</p></div><div className="project-detail-actions"><a href={project.url} target="_blank" rel="noreferrer" className="project-launch">{t("在线体验")}<ArrowUpRight size={17}/></a><a href={project.github} target="_blank" rel="noreferrer"><Github size={17}/>{t("查看代码")}<ArrowUpRight size={15}/></a></div></header><ProjectCover project={project}/><section className="project-overview"><div><p className="section-index">01 / ABOUT THE PROJECT</p><h2>{t("关于这个作品")}</h2></div><div><p className="project-long-description">{t(project.description)}</p>{project.note && <aside className="project-note">{t(project.note)}</aside>}{project.pending && <aside className="project-note">{t("这件作品的说明仍在核对中。截图与链接已保留，确认后更新。")}</aside>}{project.features.length > 0 && <ul className="project-features">{project.features.map((f, i) => <li key={f}><span>0{i + 1}</span>{t(f)}</li>)}</ul>}</div></section>{project.screenshots.length > 0 && <section className="project-gallery"><div className="content-section-heading"><div><p className="section-index">02 / REAL SCREENS</p><h2>{t("界面与细节")}</h2></div><span className="small-label">{selected + 1} / {project.screenshots.length}</span></div><div className="project-gallery-view"><img src={project.screenshots[selected]} alt={t(`${project.title}原始截图 ${selected + 1}`)} decoding="async"/></div><div className="project-gallery-options" role="group" aria-label={t("选择作品截图")}>{project.screenshots.map((s, i) => <button key={s} onClick={() => setSelected(i)} aria-pressed={selected === i} aria-label={t(`查看截图 ${i + 1}`)}><img src={s} alt="" loading="lazy"/><span>{t("截图 0")}{i + 1}</span></button>)}</div></section>}<a className="project-next" href={`#/works/${nextProject.slug}`}><div><span className="section-index">{t("NEXT PROJECT / 下一个作品")}</span><h2>{t(nextProject.title)}</h2></div><ArrowRight size={30} strokeWidth={1}/></a></div></article>;
}
