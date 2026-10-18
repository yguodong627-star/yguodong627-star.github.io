import { ChevronLeft, ChevronRight } from 'lucide-react';
import { t, useLanguage } from './i18n';

export const PAGE_SIZE = 4;

export function Pagination({ current, total, onChange, target, caption }: { current: number; total: number; onChange: (page: number) => void; target: string; caption: string }) {
  const language = useLanguage();
  const pages = Math.ceil(total / PAGE_SIZE);
  if (pages <= 1) return null;
  function go(page: number) {
    onChange(page);
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: 'auto' }));
  }
  return <nav className="pagination" aria-label={t('分页导航')}>
    <p className="pagination-caption">{t(caption)}</p>
    <span className="sr-only" aria-live="polite">{language === 'en' ? `Page ${current} of ${pages}` : `第 ${current} / ${pages} 页`}</span>
    <div className="pagination-controls">
      <button type="button" onClick={() => go(current - 1)} disabled={current === 1} aria-label={t('上一页')}><ChevronLeft size={16}/><span>{t('上一页')}</span></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(page => <button type="button" className="pagination-number" key={page} onClick={() => go(page)} aria-current={page === current ? 'page' : undefined} aria-label={language === 'en' ? `Page ${page}` : `第 ${page} 页`}>{page}</button>)}
      <button type="button" onClick={() => go(current + 1)} disabled={current === pages} aria-label={t('下一页')}><span>{t('下一页')}</span><ChevronRight size={16}/></button>
    </div>
  </nav>;
}
