import { useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronLeft, Github } from 'lucide-react';
import { projects, type Project } from './content';

export function ProjectCover({ project }: { project: Project }) {
  return <div className={`portfolio-cover cover--${project.slug}`}>
    <div className="cover-heading"><span>{project.english}</span><span>{project.category === '待确认' ? 'PREVIEW' : project.category}</span></div>
    <div className="cover-browser"><div className="cover-browserbar" aria-hidden="true"><span/><span/><span/><small>{project.english.toLowerCase()}</small></div><div className="cover-screen"><img src={project.image} alt={`${project.title}真实界面预览`} loading="lazy" decoding="async"/></div></div>
    {project.slug === 'lockscreen-cat' && <div className="cover-phone" aria-hidden="true"><img src={project.screenshots[2]} alt="" loading="lazy" decoding="async"/></div>}
  </div>;
}

export function ProjectCard({ project }: { project: Project }) {
  return <article className="portfolio-card">
    <a className="portfolio-cover-link" href={`#/works/${project.slug}`} aria-label={`查看${project.title}详情`}><ProjectCover project={project}/></a>
    <div className="portfolio-card-meta"><p className="portfolio-tag">{project.tag}</p><a className="portfolio-title-link" href={`#/works/${project.slug}`}><h3>{project.title}</h3><ArrowUpRight size={23} strokeWidth={1.5}/></a><p className="portfolio-description">{project.description}</p><div className="portfolio-card-links"><a href={`#/works/${project.slug}`}>查看作品 <ArrowRight size={14}/></a><a href={project.url} target="_blank" rel="noreferrer">{project.slug === 'lockscreen-cat' ? '网页演示' : '在线体验'} <ArrowUpRight size={14}/></a><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub 仓库`}><Github size={14}/> 代码</a></div></div>
  </article>;
}

export function WorksPage() {
  const [category, setCategory] = useState('全部');
  const categories = ['全部', 'AI 交互', '生活工具', '视觉实验', ...(projects.some(p => p.pending) ? ['待确认'] : [])];
  const visible = category === '全部' ? projects : projects.filter(p => p.category === category);
  return <section className="page-shell inner-page works-page"><div className="page-title animate-fade-rise"><p className="eyebrow">SELECTED WORKS / 作品集</p><h1><span>让想法，</span><span>有一个具体的模样。</span></h1><p>一些工具，一些互动实验。记录从好奇到动手的过程，也把可体验的结果留在这里。</p></div><div className="portfolio-toolbar"><div className="portfolio-filters" role="group" aria-label="按作品类型筛选">{categories.map(c => <button type="button" key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>{c}<span>{c === '全部' ? projects.length : projects.filter(p => p.category === c).length}</span></button>)}</div><p aria-live="polite">共 {visible.length} 件作品</p></div><div className="portfolio-grid">{visible.map(p => <ProjectCard key={p.slug} project={p}/>)}</div></section>;
}

export function ProjectPage({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const nextProject = projects[(projects.findIndex(p => p.slug === project.slug) + 1) % projects.length];
  return <article className="project-detail"><div className="page-shell"><a className="back-link project-back" href="#/works"><ChevronLeft size={16}/>全部作品</a><header className="project-detail-heading"><div><p className="section-index">{project.english} / {project.tag}</p><h1>{project.title}</h1><p className="project-tagline">{project.tagline}</p></div><div className="project-detail-actions"><a href={project.url} target="_blank" rel="noreferrer" className="project-launch">{project.slug === 'lockscreen-cat' ? '打开网页演示' : '在线体验'}<ArrowUpRight size={17}/></a><a href={project.github} target="_blank" rel="noreferrer"><Github size={17}/>查看代码<ArrowUpRight size={15}/></a></div></header><ProjectCover project={project}/><section className="project-overview"><div><p className="section-index">01 / ABOUT THE PROJECT</p><h2>关于这个作品</h2></div><div><p className="project-long-description">{project.description}</p>{project.note && <aside className="project-note">{project.note}</aside>}{project.pending && <aside className="project-note">这件作品的说明仍在核对中。截图与链接已保留，确认后更新。</aside>}{project.features.length > 0 && <ul className="project-features">{project.features.map((f, i) => <li key={f}><span>0{i + 1}</span>{f}</li>)}</ul>}</div></section><section className="project-gallery"><div className="content-section-heading"><div><p className="section-index">02 / REAL SCREENS</p><h2>界面与细节</h2></div><span className="small-label">{selected + 1} / {project.screenshots.length}</span></div><div className="project-gallery-view"><img src={project.screenshots[selected]} alt={`${project.title}原始截图 ${selected + 1}`} decoding="async"/></div><div className="project-gallery-options" role="group" aria-label="选择作品截图">{project.screenshots.map((s, i) => <button key={s} onClick={() => setSelected(i)} aria-pressed={selected === i} aria-label={`查看截图 ${i + 1}`}><img src={s} alt="" loading="lazy"/><span>截图 0{i + 1}</span></button>)}</div></section><a className="project-next" href={`#/works/${nextProject.slug}`}><div><span className="section-index">NEXT PROJECT / 下一个作品</span><h2>{nextProject.title}</h2></div><ArrowRight size={30} strokeWidth={1}/></a></div></article>;
}
