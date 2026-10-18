(async () => {
 const dictionary = await fetch('/yang-cover-translations.json').then(r => r.json());
 const translate = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
  for(const node of nodes) {
   if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName)) continue;
   const text=node.textContent.trim();
   let translated=dictionary[text] ?? text;
   translated=translated.replace(/(\d+)年(\d+)月(\d+)日/g,'$1-$2-$3').replace(/(\d+)月(\d+)日/g,'$1/$2').replace(/星期一/g,'Monday').replace(/更新于 /g,'Updated ').replace(/核对日 /g,'Checked ').replace(/年化约 /g,'Annualized: ').replace(/还有 (\d+) 天/g,'$1 days left').replace(/试用 (\d+) 天后到期/g,'Trial ends in $1 days').replace(/(\d+) 项/g,'$1 items').replace(/(\d+) 字 · 创建 /g,'$1 chars · Created ').replace(/(\d+) 字/g,'$1 chars').replace(/数据只存在此浏览器 · 已用约 (\d+) KB（上限约 (\d+) MB）/g,'Local browser storage · $1 KB used (up to $2 MB)');
   if(translated!==text) node.textContent=node.textContent.replace(text,' '+translated+' ');
  }
  for(const el of document.querySelectorAll('[placeholder],[title],[aria-label]')) {
   for(const attr of ['placeholder','title','aria-label']) {
    const text=el.getAttribute(attr); if(dictionary[text]) el.setAttribute(attr,dictionary[text]);
   }
  }
  for(const el of document.querySelectorAll('input,textarea')) {
    if(dictionary[el.value]) el.value=dictionary[el.value];
  }
  const path=location.pathname;
  if(path.includes('gongzuotai')) {
    const el=document.getElementById('md');
    if(el) el.value='# Welcome to Workspace\n\nThis is a **browser-based** Notion-style workspace. No account or server; your data stays on this device.\n\n## What you can do\n\n- Documents: write Markdown with a live preview\n- Boards: drag cards and columns, set due dates\n- Tables: text, numbers, dates and choices; sort and filter\n- Browse your page tree on the left. Use Ctrl K to search.\n\n## Sample tasks\n\n- [x] Open Workspace\n- [ ] Create your own project space\n- [ ] Export a JSON backup\n\n> Export a backup regularly. Import it to restore your data.';
  }
  if(path.includes('shuanglian')) {
    const el=document.getElementById('body');
    if(el) el.value='# Welcome to Linked Notes\n\n#GettingStarted\n\nThis is a **local-first** notebook. A few things to try:\n\n- Type two opening brackets to create a link, such as [[What are backlinks?]]. Backlinks appear on the right.\n- Use #Tags to organize notes.\n- Use ==cloze== to mark key terms, then open [[How spaced review works]].\n- Open Graph to explore connections.\n- Export Markdown ZIP or JSON from Backup.\n\n- [ ] Replace these sample notes with your own ideas.';
  }
  document.documentElement.lang='en';
 };
 translate();
 const observer = new MutationObserver(() => {observer.disconnect();translate();observer.observe(document.body,{subtree:true,childList:true});});
 observer.observe(document.body,{subtree:true,childList:true});
 document.body.dataset.coverLanguage='en';
})();
