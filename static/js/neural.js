/* Neural network hero animation — glowing nodes + connections.
   Lightweight, respects reduced-motion, pauses when offscreen. */
(function () {
  var canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, nodes = [], mouse = { x: -9999, y: -9999 }, running = true;

  var CYAN = '34,211,238';
  var VIOLET = '139,92,246';

  function size() {
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    var count = Math.max(28, Math.min(70, Math.floor((W * H) / 22000)));
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1.2,
        c: Math.random() > 0.5 ? CYAN : VIOLET
      });
    }
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var linkDist = 150;

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // mouse attraction
      var mdx = mouse.x - n.x, mdy = mouse.y - n.y;
      var md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 180) {
        n.x += (mdx / md) * 0.4;
        n.y += (mdy / md) * 0.4;
      }

      // connections
      for (var j = i + 1; j < nodes.length; j++) {
        var m = nodes[j];
        var dx = n.x - m.x, dy = n.y - m.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDist) {
          var a = (1 - d / linkDist) * 0.5;
          ctx.strokeStyle = 'rgba(' + n.c + ',' + a + ')';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }

    // nodes on top (with glow)
    for (var k = 0; k < nodes.length; k++) {
      var p = nodes[k];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.c + ',0.9)';
      ctx.shadowColor = 'rgba(' + p.c + ',0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', size);
  window.addEventListener('mousemove', function (e) {
    var r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  window.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });

  // pause when hero scrolled out of view (saves battery)
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { if (!running) { running = true; step(); } }
        else running = false;
      });
    }, { threshold: 0 }).observe(canvas);
  }

  size();
  if (!reduce) step();
  else { // static frame for reduced-motion users
    ctx.clearRect(0, 0, W, H);
    for (var q = 0; q < nodes.length; q++) {
      var s = nodes[q];
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + s.c + ',0.7)'; ctx.fill();
    }
  }
})();
