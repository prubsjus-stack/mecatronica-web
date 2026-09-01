// ---------- Intro épica ----------
const intro = document.getElementById('intro');
const nameEl = document.getElementById('intro-name');
const words = nameEl.textContent.trim().split(/\s+/);
nameEl.innerHTML = '';
let li = 0;
words.forEach((w, wi) => {
  const wspan = document.createElement('span');
  wspan.className = 'w';
  const base = 0.45 + wi * 0.12;
  [...w].forEach((ch) => {
    const s = document.createElement('span');
    s.textContent = ch;
    s.style.animationDelay = (base + li * 0.05) + 's';
    wspan.appendChild(s);
    li++;
  });
  nameEl.appendChild(wspan);
});

function confettiBurst() {
  const CONF_COLORS = ['#2de2ff', '#1d9fd4', '#ffb020', '#ff7a5c', '#e5484d', '#66bb6a', '#ffffff'];
  for (let i = 0; i < 120; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = (Math.random() * 100) + 'vw';
    c.style.background = CONF_COLORS[(Math.random() * CONF_COLORS.length) | 0];
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
    c.style.setProperty('--w', ((Math.random() - .5) * 260 + (Math.random() > .5 ? -200 : 200)) + 'px');
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3800);
  }
}

function closeIntro() {
  if (intro.classList.contains('out')) return;
  intro.classList.add('out');
  document.body.classList.remove('intro-lock');
  confettiBurst();
  setTimeout(() => intro.remove(), 950);
}
document.getElementById('intro-go').addEventListener('click', closeIntro);
setTimeout(closeIntro, 6800);

// ---------- Scroll progress ----------
const progress = document.getElementById('scroll-progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = p + '%';
});

// ---------- Canvas de partículas ----------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, pts = [];
const COLORS = ['45,226,255', '29,159,212', '255,176,32', '229,72,77'];
function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  const n = Math.min(140, Math.floor(W * H / 14000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
    r: Math.random() * 2 + .6,
    c: COLORS[Math.floor(Math.random() * COLORS.length)],
    a: Math.random() * .6 + .25,
  }));
}
resize();
addEventListener('resize', resize);
function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},${p.a})`;
    ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(29,159,212,${(1 - d / 130) * .16})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

// ---------- Typewriter ----------
const phrases = [
  'Máquinas inteligentes que revolucionan la industria…',
  'Robótica, automatización, control y sistemas embebidos…',
  'Donde la mecánica, la electrónica y el software se unen.',
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const cur = phrases[pi];
  if (!deleting) {
    ci++;
    typedEl.textContent = cur.slice(0, ci);
    if (ci === cur.length) { deleting = true; setTimeout(type, 2200); return; }
    setTimeout(type, 55);
  } else {
    ci--;
    typedEl.textContent = cur.slice(0, ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, 28);
  }
}
setTimeout(type, 700);

// ---------- Reveal on scroll + barras ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      e.target.querySelectorAll('.bar-fill').forEach((b) => {
        const v = e.target.dataset.val || 5;
        setTimeout(() => (b.style.width = (v / 5 * 100) + '%'), 200);
      });
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.card').forEach((c) => io.observe(c));

// ---------- Nav active state ----------
const navLinks = document.querySelectorAll('#nav a');
const secs = [...navLinks].map((a) => document.querySelector(a.getAttribute('href')));
const navIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
secs.forEach((s) => navIO.observe(s));

// ---------- Cursor personalizado ----------
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (matchMedia('(pointer:fine)').matches) {
  document.body.classList.add('cursor-on');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', (e) => {
    ring.classList.toggle('grow', !!e.target.closest('a,button,.card,.mini,.opt'));
  });
  document.addEventListener('mouseleave', () => ring.classList.add('hide'));
  document.addEventListener('mouseenter', () => ring.classList.remove('hide'));
}

// ---------- Botón volver arriba ----------
const toTop = document.getElementById('to-top');
addEventListener('scroll', () => {
  toTop.classList.toggle('show', scrollY > 700);
});
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Sección final (anillo de valoración) ----------
const finalSec = document.getElementById('final');
const finalIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      setTimeout(() => {
        document.querySelector('.final .ring .fill').style.strokeDashoffset = '339.29';
        const v = document.getElementById('final-val');
        let n = 0;
        const iv = setInterval(() => {
          n += .04;
          v.textContent = (Math.round(n * 100) / 100).toFixed(1);
          if (n >= 2) { clearInterval(iv); v.textContent = '2.0'; }
        }, 45);
      }, 300);
      finalIO.unobserve(e.target);
    }
  });
}, { threshold: .4 });
finalIO.observe(finalSec);

// ---------- Tarjetas con inclinación 3D ----------
if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rotY = ((e.clientX - r.left) / r.width - .5) * 9;
      const rotX = ((e.clientY - r.top) / r.height - .5) * -9;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
