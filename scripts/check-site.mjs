import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(resolve(root, 'src/content.ts'), 'utf8');
const projects = JSON.parse(source.split('export const projects: Project[] = ')[1].split(';\n\n')[0]);
const articles = JSON.parse(readFileSync(resolve(root, 'src/data/articles.json'), 'utf8'));
const dateAudit = JSON.parse(readFileSync(resolve(root, 'scripts/article-date-audit.json'), 'utf8'));
const errors = [];
const translations = JSON.parse(readFileSync(resolve(root, 'src/data/translations.en.json'), 'utf8'));
const experience = JSON.parse(readFileSync(resolve(root, 'src/data/experience.json'), 'utf8'));
function checkTranslation(text, slug) {
  if (/[\u3400-\u9fff]/.test(text ?? '') && !translations[text]?.trim()) errors.push(`${slug}: missing English translation: ${text}`);
}
const experienceIds = new Set();
for (const role of experience.roles) {
  if (!role.id || experienceIds.has(role.id)) errors.push('Experience: missing or duplicate role id');
  experienceIds.add(role.id);
  if (!/^\d{4}\.(0[1-9]|1[0-2])$/.test(role.start) || !/^\d{4}\.(0[1-9]|1[0-2])$/.test(role.end) || role.start > role.end) errors.push(`${role.id}: invalid experience period`);
  [role.company, role.role, role.focus].forEach(text => checkTranslation(text, role.id));
  for (const project of role.projects) [project.title, project.ownership, ...project.responsibilities, ...project.results].forEach(text => checkTranslation(text, role.id));
}
checkTranslation(experience.education, 'education');
const assets = new Set(['./favicon.svg', './media/hero.mp4', './media/hero-poster.jpg', './media/inter.ttf', './media/instrument-serif.ttf']);
for (const [type, items] of [['project', projects], ['article', articles]]) {
  const seen = new Set();
  for (const item of items) {
    if (!item.slug || seen.has(item.slug)) errors.push(`${type}: missing or duplicate slug ${item.slug}`);
    seen.add(item.slug);
    if (!item.title || !item.description && !item.summary) errors.push(`${item.slug}: missing title or description`);
    if (type === 'project') {
      if (!item.coverLabel || !item.screenshots.length) errors.push(`${item.slug}: missing purpose label or real screenshot`);
      [item.title, item.tagline, item.description, item.category, item.tag, item.coverLabel, item.note, ...item.features].forEach(text => checkTranslation(text, item.slug));
      for (const url of [item.url, item.github]) {
        try { if (new URL(url).protocol !== 'https:') throw new Error(); }
        catch { errors.push(`${item.slug}: invalid external link ${url}`); }
      }
      [item.image, ...item.screenshots].forEach(path => assets.add(path));
      assets.add(item.image.replace('/screens/', '/screens/en/'));
    } else {
      const dateRecord = dateAudit.articles[item.slug];
      const parsedDate = new Date(`${item.date}T00:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== item.date) errors.push(`${item.slug}: invalid article date`);
      if (!dateRecord || dateRecord.date !== item.date || dateRecord.notBefore && item.date < dateRecord.notBefore || item.date > dateAudit.checkedOn) errors.push(`${item.slug}: article date conflicts with editorial audit`);
      if (/上一篇|上篇文章|前一篇|下一篇|那是旧文|我写过上下文窗口/.test(JSON.stringify(item.blocks))) errors.push(`${item.slug}: remove cross-article sequencing`);
      [item.title, item.summary, item.tag, item.date].forEach(text => checkTranslation(text, item.slug));
      assets.add(item.cover);
      const englishCover = item.cover.replace('/articles/', '/articles/en/');
      assets.add(englishCover);
      if (existsSync(resolve(root, 'public', englishCover)) && /[\u3400-\u9fff]/.test(readFileSync(resolve(root, 'public', englishCover), 'utf8'))) errors.push(`${item.slug}: English cover still contains Chinese text`);
      if (!item.blocks.length || !item.blocks.some(b => b.type === 'heading')) errors.push(`${item.slug}: missing article body`);
      if (!Number.isFinite(item.minutes) || item.minutes < 1) errors.push(`${item.slug}: invalid reading estimate`);
      if (item.blocks.some(b => b.type === 'heading' && /^(参考来源|参考资料与说明|延伸阅读)$/.test(b.text))) errors.push(`${item.slug}: appendix should be hidden`);
    }
  }
}
for (let i = 1; i < articles.length; i++) {
  if (articles[i - 1].date < articles[i].date) errors.push('Articles must be stored newest first');
}
for (const path of assets) {
  if (!path?.startsWith('./') || path.includes('..') || !existsSync(resolve(root, 'public', path))) errors.push(`Missing or invalid asset: ${path}`);
}
const main = readFileSync(resolve(root, 'src/main.tsx'), 'utf8');
if (/待补充|稍后补充|PHOTO TO COME|个人照片还没加入/.test(main)) errors.push('Public page still contains unfinished placeholders');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content ready: ${articles.length} articles, ${projects.length} projects, ${assets.size} local assets. No unfinished placeholders.`);
}
