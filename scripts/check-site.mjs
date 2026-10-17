import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(resolve(root, 'src/content.ts'), 'utf8');
const projects = JSON.parse(source.split('export const projects: Project[] = ')[1].split(';\n\n')[0]);
const articles = JSON.parse(readFileSync(resolve(root, 'src/data/articles.json'), 'utf8'));
const errors = [];
const assets = new Set(['./favicon.svg', './media/hero.mp4', './media/hero-poster.jpg', './media/inter.ttf', './media/instrument-serif.ttf']);
for (const [type, items] of [['project', projects], ['article', articles]]) {
  const seen = new Set();
  for (const item of items) {
    if (!item.slug || seen.has(item.slug)) errors.push(`${type}: missing or duplicate slug ${item.slug}`);
    seen.add(item.slug);
    if (!item.title || !item.description && !item.summary) errors.push(`${item.slug}: missing title or description`);
    if (type === 'project') {
      for (const url of [item.url, item.github]) {
        try { if (new URL(url).protocol !== 'https:') throw new Error(); }
        catch { errors.push(`${item.slug}: invalid external link ${url}`); }
      }
      [item.image, ...item.screenshots].forEach(path => assets.add(path));
    } else {
      assets.add(item.cover);
      if (!item.blocks.length || !item.blocks.some(b => b.type === 'heading')) errors.push(`${item.slug}: missing article body`);
      if (!Number.isFinite(item.minutes) || item.minutes < 1) errors.push(`${item.slug}: invalid reading estimate`);
      if (item.blocks.some(b => b.type === 'heading' && /^(参考来源|参考资料与说明|延伸阅读)$/.test(b.text))) errors.push(`${item.slug}: appendix should be hidden`);
    }
  }
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
