/* A side-scrolling sunset drive. Case studies are signposts along the road.
   Data comes from the work list in the page, so the scene and the accessible
   list can never disagree. */
(function () {
  var canvas = document.getElementById('scene');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var routeEl = document.getElementById('route');
  var marquee = document.getElementById('marquee');
  var hint = document.getElementById('hint');

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- Palette ---------------------------------------------------- */
  var C = {
    skyTop:   '#2E2A57',
    skyMid:   '#7A4A76',
    skyLow:   '#D4657A',
    skyGlow:  '#F0904F',
    horizon:  '#FFC978',
    sunCore:  '#FFE9B0',
    sunEdge:  '#FF9E5E',
    hillFar:  '#5B4680',
    hillMid:  '#3F3160',
    hillNear: '#2A2044',
    road:     '#221A38',
    roadTop:  '#372B57',
    ground:   '#191331',
    carBody:  '#6FD0C6',
    carDark:  '#49A9A1',
    glass:    '#CFF3EE',
    tyre:     '#191331',
    post:     '#7A5A46',
    board:    '#FFEFD6',
    boardInk: '#3B2B4E',
    beam:     'rgba(255, 214, 150, 0.13)'
  };

  /* ---- Route ------------------------------------------------------ */
  var stops = [];
  var entries = document.querySelectorAll('#work .entry[data-mile]');
  for (var i = 0; i < entries.length; i++) {
    var el = entries[i];
    var link = el.querySelector('.entry-title a');
    stops.push({
      mile:  parseFloat(el.getAttribute('data-mile')),
      title: el.querySelector('.entry-title').textContent.trim(),
      year:  el.querySelector('.entry-year').textContent.trim(),
      kind:  el.querySelector('.entry-kind').textContent.trim(),
      note:  el.getAttribute('data-note') || '',
      href:  (link && link.getAttribute('href')) || '#work',
      sign:  String(i + 1)
    });
  }
  if (!stops.length) return;

  var LAST = stops[stops.length - 1].mile;
  var END = LAST + 1000;
  stops.push({
    mile: END, title: 'Say hello', year: 'Now', kind: 'Contact',
    note: 'The road ends at an inbox. Tell me what you are building.',
    href: '#contact', sign: '★', terminal: true
  });

  /* ---- State ------------------------------------------------------ */
  var d = 0;            // world distance travelled, set at boot
  var v = 0;            // current velocity
  var drive = 0;        // -1 / 0 / 1 from input
  var glide = null;     // target distance when jumping to a stop
  var parked = null;    // stop the car has pulled up at
  var armed = true;     // may pull up at the next stop it reaches
  var active = -1;      // stop currently shown on the marquee
  var t = 0;            // animation clock
  var running = true;

  var CRUISE = 0.95;
  var BOOST = 4.2;
  var NEAR = 130;       // how close counts as "arrived"

  var W = 0, H = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ---- Scene geometry --------------------------------------------- */
  function horizonY() { return H * 0.60; }
  function roadY()    { return H * 0.80; }
  function carX()     { return W * 0.30; }

  /* ---- Drawing ---------------------------------------------------- */
  function sky() {
    var hz = horizonY();
    var g = ctx.createLinearGradient(0, 0, 0, hz + 10);
    g.addColorStop(0.00, C.skyTop);
    g.addColorStop(0.42, C.skyMid);
    g.addColorStop(0.72, C.skyLow);
    g.addColorStop(0.92, C.skyGlow);
    g.addColorStop(1.00, C.horizon);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, hz + 10);
  }

  function sun() {
    var hz = horizonY();
    var r = Math.min(W, H) * 0.15;
    var cx = W * 0.74;
    var cy = hz - r * 0.72;

    var halo = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 2.6);
    halo.addColorStop(0, 'rgba(255,180,110,0.30)');
    halo.addColorStop(1, 'rgba(255,180,110,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 2.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, hz);
    ctx.clip();

    var g = ctx.createLinearGradient(0, cy - r, 0, cy + r);
    g.addColorStop(0, C.sunCore);
    g.addColorStop(1, C.sunEdge);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Soft bands cut out of the lower half, so it reads as a setting sun.
    ctx.globalCompositeOperation = 'destination-out';
    for (var k = 0; k < 4; k++) {
      var y = cy + r * (0.16 + k * 0.21);
      var hgt = r * (0.035 + k * 0.022);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(cx - r - 4, y, r * 2 + 8, hgt);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }

  function birds() {
    var hz = horizonY();
    ctx.strokeStyle = 'rgba(60,40,70,0.45)';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    for (var i = 0; i < 3; i++) {
      var bx = ((W * 0.42 + i * 74) - d * 0.035 + t * 0.16) % (W + 160) ;
      if (bx < -80) bx += W + 160;
      var by = hz * (0.30 + i * 0.055) + Math.sin(t * 0.02 + i) * 4;
      var s = 5 + i;
      ctx.beginPath();
      ctx.moveTo(bx - s, by);
      ctx.quadraticCurveTo(bx - s * 0.4, by - s * 0.55, bx, by);
      ctx.quadraticCurveTo(bx + s * 0.4, by - s * 0.55, bx + s, by);
      ctx.stroke();
    }
  }

  function hills(parallax, baseFrac, amp, freq, phase, color) {
    var hz = horizonY();
    var base = hz + (roadY() - hz) * baseFrac;
    var off = d * parallax;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-10, H);
    for (var x = -10; x <= W + 10; x += 8) {
      var wx = (x + off) * freq;
      var y = base
        - Math.sin(wx) * amp
        - Math.sin(wx * 2.17 + phase) * amp * 0.42
        - Math.sin(wx * 0.53 + phase * 1.7) * amp * 0.7;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W + 10, H);
    ctx.closePath();
    ctx.fill();
  }

  function road() {
    var ry = roadY();
    ctx.fillStyle = C.ground;
    ctx.fillRect(0, ry, W, H - ry);

    var g = ctx.createLinearGradient(0, ry, 0, ry + 26);
    g.addColorStop(0, C.roadTop);
    g.addColorStop(1, C.road);
    ctx.fillStyle = g;
    ctx.fillRect(0, ry, W, 26);

    // Roadside reflector posts give the speed something to read against.
    var spacing = 110;
    var first = Math.floor(d / spacing) * spacing;
    for (var m = first - spacing * 2; m < d + W; m += spacing) {
      var x = carX() + (m - d);
      if (x < -20 || x > W + 20) continue;
      ctx.fillStyle = 'rgba(255,235,205,0.30)';
      ctx.fillRect(x, ry - 13, 2.5, 13);
      ctx.fillStyle = '#FF9E5E';
      ctx.fillRect(x - 0.5, ry - 13, 3.5, 3);
    }
  }

  function signpost(stop, idx) {
    var x = carX() + (stop.mile - d);
    if (x < -160 || x > W + 160) return;

    var ry = roadY();
    var isActive = (idx === active);
    var lift = isActive ? 5 : 0;
    var postH = 104;
    var topY = ry - postH - lift;

    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath();
    ctx.ellipse(x + 3, ry + 3, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = C.post;
    ctx.fillRect(x - 3, topY, 6, postH + lift);

    var bw = 128, bh = 46;
    var bx = x - 14, by = topY - 6;

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(isActive ? -0.015 : -0.035);

    if (isActive) {
      ctx.shadowColor = 'rgba(255,201,120,0.75)';
      ctx.shadowBlur = 22;
    }
    ctx.fillStyle = C.board;
    roundRect(0, 0, bw, bh, 8);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = stop.terminal ? '#C8567A' : '#8E7BA8';
    roundRect(8, 8, 20, 20, 6);
    ctx.fill();

    ctx.fillStyle = C.board;
    ctx.font = '600 12px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stop.sign, 18, 19);

    ctx.fillStyle = C.boardInk;
    ctx.textAlign = 'left';
    ctx.font = '500 10px "IBM Plex Mono", monospace';
    ctx.fillText(stop.kind.toUpperCase().slice(0, 16), 36, 15);

    ctx.font = '700 13px Fraunces, Georgia, serif';
    ctx.fillText(clip(stop.title, 15), 36, 32);

    ctx.restore();
  }

  function car() {
    var ry = roadY();
    var bob = reduceMQ.matches ? 0 : Math.sin(t * 0.13) * 1.1 * Math.min(1, Math.abs(v) / CRUISE);
    var x = carX();
    var y = ry - 20 + bob;

    // Headlight beam, pointing down the road ahead.
    var beam = ctx.createLinearGradient(x + 34, y, x + 190, y);
    beam.addColorStop(0, C.beam);
    beam.addColorStop(1, 'rgba(255,226,160,0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(x + 32, y + 2);
    ctx.lineTo(x + 196, y - 16);
    ctx.lineTo(x + 196, y + 22);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath();
    ctx.ellipse(x, ry + 3, 36, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabin
    ctx.fillStyle = C.carDark;
    roundRect(x - 17, y - 19, 36, 22, 8);
    ctx.fill();
    ctx.fillStyle = C.glass;
    roundRect(x - 13, y - 15, 27, 14, 5);
    ctx.fill();

    // Roof case, because every road trip has luggage.
    ctx.fillStyle = '#C8567A';
    roundRect(x - 10, y - 26, 22, 8, 3);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(x - 1, y - 26, 2, 8);

    // Body
    ctx.fillStyle = C.carBody;
    roundRect(x - 31, y - 3, 64, 20, 9);
    ctx.fill();

    ctx.fillStyle = '#FFE9B0';
    roundRect(x + 27, y + 1, 6, 7, 3);
    ctx.fill();
    ctx.fillStyle = '#E05B6A';
    roundRect(x - 33, y + 1, 5, 6, 2.5);
    ctx.fill();

    wheel(x - 17, ry - 3);
    wheel(x + 18, ry - 3);
  }

  function wheel(wx, wy) {
    var spin = d * 0.13;
    ctx.fillStyle = C.tyre;
    ctx.beginPath();
    ctx.arc(wx, wy, 9.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#B9AECB';
    ctx.beginPath();
    ctx.arc(wx, wy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(spin);
    ctx.strokeStyle = 'rgba(25,19,49,0.85)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
    ctx.moveTo(0, -4); ctx.lineTo(0, 4);
    ctx.stroke();
    ctx.restore();
  }

  function grass() {
    var ry = roadY();
    var spacing = 47;
    var first = Math.floor((d * 1.5) / spacing) * spacing;
    ctx.strokeStyle = '#120D24';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    for (var m = first - spacing * 2; m < d * 1.5 + W; m += spacing) {
      var x = carX() + (m - d * 1.5);
      if (x < -20 || x > W + 20) continue;
      var base = ry + 26 + ((m / spacing) % 3) * 9;
      ctx.beginPath();
      ctx.moveTo(x, base);
      ctx.quadraticCurveTo(x + 3, base - 7, x + 7, base - 9);
      ctx.moveTo(x + 2, base);
      ctx.quadraticCurveTo(x + 1, base - 6, x - 2, base - 8);
      ctx.stroke();
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function clip(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  function nearest(at) {
    for (var i = 0; i < stops.length; i++) {
      if (Math.abs(stops[i].mile - at) < NEAR) return i;
    }
    return -1;
  }

  function indexAt(mile) {
    for (var i = 0; i < stops.length; i++) if (stops[i].mile === mile) return i;
    return -1;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    sky();
    sun();
    birds();
    hills(0.06, 0.10, 26, 0.0042, 1.1, C.hillFar);
    hills(0.16, 0.42, 30, 0.0055, 2.7, C.hillMid);
    hills(0.34, 0.78, 26, 0.0078, 0.4, C.hillNear);
    road();
    for (var i = 0; i < stops.length; i++) signpost(stops[i], i);
    car();
    grass();
  }

  /* ---- The marquee card ------------------------------------------- */
  var mYear = document.getElementById('m-year');
  var mKind = document.getElementById('m-kind');
  var mTitle = document.getElementById('m-title');
  var mNote = document.getElementById('m-note');
  var mLink = document.getElementById('m-link');

  function setActive(idx) {
    if (idx === active) return;
    active = idx;
    if (idx < 0) {
      marquee.hidden = true;
    } else {
      var s = stops[idx];
      mYear.textContent = s.year;
      mKind.textContent = s.kind;
      mTitle.textContent = s.title;
      mNote.textContent = s.note;
      mLink.setAttribute('href', s.href);
      mLink.textContent = s.terminal ? 'Send an email' : 'Open case study';
      marquee.hidden = false;
    }
    var dots = routeEl.querySelectorAll('.route-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].setAttribute('aria-current', i === idx ? 'true' : 'false');
    }
  }

  /* ---- Route strip ------------------------------------------------- */
  var marker;
  function buildRoute() {
    routeEl.hidden = false;
    var line = document.createElement('span');
    line.className = 'route-line';
    routeEl.appendChild(line);

    marker = document.createElement('span');
    marker.className = 'route-car';
    marker.setAttribute('aria-hidden', 'true');
    routeEl.appendChild(marker);

    stops.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'route-dot';
      b.style.left = (s.mile / END * 100) + '%';
      b.setAttribute('aria-label', 'Drive to ' + s.title);
      b.setAttribute('aria-current', 'false');
      b.innerHTML = '<span class="route-pip">' + s.sign + '</span>' +
                    '<span class="route-name">' + s.title + '</span>';
      b.addEventListener('click', function () {
        if (reduceMQ.matches) { d = s.mile; glide = null; parked = i; armed = false; }
        else { glide = s.mile; parked = null; }
        hint.classList.add('is-faded');
      });
      routeEl.appendChild(b);
    });
  }

  /* ---- Input -------------------------------------------------------- */
  function keydown(e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === 'd' || k === 'D') { drive = 1; }
    else if (k === 'ArrowLeft' || k === 'a' || k === 'A') { drive = -1; }
    else return;
    glide = null; parked = null; armed = false;
    hint.classList.add('is-faded');
    e.preventDefault();
  }
  function keyup(e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === 'd' || k === 'D' ||
        k === 'ArrowLeft'  || k === 'a' || k === 'A') drive = 0;
  }
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);

  var dragX = null;
  canvas.addEventListener('pointerdown', function (e) {
    dragX = e.clientX; glide = null; parked = null; armed = false;
    canvas.setPointerCapture(e.pointerId);
    hint.classList.add('is-faded');
  });
  canvas.addEventListener('pointermove', function (e) {
    if (dragX === null) return;
    d += (dragX - e.clientX) * 1.1;
    dragX = e.clientX;
  });
  function endDrag() { dragX = null; }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  /* ---- Loop --------------------------------------------------------- */
  var prev = 0;

  // Exponential smoothing that behaves the same at any frame rate.
  function ease(rate, dt) { return 1 - Math.pow(1 - rate, dt); }

  function step(now) {
    var dt = prev ? Math.min((now - prev) / 16.667, 4) : 1;
    prev = now;
    t += dt;

    if (drive !== 0) {
      // Driving by hand overrides everything, and releases any parked stop.
      parked = null; glide = null;
      v += (drive * BOOST - v) * ease(0.08, dt);
      d += v * dt;
    } else if (glide !== null) {
      var gap = glide - d;
      var gk = ease(0.085, dt);
      d += gap * gk;
      v = gap * gk / dt;
      if (Math.abs(gap) < 1.5) {
        d = glide;
        parked = indexAt(glide);
        glide = null;
        v = 0;
      }
    } else if (parked !== null) {
      // Hold position at the signpost so the card can actually be read.
      var hold = stops[parked].mile - d;
      var hk = ease(0.12, dt);
      d += hold * hk;
      v = hold * hk / dt;
      if (Math.abs(hold) < 0.4) { d = stops[parked].mile; v = 0; }
    } else if (!reduceMQ.matches && d < END) {
      v += (CRUISE - v) * ease(0.03, dt);
      d += v * dt;
    } else {
      v *= Math.pow(0.9, dt);
      d += v * dt;
    }

    if (d < 0) { d = 0; v = 0; }
    if (d > END) { d = END; v = 0; }

    var found = nearest(d);
    if (found === -1) armed = true;             // clear of every stop, so ready again
    if (parked === null && glide === null && drive === 0 && armed && found !== -1) {
      parked = found;
    }
    setActive(parked !== null ? parked : found);

    if (marker) marker.style.left = (Math.max(0, Math.min(1, d / END)) * 100) + '%';

    draw();
    if (running) requestAnimationFrame(step);
  }

  /* ---- Boot --------------------------------------------------------- */
  if (reduceMQ.matches) { d = stops[0].mile; parked = 0; }
  else { d = Math.max(60, stops[0].mile - 330); }

  resize();
  buildRoute();
  window.addEventListener('resize', resize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (rows) {
      var vis = rows[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(step); }
      running = vis;
    }, { threshold: 0.01 }).observe(canvas);
  }

  requestAnimationFrame(step);
})();
