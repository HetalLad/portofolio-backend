(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============ project data ============ */
  const projects = [
    {tag:'DEVOPS · AI', title:'DevOps Copilot', desc:"Full-stack AI tool that ingests system logs and returns structured root-cause analysis via real-time streaming. Hit a critical async session bug mid-build — SQLAlchemy sessions can't stay open across a 10-30s stream — traced it and restructured the architecture around it.", tags:['FastAPI','Next.js','TypeScript','llama.cpp','SSE','JWT'], link:'https://github.com/HetalLad/devops-copilot'},
    {tag:'RAG SYSTEM · HEALTHCARE · AI', title:'Cardiology RAG Assistant', desc:'RAG pipeline over 529 pages of AHA clinical guidelines — chunked, embedded, indexed in Pinecone, served via GPT-3.5 with citations. Stress-tested until three production failure modes surfaced, then fixed all three.', tags:['Python','LangChain','Pinecone','GPT-3.5'], link:'https://github.com/HetalLad/cardio-rag'},
    {tag:'DISTRIBUTED SYSTEMS · GO · LLM', title:'GoLlama', desc:'Distributed backend orchestrating concurrent LLM inference across nodes with goroutine worker pools and channel-driven concurrency — 50% throughput improvement over single-node baseline.', tags:['Go','Goroutines','REST API','CLI'], link:'https://github.com/AntonisKotsikaris/csci_6221_GO'},
    {tag:'ML · PYTORCH · NLP', title:'NER Transformer', desc:'4-6M parameter encoder-only transformer built from scratch in PyTorch — attention, positional encoding, and a BIO classification head for cross-domain entity extraction. Built to understand why it works, not just call an API.', tags:['PyTorch','BERT Tokenizer','BIO Tagging'], link:'https://github.com/jayparmar16/MLProj'},
    {tag:'NLP · SENTIMENT ANALYSIS', title:'Opinion Mining', desc:'Twitter sentiment analysis system — data collection, preprocessing, and classification to surface public opinion trends across topics.', tags:['NLP','Python'], link:'https://github.com/HetalLad/Opinion-Mining'},
    {tag:'SECURITY · JAVA', title:'Image Steganography', desc:'Java tool for concealing data within image files, with encode/decode utilities for securely embedding and retrieving hidden messages.', tags:['Java'], link:'https://github.com/HetalLad/Image-Steganography'},
    {tag:'BLOCKCHAIN · AGTECH', title:'Agrarian.ai', desc:'Platform leveraging blockchain technology to streamline agricultural supply chain management with secure, transparent transactions and smart contracts. Implemented smart contracts for automating agreements, optimized minimum support pricing through blockchain, and enhanced traceability across the supply chain.', tags:['Python','Java','Ethereum','Blockchain'], link:'https://github.com/amithraveendra/Agraian.AI'},
    {tag:'DEV TOOLS · JAVA · OPEN SOURCE', title:'Reverse Java Document Generator', desc:'Eclipse plugin that parses Java codebases via AST analysis and generates interactive PlantUML class diagrams with drag-and-drop SVG rendering. Chose SVG + vanilla JS over heavier frameworks for Java 11 compatibility.', tags:['Eclipse JDT','AST','PlantUML','SVG'], link:'https://github.com/HetalLad/REJD'}
  ];

  let active = 0;
  const n = projects.length;

  const els = {
    leftTag: document.getElementById('leftTag'), leftTitle: document.getElementById('leftTitle'), leftDesc: document.getElementById('leftDesc'), leftLink: document.getElementById('leftLink'), leftCard: document.getElementById('leftCard'),
    centerTag: document.getElementById('centerTag'), centerTitle: document.getElementById('centerTitle'), centerDesc: document.getElementById('centerDesc'), centerTags: document.getElementById('centerTags'), centerLink: document.getElementById('centerLink'),
    rightTag: document.getElementById('rightTag'), rightTitle: document.getElementById('rightTitle'), rightDesc: document.getElementById('rightDesc'), rightLink: document.getElementById('rightLink'), rightCard: document.getElementById('rightCard'),
    grid: document.getElementById('projectsGrid'), dotsRow: document.getElementById('dotsRow')
  };

  function setSideLink(a, p){
    if (p.link && p.link !== '#'){ a.href = p.link; a.style.display = 'inline-block'; }
    else { a.style.display = 'none'; }
  }

  function renderProjects(){
    const left = projects[(active - 1 + n) % n];
    const center = projects[active];
    const right = projects[(active + 1) % n];

    els.leftTag.textContent = left.tag; els.leftTitle.textContent = left.title; els.leftDesc.textContent = left.desc; setSideLink(els.leftLink, left);
    els.centerTag.textContent = center.tag; els.centerTitle.textContent = center.title; els.centerDesc.textContent = center.desc;
    els.centerTags.innerHTML = center.tags.map(t => `<span class="tag-chip">${t}</span>`).join('');
    if (center.link && center.link !== '#'){ els.centerLink.href = center.link; els.centerLink.style.display = 'inline-flex'; } else { els.centerLink.style.display = 'none'; }
    els.rightTag.textContent = right.tag; els.rightTitle.textContent = right.title; els.rightDesc.textContent = right.desc; setSideLink(els.rightLink, right);

    els.dotsRow.querySelectorAll('.proj-dot').forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function goTo(i){
    const target = ((i % n) + n) % n;
    if (reduceMotion){
      active = target; renderProjects(); return;
    }
    els.grid.style.opacity = '0';
    setTimeout(() => {
      active = target;
      renderProjects();
      els.grid.style.opacity = '1';
    }, 170);
  }

  els.dotsRow.innerHTML = projects.map((_, i) => `<button class="proj-dot" data-i="${i}"></button>`).join('');
  els.dotsRow.querySelectorAll('.proj-dot').forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));
  document.getElementById('prevBtn').addEventListener('click', () => goTo(active - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(active + 1));
  renderProjects();

  /* ============ FAQ accordion ============ */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const marker = item.querySelector('.faq-marker');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-marker').textContent = '+'; });
      if (!isOpen){ item.classList.add('open'); marker.textContent = '—'; }
    });
  });

  /* ============ photo slideshow (placeholders — swap in real photos via CSS background-image) ============ */
  function setupSlideshow(cardId, dotsId, intervalMs){
    const card = document.getElementById(cardId);
    const dotsWrap = document.getElementById(dotsId);
    const layers = card.querySelectorAll('.photo-layer');
    let idx = 0;
    dotsWrap.innerHTML = Array.from(layers).map((_, i) => `<button class="photo-dot${i===0?' active':''}" data-i="${i}"></button>`).join('');
    const dots = dotsWrap.querySelectorAll('.photo-dot');

    function show(i){
      idx = i;
      layers.forEach((l, li) => l.classList.toggle('active', li === idx));
      dots.forEach((d, di) => d.classList.toggle('active', di === idx));
    }
    dots.forEach(d => d.addEventListener('click', () => show(+d.dataset.i)));

    if (!reduceMotion){
      setInterval(() => show((idx + 1) % layers.length), intervalMs);
    }
  }
  setupSlideshow('sunsetCard', 'sunsetDots', 4200);
  setupSlideshow('trailCard', 'trailDots', 4800);

  /* ============ reveal on scroll ============ */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (reduceMotion){
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ============ scroll spy + progress + smooth scroll ============ */
  const sectionIds = ['home','projects','experience','life','contact'];
  const sectionLabels = {home:'home.tsx', projects:'projects.tsx', experience:'experience.log', life:'life.md', contact:'contact.json'};
  const tabBtns = document.querySelectorAll('.tab-btn');
  const navIcons = document.querySelectorAll('.nav-icon');
  const progressBar = document.getElementById('progressBar');
  const statusSection = document.getElementById('statusSection');

  function scrollToId(id){
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', () => scrollToId(el.dataset.target));
  });

  function setActiveSection(id){
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    navIcons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    statusSection.textContent = '→ ' + (sectionLabels[id] || 'home.tsx');
  }

  function onScroll(){
    const doc = document.documentElement;
    const st = doc.scrollTop || document.body.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? st / max : 0;
    progressBar.style.width = (Math.min(1, Math.max(0, p)) * 100) + '%';

    let current = sectionIds[0];
    for (const id of sectionIds){
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) current = id;
    }
    setActiveSection(current);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ============ console easter egg ============ */
  try {
    console.log('%c 200 OK %c inspecting the source? respect.', 'background:#b8bb26;color:#282828;font-weight:700;border-radius:0', 'color:#888');
    console.log('%c 418 %c I\'m a teapot — but I make a mean coffee.', 'background:#fe8019;color:#282828;font-weight:700;border-radius:0', 'color:#888');
    console.log('%c git praise %c not git blame — say hi → linkedin.com/in/hetallad', 'background:#fabd2f;color:#282828;font-weight:700;border-radius:0', 'color:#888');
  } catch (e) {}
})();
