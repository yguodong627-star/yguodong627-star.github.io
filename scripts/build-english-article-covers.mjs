import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const labels = {
  'agent-memory-long-tasks': ['Remember more.', 'Work for longer.'],
  'agent-refund-workflow': ['From answers', 'to action.'],
  'ai-coding-tools': ['Beyond tools.', 'Ship the product.'],
  'ai-feature-prd': ['Write requirements.', 'Define acceptance.'],
  'deep-review-document-gates': ['Draft complete.', 'Review critically.'],
  'embedding-retrieval': ['Similar meaning.', 'Measured how?'],
  'jev-typed-decisions': ['Fewer answers.', 'Clearer decisions.'],
  'multi-agent-research': ['Divide the work.', 'Unify the results.'],
  'rag-finetuning-context': ['Classify the problem.', 'Choose the approach.'],
  'token-cost-estimation': ['Count the cost', 'of a finished task.'],
};
mkdirSync('public/media/articles/en', { recursive: true });
for (const [slug, lines] of Object.entries(labels)) {
  let svg = readFileSync(`public/media/articles/${slug}.svg`, 'utf8');
  for (const [i, y] of [234, 287].entries()) {
    svg = svg.replace(new RegExp(`<text x="48" y="${y}"[^>]*>[^<]*</text>`), `<text x="48" y="${y}" font-size="32" font-family="Inter,Arial,sans-serif">${lines[i]}</text>`);
  }
  svg = svg.replace('杨国栋 / YANG', 'GUODONG YANG');
  writeFileSync(`public/media/articles/en/${slug}.svg`, svg);
}
console.log(`Built ${Object.keys(labels).length} English article covers.`);
