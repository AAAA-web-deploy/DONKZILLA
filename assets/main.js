/* DONKZILLA site runtime: original reference interactions adapted to Ethereum.
   To configure deployment links, edit assets/config.js only. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- links ---------- */
  const CFG = window.DONKZILLA_CONFIG || {};
  const CA = /^0x[a-fA-F0-9]{40}$/.test((CFG.contractAddress || '').trim()) ? CFG.contractAddress.trim() : '';
  const X_URL = /^https:\/\//.test(CFG.xUrl || '') ? CFG.xUrl : '';
  const TG_URL = /^https:\/\//.test(CFG.telegramUrl || '') ? CFG.telegramUrl : '';

  const links = {
    buy: CA ? 'https://app.uniswap.org/swap?chain=ethereum&outputCurrency=' + CA : '',
    chart: CA ? 'https://dexscreener.com/ethereum/' + CA : '',
    x: X_URL,
    tg: TG_URL
  };
  $$('[data-link]').forEach((el) => {
    const url = links[el.dataset.link];
    if (url) {
      el.href = url; el.target = '_blank'; el.rel = 'noopener noreferrer';
      el.removeAttribute('aria-disabled');
      const chip = el.querySelector('.soon'); if (chip) chip.remove();
    } else {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
      el.setAttribute('tabindex', '-1');
      if (!el.querySelector('.soon')) {
        const s = document.createElement('span'); s.className = 'soon'; s.textContent = 'SOON'; el.appendChild(s);
      }
    }
  });
  if (CA) {
    $$('.js-ca-value').forEach((v) => { v.textContent = CA; });
    $$('.js-ca-copy').forEach((b) => {
      b.disabled = false; b.textContent = 'COPY';
      b.addEventListener('click', () => {
        const done = () => { b.textContent = 'COPIED'; setTimeout(() => (b.textContent = 'COPY'), 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(CA).then(done, done);
      });
    });
  }

  /* ---------- nav ---------- */
  const nav = $('#nav'), burger = $('#burger'), navLinks = $('#navLinks');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open)); navLinks.classList.toggle('open', open);
  });
  $$('a', navLinks).forEach((a) => a.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false'); navLinks.classList.remove('open');
  }));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) $$('a', navLinks).forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach((s) => io.observe(s));
    const rio = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('.reveal').forEach((el) => rio.observe(el));
  } else { $$('.reveal').forEach((el) => el.classList.add('in')); }

  /* ---------- HUD clock (Global chart clock = UTC) ---------- */
  const clock = $('#clock');
  const tick = () => {
    if (!clock) return;
    try { clock.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }) + ' UTC'; }
    catch (e) { clock.textContent = new Date().toLocaleTimeString(); }
  };
  tick(); setInterval(tick, 15000);

  /* ---------- wanted stars ---------- */
  const lightStars = (wrap, n) => { if (!wrap) return; $$('i', wrap).forEach((s, i) => s.classList.toggle('on', i < n)); };
  const heroStars = $('#heroStars');

  /* ---------- media marquee (duplicated thumbs) ---------- */
  const mq = $('#mq1');
  if (mq) {
    const ids = ['01', '02', '03', '04', '05', '06', '07', '08', '11', '12'];
    const html = ids.map((i) => '<img src="img/meme-' + i + '-800.webp" width="800" height="450" alt="" loading="lazy" decoding="async">').join('');
    mq.innerHTML = html + html;
  }

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  $$('#gallery .g').forEach((g) => g.addEventListener('click', () => {
    lbImg.src = g.dataset.full; lbImg.alt = g.dataset.alt || ''; lbCap.textContent = g.dataset.alt || '';
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
  }));
  $('#lbClose').addEventListener('click', () => lb.close ? lb.close() : lb.removeAttribute('open'));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

  /* ---------- poster tilt ---------- */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach((el) => {
      const base = el.classList.contains('poster--alt') ? 1.8 : -1.5;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotate(' + base + 'deg) rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-6px)';
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- MINUS ZERO MISSION BOARD ---------- */
  const MISSIONS = [
    { id:'beach',n:'The Collapse',where:'Bear Market',x:70.5,y:47,img:'01',brief:'The zero line is shaking. Find the last green candle before it disappears.',result:'Candle located',joke:'One green candle survives in a sea of red.' },
    { id:'drive',n:'The Awakening',where:'Candle City',x:60,y:26,img:'02',brief:'Donkzilla has risen beneath the market. Track the monster before the first strike.',result:'Monster spotted',joke:'The giant donkey has glowing blue-violet spines.' },
    { id:'yacht',n:'Protect 0.0',where:'Zero Line',x:82,y:52,img:'03',brief:'Donkzilla is grabbing the market support. Keep the 0.0 barrier intact.',result:'Zero line defended',joke:'Even the bottom needs a bodyguard.' },
    { id:'mural',n:'The Last Candle',where:'Launch Platform',x:51,y:38,img:'04',brief:'Get Elon to the candle-shaped rocket before the next downward shock.',result:'Rocket reached',joke:'Not a rocket to the moon — a rocket away from the minus zone.' },
    { id:'arcade',n:'Launch Countdown',where:'Candle City',x:56,y:63,img:'05',brief:'Start the engines. The chart is running out of support.',result:'Engines ready',joke:'The last green candlestick is now an engine.' },
    { id:'pool',n:'Minus Zero',where:'Minus Gate',x:68,y:74,img:'06',brief:'Explore the impossible realm created when the monster cracks the zero line.',result:'Minus Gate mapped',joke:'This is a fictional fantasy. Spot token prices do not go below zero.' },
    { id:'highway',n:'Escape Velocity',where:'Rocket Trail',x:37,y:56,img:'07',brief:'Clear the path for Elon’s green-candle rocket as Donkzilla approaches.',result:'Flight path cleared',joke:'Green candles look different at escape velocity.' },
    { id:'bar',n:'The Final Pull',where:'Donkzilla Lair',x:27,y:75,img:'08',brief:'The monster grabs the remaining support while the rocket accelerates.',result:'Final pull resisted',joke:'One line. Two forces. A very bad day for gravity.' },
    { id:'vip',n:'Above Zero',where:'Recovery Horizon',x:42,y:22,img:'12',brief:'Reach the upside and reveal the end of this chapter.',result:'Last candle saved',joke:'A possible recovery, not a promise of returns.' }
  ];
  const pinsEl = $('#pins'), listEl = $('#mList'), card = $('#mCard');
  const mName = $('#mName'), mBrief = $('#mBrief'), mGo = $('#mGo'), mNext = $('#mNext');
  const mImg = $('#mImg'), mResult = $('#mResult'), mJoke = $('#mJoke');
  const mDone = $('#mDone'), mMeter = $('#mMeter'), mChill = $('#mChill'), royal = $('#royal');
  const route = $('#route'), mapCoord = $('#mapCoord');
  const done = new Set(); let current = null; let last = null;

  pinsEl.replaceChildren(); listEl.replaceChildren();
  MISSIONS.forEach((m, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pin'; b.dataset.id = m.id;
    b.style.left = m.x + '%'; b.style.top = m.y + '%';
    b.setAttribute('aria-label', 'Mission ' + (i + 1) + ': ' + m.n + ' at ' + m.where);
    b.innerHTML = '<span class="pin__head"><span>' + (i + 1) + '</span></span><span class="pin__lbl">' + m.where + '</span>';
    b.addEventListener('click', () => select(m.id));
    pinsEl.appendChild(b);
    const li = document.createElement('li');
    li.innerHTML = '<button type="button" data-id="' + m.id + '">' + String(i + 1).padStart(2, '0') + ' ' + m.n + '</button>';
    li.firstChild.addEventListener('click', () => select(m.id));
    listEl.appendChild(li);
  });
  const byId = (id) => MISSIONS.find((m) => m.id === id);

  function drawRoute(from, to) {
    if (!from || !to) { route.setAttribute('d', ''); return; }
    const X = (v) => v * 10, Y = (v) => v * 6.4;
    const x1 = X(from.x), y1 = Y(from.y), x2 = X(to.x), y2 = Y(to.y);
    const cx = (x1 + x2) / 2 + (y2 - y1) * 0.25, cy = (y1 + y2) / 2 - (x2 - x1) * 0.25;
    route.setAttribute('d', 'M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2);
  }
  function select(id) {
    const m = byId(id); if (!m) return;
    last = current; current = m;
    card.classList.remove('is-flipped');
    $$('.pin', pinsEl).forEach((p) => p.classList.toggle('is-active', p.dataset.id === id));
    mName.textContent = m.n; mBrief.textContent = '📍 ' + m.where + ' — ' + m.brief;
    mGo.disabled = false; mGo.textContent = done.has(id) ? 'Replay mission' : 'Start mission';
    drawRoute(last, m);
    mapCoord.textContent = 'ZERO GRID ' + Math.round(m.x) + ' / ' + Math.round(m.y);
  }
  function complete() {
    if (!current) return;
    const m = current;
    mImg.src = 'img/meme-' + m.img + '-800.webp'; mImg.alt = 'Donkzilla mission: ' + m.n;
    mResult.textContent = m.result; mJoke.textContent = m.joke;
    card.classList.add('is-flipped');
    done.add(m.id); update();
  }
  function update() {
    const n = done.size;
    mDone.textContent = n; mMeter.style.width = (n / MISSIONS.length * 100) + '%';
    mChill.textContent = Math.round(n / MISSIONS.length * 100) + '%';
    $$('.pin', pinsEl).forEach((p) => p.classList.toggle('is-done', done.has(p.dataset.id)));
    $$('button', listEl).forEach((b) => b.classList.toggle('is-done', done.has(b.dataset.id)));
    const stars = Math.min(5, Math.ceil(n / 9 * 5));
    lightStars(heroStars, Math.max(1, stars));
    $$('.poster .stars').forEach((s) => lightStars(s, 5));
    royal.hidden = n < MISSIONS.length;
  }
  mGo.addEventListener('click', complete);
  mNext.addEventListener('click', () => {
    const next = MISSIONS.find((m) => !done.has(m.id)) || MISSIONS[(MISSIONS.indexOf(current) + 1) % MISSIONS.length];
    select(next.id);
  });
  $('#mReset').addEventListener('click', () => { done.clear(); update(); select(MISSIONS[0].id); });
  lightStars(heroStars, 1);
  $$('.poster .stars').forEach((s) => lightStars(s, 5));

  /* ---------- motion: Lenis + GSAP ScrollTrigger ---------- */
  function initMotion() {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const desktop = window.matchMedia('(min-width: 900px)').matches;
    if (!gsap || !ST || reduce) { document.body.classList.add('no-pin'); return; }
    gsap.registerPlugin(ST);

    if (window.Lenis) {
      const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on('scroll', ST.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
        const id = a.getAttribute('href'); if (id.length < 2) return;
        const t = $(id); if (!t) return;
        e.preventDefault(); lenis.scrollTo(t, { offset: id === '#top' ? 0 : -100 });
      }));
    }

    // hero intro + scrub
    gsap.from('.hero__word', { yPercent: 40, opacity: 0, duration: 1.3, ease: 'expo.out', delay: 0.1 });
    gsap.from('.hero__sub, .hero__tag, .hero__ctas, .ca-pill, .eyebrow', { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.35 });
    gsap.from('.hud', { opacity: 0, x: (i) => (i % 2 ? 30 : -30), duration: 1, stagger: 0.1, delay: 0.6 });
    const htl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
    htl.to('.hero__img', { scale: 1.0, yPercent: 6, ease: 'none' }, 0)
       .to('.hero__word', { scale: 0.62, yPercent: -30, ease: 'none' }, 0)
       .to('.hero__content > *:not(.hero__title)', { opacity: 0, y: -40, stagger: 0.02, ease: 'none' }, 0.25)
       .to('.hero__medal', { x: -60, y: -140, rotate: 20, ease: 'none' }, 0)
       .to('.hero__hud', { opacity: 0, ease: 'none' }, 0.4)
       .to('.hero__shade', { opacity: 1.0, backgroundColor: 'rgba(7,8,15,.55)', ease: 'none' }, 0.5);

    // postcard parallax
    gsap.to('#postcard', { yPercent: -10, rotate: 2, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true } });

    // chapters horizontal pin (desktop only)
    const track = $('#chTrack'), bar = $('#chBar');
    if (desktop) {
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.chapters', pin: '.chapters__pin', start: 'top top', end: () => '+=' + dist(), scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (s) => { bar.style.transform = 'scaleX(' + s.progress + ')'; } }
      });
      $$('.ch__fig img').forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: '.chapters', start: 'top top', end: () => '+=' + dist(), scrub: true } });
      });
    } else {
      document.body.classList.add('no-pin');
      track.addEventListener('scroll', () => {
        const max = track.scrollWidth - track.clientWidth; bar.style.transform = 'scaleX(' + (max ? track.scrollLeft / max : 0) + ')';
      }, { passive: true });
    }

    // section titles
    $$('.sec-head .h2, .story .h2').forEach((h) => {
      gsap.from(h, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    // map pins drop in
    gsap.from('.pin', { y: -40, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(2)', scrollTrigger: { trigger: '#map', start: 'top 75%' } });
    // gallery stagger
    gsap.from('.g', { y: 40, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '#gallery', start: 'top 80%' } });
    // banner parallax
    gsap.fromTo('.buy__banner img', { yPercent: -10, scale: 1.15 }, { yPercent: 10, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '.buy__banner', start: 'top bottom', end: 'bottom top', scrub: true } });

    window.addEventListener('load', () => ST.refresh());
  }
  if (document.readyState === 'complete') initMotion(); else window.addEventListener('load', initMotion);
})();
