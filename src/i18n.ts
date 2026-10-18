import { useSyncExternalStore } from 'react';
import translations from './data/translations.en.json';

export type Language = 'zh' | 'en';
const key = 'yang-language';
let language: Language = 'zh';
try { language = localStorage.getItem(key) === 'en' ? 'en' : 'zh'; } catch { /* Storage may be unavailable in private contexts. */ }
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
function notify() { document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'; listeners.forEach(listener => listener()); }
export function setLanguage(next: Language) {
  language = next;
  try { localStorage.setItem(key, next); } catch { /* Switching still works without persistence. */ }
  notify();
}
window.addEventListener('storage', event => { if (event.key === key) { language = event.newValue === 'en' ? 'en' : 'zh'; notify(); } });
document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
export function useLanguage() { return useSyncExternalStore(subscribe, () => language); }
const dictionary: Record<string, string> = translations;
export function t<T>(value: T): T {
  if (language !== 'en' || typeof value !== 'string') return value;
  const translated = dictionary[value] ?? dictionary[value.trim()];
  if (translated) return translated as T;
  const patterns: [RegExp, (name: string, index?: string) => string][] = [
    [/^查看(.+)详情$/, name => `View ${t(name)} details`],
    [/^(.+) GitHub 仓库$/, name => `${t(name)} GitHub repository`],
    [/^(.+)真实项目界面$/, name => `${t(name)} actual interface`],
    [/^(.+)原始截图 (\d+)$/, (name, index) => `${t(name)} screenshot ${index}`],
    [/^阅读(.+)$/, name => `Read ${t(name)}`],
    [/^(.+)主题封面$/, name => `${t(name)} article cover`],
    [/^查看截图 (\d+)$/, index => `View screenshot ${index}`],
  ];
  for (const [pattern, format] of patterns) { const match = value.match(pattern); if (match) return format(match[1], match[2]) as T; }
  return value;
}
export function readTime(minutes: number) { return language === 'en' ? `${minutes} min read` : `预计 ${minutes} 分钟读完`; }
export function itemCount(count: number, kind: 'projects' | 'articles' | 'sections') {
  return language === 'en' ? `${count} ${kind === 'projects' ? 'project' : kind === 'articles' ? 'article' : 'section'}${count === 1 ? '' : 's'}` : kind === 'projects' ? `共 ${count} 件作品` : kind === 'articles' ? `共 ${count} 篇文章` : `${count} 个章节`;
}
