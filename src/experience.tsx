import { useState } from 'react';
import { Plus } from 'lucide-react';
import { t, useLanguage } from './i18n';
import experience from './data/experience.json';
import './experience.css';

export function ExperienceSection() {
  useLanguage();
  const [expanded, setExpanded] = useState<string[]>([]);
  return <section className="experience-band" aria-labelledby="experience-title">
    <div className="page-shell">
      <header className="experience-heading"><div><p className="section-index">04 / EXPERIENCE</p><h2 id="experience-title">{t('工作经历')}</h2></div><p>{t('从需求分析到产品落地，持续验证与迭代。')}</p></header>
      <table className="experience-table">
        <caption className="sr-only">{t('工作经历与职责')}</caption>
        <colgroup><col className="experience-col-period"/><col className="experience-col-company"/><col className="experience-col-role"/><col className="experience-col-focus"/><col className="experience-col-action"/></colgroup>
        <thead><tr>{['时间', '公司', '岗位', '工作重点', '职责'].map(label => <th key={label} scope="col">{t(label)}</th>)}</tr></thead>
        {experience.roles.map(item => {
          const open = expanded.includes(item.id);
          return <tbody key={item.id}>
            <tr className="experience-row">
              <td className="experience-period" data-label={t('时间')}>{item.start} — {item.end}</td>
              <th scope="row" className="experience-company" data-label={t('公司')}>{t(item.company)}</th>
              <td className="experience-role" data-label={t('岗位')}>{t(item.role)}</td>
              <td className="experience-focus" data-label={t('工作重点')}>{t(item.focus)}</td>
              <td className="experience-action"><button type="button" aria-expanded={open} aria-controls={`experience-${item.id}`} aria-label={`${t(open ? '收起职责' : '查看职责')} · ${t(item.company)}`} onClick={() => setExpanded(current => open ? current.filter(id => id !== item.id) : [...current, item.id])}><span>{t(open ? '收起职责' : '查看职责')}</span><Plus size={15} className={open ? 'is-open' : ''} aria-hidden="true"/></button></td>
            </tr>
            <tr className="experience-detail-row" hidden={!open}><td colSpan={5}><div id={`experience-${item.id}`} className={`experience-details ${item.projects.length === 1 ? 'experience-details-single' : ''}`}>
              {item.projects.map(project => <section key={project.title}><h3>{t(project.title)}</h3><p className="experience-project-ownership">{t(project.ownership)}</p><p className="experience-detail-label">{t('主要职责')}</p><ul>{project.responsibilities.map(text => <li key={text}>{t(text)}</li>)}</ul>{project.results.length > 0 && <><p className="experience-detail-label">{t('项目成果')}</p><ul className="experience-results">{project.results.map(text => <li key={text}>{t(text)}</li>)}</ul></>}</section>)}
            </div></td></tr>
          </tbody>;
        })}
      </table>
      <div className="experience-education"><span>{t('教育背景')}</span><p>{t(experience.education)}</p></div>
    </div>
  </section>;
}
