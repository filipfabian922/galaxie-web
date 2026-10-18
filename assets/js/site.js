/* Zastavárna, bazar Galaxie – veřejný web: obsah z databáze, oznámení, animace, statistiky */
(function () {
  "use strict";
  var CFG = window.GALAXIE_CONFIG || {};
  var isFile = location.protocol === "file:";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.remove("no-js");

  /* při otevření ze souboru (file://) doplň index.html do odkazů na složky */
  if (isFile) $$("a[href]").forEach(function (a) {
    var h = a.getAttribute("href");
    if (h && !/^(https?:|mailto:|tel:|#)/.test(h) && /\/$/.test(h)) a.setAttribute("href", h + "index.html");
  });

  /* ---------- pomocné ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function paragraphs(text) {
    return String(text).split(/\n\s*\n/).map(function (p) { return "<p>" + esc(p.trim()).replace(/\n/g, "<br>") + "</p>"; }).join("");
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    return /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(u) ? u : (u ? "https://" + u : "");
  }

  /* ---------- obsah z databáze ---------- */
  var DAYS = [["po", "Pondělí"], ["ut", "Úterý"], ["st", "Středa"], ["ct", "Čtvrtek"], ["pa", "Pátek"], ["so", "Sobota"], ["ne", "Neděle"]];
  var content = {};

  function has(k) { return Object.prototype.hasOwnProperty.call(content, k) && content[k] !== null; }

  function applyContent() {
    $$("[data-c]").forEach(function (el) { var k = el.dataset.c; if (has(k)) el.textContent = content[k]; });
    $$("[data-c-p]").forEach(function (el) { var k = el.dataset.cP; if (has(k)) el.innerHTML = paragraphs(content[k]); });
    $$("[data-c-list]").forEach(function (el) {
      var k = el.dataset.cList; if (!has(k)) return;
      var icon = el.dataset.icon ? ($("#" + el.dataset.icon) ? $("#" + el.dataset.icon).innerHTML : "") : "";
      el.innerHTML = String(content[k]).split("\n").filter(function (l) { return l.trim(); }).map(function (l) {
        return "<li>" + (icon ? '<svg class="i" viewBox="0 0 24 24" aria-hidden="true">' + icon + "</svg>" : "") + esc(l.trim()) + "</li>";
      }).join("");
    });
    $$("[data-c-img]").forEach(function (el) { var k = el.dataset.cImg; if (has(k) && content[k]) el.src = content[k]; });
    $$("[data-c-href]").forEach(function (el) {
      var k = el.dataset.cHref; if (!has(k)) return; var v = String(content[k]).trim(), f = el.dataset.fmt;
      if (f === "tel") el.href = "tel:" + v.replace(/[^\d+]/g, "");
      else if (f === "mailto") el.href = "mailto:" + v;
      else if (v) el.href = safeUrl(v);
      if (!v && f === "url") el.hidden = true; else el.hidden = false;
    });
    $$("[data-c-map]").forEach(function (el) {
      var q = has("map_query") ? content.map_query : el.dataset.default;
      el.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&hl=cs&z=16&output=embed";
    });
    $$("[data-c-gdpr]").forEach(function (el) { if (has("gdpr_operator")) el.textContent = content.gdpr_operator; });
    renderHours();
    stats();
  }

  /* ---------- otevírací doba + "právě otevřeno" ---------- */
  function hoursMap() {
    var def = {}; var c = $("[data-hours]");
    try { def = JSON.parse(c ? c.dataset.hours : "{}"); } catch (e) {}
    var out = {};
    DAYS.forEach(function (d) { out[d[0]] = has("hours_" + d[0]) ? String(content["hours_" + d[0]]) : (def[d[0]] || ""); });
    return out;
  }
  function pragueNow() {
    try {
      var p = {}; new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      var idx = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[p.weekday];
      return { day: idx, min: (+p.hour % 24) * 60 + (+p.minute) };
    } catch (e) { var d = new Date(); return { day: (d.getDay() + 6) % 7, min: d.getHours() * 60 + d.getMinutes() }; }
  }
  function ranges(s) {
    var r = [], re = /(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})/g, m;
    while ((m = re.exec(s || ""))) r.push([+m[1] * 60 + +m[2], +m[3] * 60 + +m[4]]);
    return r;
  }
  function fmt(min) { var h = Math.floor(min / 60), m = min % 60; return h + ":" + (m < 10 ? "0" : "") + m; }
  function renderHours() {
    var map = hoursMap(), now = pragueNow();
    $$("[data-hours]").forEach(function (box) {
      box.innerHTML = DAYS.filter(function (d) { return map[d[0]].trim(); }).map(function (d) {
        return '<div class="row' + (DAYS.indexOf(d) === now.day ? " today" : "") + '"><b>' + d[1].slice(0, 2) + "</b><span>" + esc(map[d[0]]) + "</span></div>";
      }).join("");
    });
    $$("[data-hours-note]").forEach(function (el) { el.textContent = has("hours_note") ? content.hours_note : ""; });
    $$("[data-open-badge]").forEach(function (el) {
      var today = ranges(map[DAYS[now.day][0]]), open = null;
      today.forEach(function (r) { if (now.min >= r[0] && now.min < r[1]) open = r; });
      el.classList.remove("is-open", "is-closed");
      if (open) { el.classList.add("is-open"); el.textContent = "Právě otevřeno · do " + fmt(open[1]); return; }
      var next = today.filter(function (r) { return r[0] > now.min; })[0];
      el.classList.add("is-closed");
      if (next) { el.textContent = "Zavřeno · dnes otevíráme v " + fmt(next[0]); return; }
      for (var i = 1; i <= 7; i++) {
        var di = (now.day + i) % 7, rr = ranges(map[DAYS[di][0]]);
        if (rr.length) { el.textContent = "Zavřeno · otevíráme " + (i === 1 ? "zítra" : "v " + DAYS[di][1].toLowerCase().replace(/^(úterý)$/, "úterý")) + " v " + fmt(rr[0][0]); return; }
      }
      el.textContent = "Zavřeno";
    });
  }

  /* ---------- oznamovací lišta ---------- */
  function banner() {
    var el = $("#announce"); if (!el) return;
    var on = content.banner_on === true || content.banner_on === "true";
    var text = has("banner_text") ? String(content.banner_text).trim() : "";
    if (!on || !text) { el.classList.remove("show"); return; }
    var key = "gal-ann-" + text.length + text.charCodeAt(0) + text.charCodeAt(text.length - 1), closed = false;
    try { closed = sessionStorage.getItem(key) === "1"; } catch (e) {}
    if (closed) return;
    el.dataset.style = content.banner_style || "sale";
    var link = has("banner_link") ? safeUrl(content.banner_link) : "";
    var label = has("banner_link_label") && content.banner_link_label ? content.banner_link_label : "Více informací";
    el.innerHTML = '<span></span>' + (link ? '<a href="' + esc(link) + '">' + esc(label) + "</a>" : "") + '<button type="button" aria-label="Zavřít oznámení">×</button>';
    el.firstChild.textContent = text;
    el.classList.add("show");
    el.querySelector("button").onclick = function () { el.classList.remove("show"); try { sessionStorage.setItem(key, "1"); } catch (e) {} };
  }

  /* ---------- načtení dat ---------- */
  function load() {
    if (!CFG.SUPABASE_URL) return Promise.resolve();
    return fetch(CFG.SUPABASE_URL + "/rest/v1/site_content?select=key,value", { headers: { apikey: CFG.SUPABASE_KEY } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (rows) { rows.forEach(function (r) { content[r.key] = r.value; }); window.GALAXIE_CONTENT = content; })
      .catch(function () { /* web funguje i bez databáze – zůstanou výchozí texty */ });
  }

  /* ---------- animace ---------- */
  function countUp(el) {
    var txt = el.textContent, m = txt.match(/\d+/); if (!m || reduce) return;
    var target = +m[0], t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t; var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = txt.replace(/\d+/, Math.round(target * e)); if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function stats() {
    $$("[data-count]").forEach(function (el) { el.dataset.counted = ""; });
  }
  function reveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduce) { items.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; e.target.classList.add("in"); io.unobserve(e.target);
        $$("[data-count]", e.target).forEach(function (c) { if (c.dataset.counted !== "1") { c.dataset.counted = "1"; countUp(c); } });
        if (e.target.hasAttribute("data-count") && e.target.dataset.counted !== "1") { e.target.dataset.counted = "1"; countUp(e.target); }
      });
    }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) { if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", (i % 4) * .08 + "s"); io.observe(el); });
  }
  function header() {
    var h = $(".hdr"), b = $(".burger"), n = $(".nav");
    function onScroll() { h.classList.toggle("solid", window.scrollY > 24); }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    if (b) { b.addEventListener("click", function () { var o = n.classList.toggle("open"); b.setAttribute("aria-expanded", o); }); $$("a", n).forEach(function (a) { a.addEventListener("click", function () { n.classList.remove("open"); }); }); }
    var img = $(".hero-img");
    if (img && !reduce) window.addEventListener("scroll", function () { if (window.scrollY < 900) img.style.translate = "0 " + window.scrollY * .18 + "px"; }, { passive: true });
  }
  function starfield() {
    var c = $(".hero canvas"); if (!c || reduce) return;
    var x = c.getContext("2d"), w, h, S = [], raf;
    function size() { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; S = []; var n = Math.min(90, Math.round(w * h / 14000)); for (var i = 0; i < n; i++) S.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + .3, p: Math.random() * 6.28, s: Math.random() * .02 + .005, v: Math.random() * .12 + .02 }); }
    function draw() {
      x.clearRect(0, 0, w, h);
      S.forEach(function (s) { s.p += s.s; s.y -= s.v; if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; } x.globalAlpha = .25 + .55 * Math.abs(Math.sin(s.p)); x.fillStyle = s.r > 1.1 ? "#f4d98a" : "#fff"; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.28); x.fill(); });
      raf = requestAnimationFrame(draw);
    }
    size(); draw(); window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else draw(); });
  }
  function lightbox() {
    var links = $$(".gallery a"); if (!links.length) return;
    var lb = document.createElement("div"); lb.className = "lb"; lb.innerHTML = '<button type="button" aria-label="Zavřít">×</button><img alt="">'; document.body.appendChild(lb);
    var im = $("img", lb); function close() { lb.classList.remove("open"); }
    links.forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); im.src = a.href; im.alt = $("img", a).alt; lb.classList.add("open"); }); });
    lb.addEventListener("click", function (e) { if (e.target !== im) close(); }); document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- anonymní statistika návštěv (bez cookies, bez IP adres) ---------- */
  function track() {
    if (isFile || /^(localhost|127\.|\[::1\])/.test(location.hostname) || document.body.hasAttribute("data-no-track")) return;
    if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
    var sid, path = location.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/") || "/";
    try { sid = sessionStorage.getItem("gal-sid"); if (!sid) { sid = Math.random().toString(36).slice(2, 12); sessionStorage.setItem("gal-sid", sid); } if (sessionStorage.getItem("gal-p:" + path)) return; sessionStorage.setItem("gal-p:" + path, "1"); } catch (e) { sid = "x"; }
    var ref = ""; try { if (document.referrer) { var u = new URL(document.referrer); if (u.hostname !== location.hostname) ref = u.hostname.replace(/^www\./, ""); } } catch (e) {}
    fetch(CFG.SUPABASE_URL + "/rest/v1/page_views", { method: "POST", keepalive: true, headers: { apikey: CFG.SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ path: path.slice(0, 200), referrer: ref.slice(0, 120), device: window.innerWidth < 760 ? "mobil" : window.innerWidth < 1100 ? "tablet" : "počítač", sid: sid }) }).catch(function () {});
  }

  /* ---------- start ---------- */
  header(); starfield(); lightbox(); reveal(); renderHours();
  setInterval(renderHours, 60000);
  load().then(function () { applyContent(); banner(); track(); });
})();
