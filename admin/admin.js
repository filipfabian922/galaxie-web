/* Správa webu – přihlášení, úpravy obsahu, fotky, statistiky */
(function () {
  "use strict";
  var CFG = window.GALAXIE_CONFIG, SCH = window.GALAXIE_SCHEMA, FIELDS = SCH.fields, TABS = SCH.tabs;
  var sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $("#app"), loginBox = $("#login");
  var values = {}, pending = {}, tab = "prehled", user = null, statDays = 30, chart = null;
  var PAGES = [["home", "Úvod", "../"], ["onas", "O nás", "../o-nas/"], ["sluzby", "Služby", "../sluzby/"], ["kontakt", "Kontakt", "../kontakt/"], ["zam", "Zaměstnanci", "../zamestnanci/"]];
  var TABPAGE = { oznameni: "home", uvod: "home", onas: "onas", sluzby: "sluzby", kontakt: "kontakt", fotky: "home", zamestnanci: "zam" };
  var pvPage = "home", pvDev = "desk", pvReady = false, pvTimer = null, pvBuilt = false;
  var byKey = {}; FIELDS.forEach(function (f) { byKey[f.key] = f; });

  function h(tag, attrs) {
    var el = document.createElement(tag); attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null || v === false) return;
      if (k === "class") el.className = v; else if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v); else if (v === true) el.setAttribute(k, ""); else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) { var c = arguments[i]; if (c == null || c === false) continue; el.appendChild(typeof c === "string" ? document.createTextNode(c) : c); }
    return el;
  }
  function toast(msg, bad) { var t = $("#toast"); t.textContent = msg; t.className = "show" + (bad ? " bad" : ""); clearTimeout(toast.t); toast.t = setTimeout(function () { t.className = ""; }, 3200); }
  function has(k) { return Object.prototype.hasOwnProperty.call(values, k); }
  function cur(f) { if (Object.prototype.hasOwnProperty.call(pending, f.key)) return pending[f.key]; return has(f.key) && values[f.key] !== null ? values[f.key] : f.default; }
  function imgSrc(v) { return /^https?:/.test(v) ? v : "../" + v; }
  function dirty() { return Object.keys(pending).length; }

  /* ---------- přihlášení ---------- */
  $("#login-form").addEventListener("submit", function (e) {
    e.preventDefault(); var f = e.target, btn = $("button", f), err = $("#login-err"); err.textContent = ""; btn.disabled = true; btn.textContent = "Přihlašuji…";
    sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value }).then(function (r) {
      btn.disabled = false; btn.textContent = "Přihlásit se";
      if (r.error) { err.textContent = /confirm/i.test(r.error.message) ? "E-mail ještě nebyl potvrzen." : "Špatný e-mail nebo heslo."; return; }
      boot(r.data.session);
    });
  });
  function logout() { sb.auth.signOut().then(function () { location.reload(); }); }

  function boot(session) {
    user = session.user;
    sb.rpc("is_admin").then(function (r) {
      if (r.error || r.data !== true) { toast("Tento účet nemá oprávnění ke správě webu.", true); sb.auth.signOut(); loginBox.hidden = false; app.hidden = true; return; }
      return sb.from("site_content").select("key,value").then(function (r2) {
        if (r2.error) { toast("Databáze není připravená: " + r2.error.message, true); return; }
        values = {}; r2.data.forEach(function (x) { values[x.key] = x.value; });
        loginBox.hidden = true; app.hidden = false; render();
      });
    });
  }

  /* ---------- vykreslení ---------- */
  function render() {
    app.innerHTML = "";
    var side = h("nav", { class: "side", "aria-label": "Sekce" });
    TABS.forEach(function (t) {
      var n = FIELDS.filter(function (f) { return f.tab === t[0] && Object.prototype.hasOwnProperty.call(pending, f.key); }).length;
      side.appendChild(h("button", { class: tab === t[0] ? "on" : "", onclick: function () { tab = t[0]; if (TABPAGE[tab]) pvPage = TABPAGE[tab]; render(); window.scrollTo(0, 0); } }, t[1], n ? h("span", { class: "dot", title: "Neuložené změny" }) : null));
    });
    var panel = h("div", { class: "panel" });
    app.appendChild(h("div", { class: "top" }, h("img", { src: "../img/logo.png", alt: "" }), h("b", { text: "Správa webu" }), h("span", { class: "sp" }),
      h("button", { class: "btn small pv-toggle", onclick: function () { document.body.classList.toggle("pv-open"); layoutPv(); }, text: "👁 Náhled" }),
      h("span", { class: "who", text: user.email }), h("a", { class: "btn small", href: "../", target: "_blank", rel: "noopener", text: "Zobrazit web ↗" }), h("button", { class: "btn small", onclick: logout, text: "Odhlásit" })));
    app.appendChild(h("div", { class: "shell" }, side, panel));
    app.appendChild(h("div", { class: "savebar" + (dirty() ? " show" : ""), id: "savebar" }, h("span", { id: "savecount", text: dirty() + " neuložených změn" }),
      h("button", { class: "btn", onclick: discard, text: "Zahodit" }), h("button", { class: "btn primary", id: "savebtn", onclick: save, text: "Uložit a zveřejnit" })));
    if (tab === "prehled") statsPanel(panel); else if (tab === "ucet") accountPanel(panel); else if (tab === "fotky") photosPanel(panel); else formPanel(panel);
    updatePv();
  }
  function updateBar() {
    var b = $("#savebar"); if (!b) return; b.classList.toggle("show", dirty() > 0); document.body.classList.toggle("has-save", dirty() > 0); $("#savecount").textContent = dirty() + " neuložených změn";
    var side = $(".side"); if (side) { var cur = TABS.map(function (t) { return t[0]; }); Array.prototype.forEach.call(side.children, function (btn, i) {
      var n = FIELDS.filter(function (f) { return f.tab === cur[i] && Object.prototype.hasOwnProperty.call(pending, f.key); }).length, d = $(".dot", btn);
      if (n && !d) btn.appendChild(h("span", { class: "dot" })); if (!n && d) d.remove(); }); }
  }
  function discard() { pending = {}; render(); }
  function save() {
    var keys = Object.keys(pending); if (!keys.length) return;
    var btn = $("#savebtn"); btn.disabled = true; btn.textContent = "Ukládám…";
    var rows = keys.map(function (k) { return { key: k, value: pending[k], updated_at: new Date().toISOString() }; });
    sb.from("site_content").upsert(rows, { onConflict: "key" }).then(function (r) {
      btn.disabled = false; btn.textContent = "Uložit a zveřejnit";
      if (r.error) { toast("Uložení se nepovedlo: " + r.error.message, true); return; }
      keys.forEach(function (k) { values[k] = pending[k]; }); pending = {}; toast("Uloženo – změny jsou na webu."); render();
    });
  }
  function resetField(f) {
    delete pending[f.key];
    if (!has(f.key)) { render(); return; }
    sb.from("site_content").delete().eq("key", f.key).then(function (r) { if (r.error) { toast(r.error.message, true); return; } delete values[f.key]; if (f.type === "image") { var fr = $("#pv-frame"); if (fr) fr.removeAttribute("data-src"); } toast("Vráceno na původní text."); render(); });
  }

  /* ---------- formuláře ---------- */
  function control(f) {
    var v = cur(f), el;
    function set(val) { if (JSON.stringify(val) === JSON.stringify(has(f.key) ? values[f.key] : f.default)) delete pending[f.key]; else pending[f.key] = val; updateBar(); if (f.key.indexOf("banner_") === 0) bannerPreview(); pushPreview(); }
    if (f.type === "toggle") {
      el = h("label", { class: "switch" }, h("input", { type: "checkbox", id: "f-" + f.key, checked: v === true || v === "true", onchange: function (e) { set(e.target.checked); } }), h("span", { class: "tr" }), h("span", { text: f.label }));
      return h("div", { class: "field" }, el, f.help ? h("small", { text: f.help }) : null);
    }
    if (f.type === "color") {
      var inp = h("input", { type: "color", id: "f-" + f.key, value: /^#[0-9a-f]{6}$/i.test(v) ? v : "#d4a73f", oninput: function (e) { set(e.target.value); } });
      var sws = ["#d4a73f", "#c62828", "#1e4fa0", "#1d8a4e", "#e8742a", "#6a3fb5"].map(function (c) { return h("button", { type: "button", class: "sw", style: "background:" + c, title: c, "aria-label": "Barva " + c, onclick: function () { inp.value = c; set(c); } }); });
      var box = h("div", { class: "swatches" }); sws.forEach(function (b) { box.appendChild(b); }); box.appendChild(inp); box.appendChild(h("span", { class: "sw-note", text: "← vlastní barva" }));
      return h("div", { class: "field" }, h("label", { for: inp.id, text: f.label }), box, f.help ? h("small", { text: f.help }) : null);
    }
    if (f.type === "textarea") el = h("textarea", { rows: f.rows || 3, oninput: function (e) { set(e.target.value); } }), el.value = v;
    else if (f.type === "select") { el = h("select", { onchange: function (e) { set(e.target.value); } }); f.options.forEach(function (o) { el.appendChild(h("option", { value: o[0], text: o[1], selected: o[0] === v })); }); }
    else { el = h("input", { type: f.type === "url" ? "text" : "text", placeholder: f.ph || "", oninput: function (e) { set(e.target.value); } }); el.value = v; }
    el.id = "f-" + f.key;
    var custom = has(f.key) || Object.prototype.hasOwnProperty.call(pending, f.key);
    return h("div", { class: "field" }, h("label", { for: el.id, text: f.label }), h("div", { class: "row" }, el, custom && f.type !== "select" ? h("button", { class: "btn small reset", type: "button", title: "Vrátit původní text z webu", onclick: function () { resetField(f); }, text: "↺" }) : null), f.help ? h("small", { text: f.help }) : null);
  }
  function formPanel(panel) {
    var t = TABS.filter(function (x) { return x[0] === tab; })[0];
    panel.appendChild(h("h2", { text: t[1] }));
    var lede = { oznameni: "Oznámení se zobrazí v horní liště na každé stránce – třeba sleva, výprodej nebo změna otevírací doby. Bez oznámení zůstává lišta černá s ikonami sítí a kontakty. Barvu si zvolíš sám.", uvod: "Texty na úvodní stránce. Fotky se mění v sekci Fotky.", onas: "Texty podstránky O nás.", zamestnanci: "Stránka je veřejná na adrese /zamestnanci/, ale není nikde na webu odkazovaná. Kdo adresu zná (nebo ji najde Google), stránku uvidí.", sluzby: "Texty podstránky Služby.", kontakt: "Telefon, e-mail, adresa, odkazy na sítě a otevírací doba – změna se projeví na celém webu najednou (i v patičce)." }[tab];
    if (lede) panel.appendChild(h("p", { class: "lede", text: lede }));
    if (TABPAGE[tab]) panel.appendChild(h("p", { class: "tip", text: "💡 Vpravo je živý náhled webu. Klikni na libovolný text nebo fotku v náhledu a otevře se jeho políčko. Změny v náhledu vidíš hned, na web se dostanou po „Uložit a zveřejnit“." }));
    if (tab === "oznameni") panel.appendChild(h("div", { class: "card" }, h("h3", { text: "Náhled" }), h("div", { id: "bar-prev" })));
    var sections = []; FIELDS.filter(function (f) { return f.tab === tab; }).forEach(function (f) { if (sections.indexOf(f.section) < 0) sections.push(f.section); });
    sections.forEach(function (s) {
      var card = h("div", { class: "card" }, h("h3", { text: s })), grid = h("div", { class: "grid2" }), fs = FIELDS.filter(function (f) { return f.tab === tab && f.section === s; });
      var twoCol = fs.length > 3 && fs.every(function (f) { return f.type === "text" || f.type === "url"; }) || /hours/.test(fs[0].key);
      fs.forEach(function (f) { var c = control(f); if (f.type === "textarea" || f.type === "toggle" || !twoCol) c.style.gridColumn = "1/-1"; grid.appendChild(c); });
      card.appendChild(grid); panel.appendChild(card);
    });
    if (tab === "oznameni") bannerPreview();
  }
  function textOn(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || ""); if (!m) return "#fff";
    var n = parseInt(m[1], 16), c = [n >> 16 & 255, n >> 8 & 255, n & 255].map(function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return (.2126 * c[0] + .7152 * c[1] + .0722 * c[2]) > .4 ? "#0a1020" : "#ffffff";
  }
  function bannerPreview() {
    var box = $("#bar-prev"); if (!box) return; box.innerHTML = "";
    var on = cur(byKey.banner_on), text = String(cur(byKey.banner_text) || "").trim(), color = cur(byKey.banner_color), link = String(cur(byKey.banner_link) || "").trim(), label = cur(byKey.banner_link_label) || "Více informací";
    if (!on || !text) { box.appendChild(h("div", { class: "prev-off", text: !on ? "Oznámení je vypnuté – horní lišta na webu zůstává černá." : "Oznámení je zapnuté, ale chybí text – na webu se nezobrazí." })); return; }
    box.appendChild(h("div", { class: "prev-bar", style: "background:" + color + ";color:" + textOn(color) }, h("span", { text: text }), link ? h("a", { href: "#", onclick: function (e) { e.preventDefault(); }, text: label }) : null));
  }

  /* ---------- živý náhled webu ---------- */
  function buildPv() {
    if (pvBuilt) return; pvBuilt = true;
    var pv = $("#pv"), head = $(".pv-pages", pv), frame = $("#pv-frame");
    PAGES.forEach(function (p) { head.appendChild(h("button", { type: "button", "data-p": p[0], onclick: function () { setPage(p[0]); }, text: p[1] })); });
    $(".pv-dev", pv).addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; pvDev = b.dataset.d; layoutPv(); });
    frame.addEventListener("load", function () { pushPreview(true); });
    if (window.ResizeObserver) new ResizeObserver(layoutPv).observe($(".pv-stage", pv)); else window.addEventListener("resize", layoutPv);
    window.addEventListener("message", function (e) {
      if (e.origin !== location.origin || e.source !== frame.contentWindow) return; var d = e.data || {};
      if (d.type === "gx-ready") { pvReady = true; pushPreview(true); }
      else if (d.type === "gx-focus") focusKey(d.key);
    });
    $("#app").addEventListener("focusin", function (e) { var id = e.target && e.target.id; if (id && id.indexOf("f-") === 0) showInPv(id.slice(2)); });
  }
  function setPage(p) { pvPage = p; updatePv(); }
  function updatePv() {
    var on = !!TABPAGE[tab], pv = $("#pv"); document.body.classList.toggle("has-pv", on); pv.hidden = !on;
    if (!on) { document.body.classList.remove("pv-open"); return; }
    buildPv();
    Array.prototype.forEach.call($(".pv-pages", pv).children, function (b) { b.classList.toggle("on", b.dataset.p === pvPage); });
    Array.prototype.forEach.call($(".pv-dev", pv).children, function (b) { b.classList.toggle("on", b.dataset.d === pvDev); });
    var url = PAGES.filter(function (p) { return p[0] === pvPage; })[0][2] + "?gxprev=1", frame = $("#pv-frame");
    if (frame.getAttribute("data-src") !== url) { pvReady = false; frame.setAttribute("data-src", url); frame.src = url; }
    layoutPv(); pushPreview();
  }
  function layoutPv() {
    var stage = $(".pv-stage"), frame = $("#pv-frame"); if (!stage || !stage.clientWidth) return;
    var dw = pvDev === "mob" ? 390 : 1280, W = stage.clientWidth, H = stage.clientHeight, sc = Math.min(1, W / dw);
    frame.style.width = dw + "px"; frame.style.height = Math.ceil(H / sc) + "px"; frame.style.transform = "scale(" + sc + ")";
    frame.style.left = Math.max(0, (W - dw * sc) / 2) + "px";
    Array.prototype.forEach.call($(".pv-dev").children, function (b) { b.classList.toggle("on", b.dataset.d === pvDev); });
  }
  function previewData() {
    var m = {}, labels = {};
    FIELDS.forEach(function (f) {
      var v = cur(f);
      if (f.type === "image") { if (/^https?:/.test(v)) m[f.key] = v; }
      else m[f.key] = v;
      labels[f.key] = /^hours_/.test(f.key) && f.key !== "hours_note" ? "Otevírací doba – " + f.label : (f.section && f.section !== f.label ? f.section + " – " + f.label : f.label);
    });
    return { type: "gx-content", content: m, labels: labels };
  }
  function pushPreview(now) {
    clearTimeout(pvTimer);
    function go() { var fr = $("#pv-frame"); if (!fr || !fr.contentWindow || !pvReady) return; fr.contentWindow.postMessage(previewData(), location.origin); }
    if (now) go(); else pvTimer = setTimeout(go, 120);
  }
  function showInPv(key) { var fr = $("#pv-frame"); if (fr && fr.contentWindow && pvReady) fr.contentWindow.postMessage({ type: "gx-show", key: key }, location.origin); }
  function focusKey(key) {
    var f = byKey[key]; if (!f) { toast("Tento prvek se upravuje jinde."); return; }
    if (f.tab !== tab) { tab = f.tab; render(); }
    setTimeout(function () {
      var el = f.type === "image" ? $('.photo[data-k="' + key + '"]') : $("#f-" + key); if (!el) return;
      var box = f.type === "image" ? el : (el.closest(".field") || el);
      box.scrollIntoView({ behavior: "smooth", block: "center" }); box.classList.remove("flash"); void box.offsetWidth; box.classList.add("flash");
      if (f.type !== "image" && el.focus) el.focus({ preventScroll: true });
    }, 60);
  }

  /* ---------- fotky ---------- */
  function photosPanel(panel) {
    panel.appendChild(h("h2", { text: "Fotky" }));
    panel.appendChild(h("p", { class: "lede", text: "Klikni na „Nahrát novou“, vyber fotku z počítače nebo telefonu – sama se zmenší a hned se zveřejní. Původní fotku lze kdykoli vrátit." }));
    var grid = h("div", { class: "photos" });
    FIELDS.filter(function (f) { return f.type === "image"; }).forEach(function (f) {
      var v = cur(f), custom = has(f.key), input = h("input", { type: "file", accept: "image/*", hidden: true });
      var card = h("div", { class: "photo", "data-k": f.key }, h("div", { class: "im", style: "background-image:url('" + imgSrc(v) + "')" }, custom ? h("span", { text: "Vlastní" }) : null),
        h("div", { class: "bd" }, h("b", { text: f.label }), h("div", { class: "acts" },
          h("button", { class: "btn small primary", onclick: function () { input.click(); }, text: "Nahrát novou" }),
          custom ? h("button", { class: "btn small", onclick: function () { resetField(f); }, text: "Vrátit původní" }) : null), input));
      input.addEventListener("change", function () { if (input.files[0]) upload(f, input.files[0], card); });
      grid.appendChild(card);
    });
    panel.appendChild(grid);
  }
  function resize(file, max) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), im = new Image();
      im.onload = function () {
        var s = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); c.toBlob(function (b) { b ? res(b) : rej(new Error("Fotku se nepodařilo zpracovat")); }, "image/jpeg", .85);
      };
      im.onerror = function () { rej(new Error("Tento soubor není obrázek.")); }; im.src = url;
    });
  }
  function upload(f, file, card) {
    card.classList.add("busy");
    resize(file, f.key === "hero_img" ? 2200 : 1600).then(function (blob) {
      var path = f.key + "-" + Date.now() + ".jpg";
      return sb.storage.from("site-images").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" }).then(function (r) {
        if (r.error) throw r.error;
        var url = CFG.SUPABASE_URL + "/storage/v1/object/public/site-images/" + path;
        return sb.from("site_content").upsert({ key: f.key, value: url, updated_at: new Date().toISOString() }, { onConflict: "key" }).then(function (r2) { if (r2.error) throw r2.error; values[f.key] = url; });
      });
    }).then(function () { toast("Fotka nahrána a zveřejněna."); render(); }).catch(function (e) { card.classList.remove("busy"); toast(e.message || "Nahrání se nepovedlo", true); });
  }

  /* ---------- statistiky ---------- */
  function statsPanel(panel) {
    panel.appendChild(h("h2", { text: "Přehled návštěvnosti" }));
    panel.appendChild(h("p", { class: "lede", text: "Anonymní měření přímo z tohoto webu (bez cookies a bez IP adres). Podrobnosti o vyhledávání na Googlu najdeš v Google Search Console – návod v sekci Účet a nastavení." }));
    var range = h("div", { class: "range" }); [7, 30, 90].forEach(function (d) { range.appendChild(h("button", { class: d === statDays ? "on" : "", onclick: function () { statDays = d; render(); }, text: d + " dní" })); });
    panel.appendChild(range);
    var body = h("div", { text: "Načítám…", class: "empty" }); panel.appendChild(body);
    sb.rpc("admin_stats", { days: statDays }).then(function (r) {
      body.className = ""; body.textContent = "";
      if (r.error) { body.appendChild(h("div", { class: "card" }, h("b", { text: "Statistiky se nepodařilo načíst." }), h("p", { text: r.error.message }))); return; }
      var d = r.data;
      body.appendChild(h("div", { class: "kpis" }, kpi(d.today.views, "zobrazení dnes"), kpi(d.today.visitors, "návštěvníků dnes"), kpi(d.totals.views, "zobrazení za " + statDays + " dní"), kpi(d.totals.visitors, "návštěv za " + statDays + " dní")));
      var cv = h("canvas"); body.appendChild(h("div", { class: "card" }, h("h3", { text: "Návštěvnost po dnech" }), h("div", { class: "chart-box" }, cv)));
      drawChart(cv, d.daily);
      body.appendChild(h("div", { class: "cols" }, barCard("Nejčastější stránky", d.pages.map(function (p) { return [p.path, p.views]; })), barCard("Odkud lidé přicházejí", d.referrers.map(function (p) { return [p.name, p.views]; })), barCard("Zařízení", d.devices.map(function (p) { return [p.name, p.views]; }))));
      if (!d.totals.views) body.appendChild(h("p", { class: "empty", text: "Zatím nejsou žádná data. Měření se spustí, jakmile bude web nasazený na veřejné adrese – návštěvy z počítače při vývoji se nepočítají." }));
    });
  }
  function kpi(n, l) { return h("div", { class: "kpi" }, h("b", { text: String(n) }), h("span", { text: l })); }
  function barCard(title, rows) {
    var max = Math.max.apply(null, rows.map(function (r) { return r[1]; }).concat([1])), box = h("div", { class: "bars" });
    rows.forEach(function (r) { box.appendChild(h("div", { class: "bar" }, h("div", { class: "t" }, h("span", { text: r[0] }), h("b", { text: String(r[1]) })), h("i", { style: "width:" + Math.max(4, r[1] / max * 100) + "%" }))); });
    return h("div", { class: "card" }, h("h3", { text: title }), rows.length ? box : h("div", { class: "empty", text: "Zatím bez dat" }));
  }
  function drawChart(cv, daily) {
    var map = {}; daily.forEach(function (x) { map[x.d] = x; }); var labels = [], views = [], vis = [], now = new Date();
    for (var i = statDays - 1; i >= 0; i--) { var dt = new Date(now - i * 864e5), iso = dt.toISOString().slice(0, 10); labels.push(dt.getDate() + ". " + (dt.getMonth() + 1) + "."); views.push(map[iso] ? map[iso].views : 0); vis.push(map[iso] ? map[iso].visitors : 0); }
    if (chart) chart.destroy();
    chart = new Chart(cv, { type: "line", data: { labels: labels, datasets: [
      { label: "Zobrazení stránek", data: views, borderColor: "#d4a73f", backgroundColor: "rgba(212,167,63,.18)", fill: true, tension: .3, pointRadius: 0, borderWidth: 2.5 },
      { label: "Návštěvníci", data: vis, borderColor: "#121b30", tension: .3, pointRadius: 0, borderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false }, plugins: { legend: { position: "bottom" } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { ticks: { maxTicksLimit: 8 } } } } });
  }


  /* ---------- účet a nastavení ---------- */
  function accountPanel(panel) {
    panel.appendChild(h("h2", { text: "Účet a nastavení" }));
    var siteUrl = new URL("../", location.href).href, sm = new URL("../sitemap.xml", location.href).href;
    function copyRow(val) { var i = h("input", { readonly: true, value: val }); return h("div", { class: "copyrow" }, i, h("button", { class: "btn small", onclick: function () { i.select(); (navigator.clipboard ? navigator.clipboard.writeText(val) : Promise.reject()).then(function () { toast("Zkopírováno"); }, function () { document.execCommand("copy"); toast("Zkopírováno"); }); }, text: "Kopírovat" })); }
    var pw = h("input", { type: "password", autocomplete: "new-password", minlength: 8, placeholder: "Nové heslo (min. 8 znaků)" }), pm = h("div", { class: "err" });
    panel.appendChild(h("div", { class: "card" }, h("h3", { text: "Změna hesla" }), h("div", { class: "field" }, pw), h("button", { class: "btn primary", onclick: function () {
      if (pw.value.length < 8) { pm.textContent = "Heslo musí mít alespoň 8 znaků."; return; }
      sb.auth.updateUser({ password: pw.value }).then(function (r) { if (r.error) { pm.textContent = r.error.message; return; } pw.value = ""; pm.textContent = ""; toast("Heslo změněno."); });
    }, text: "Změnit heslo" }), pm));
    panel.appendChild(h("div", { class: "card help" }, h("h3", { text: "Google Search Console (nepovinné, zdarma)" }),
      h("p", { text: "Ukáže, jak se web zobrazuje ve vyhledávání Google a podle jakých slov vás lidé najdou." }),
      h("ol", {}, h("li", { text: "Otevři search.google.com/search-console a přidej web (typ „Předpona adresy URL“): " + siteUrl }),
        h("li", { text: "Vyber ověření „Značka HTML“ a zkopíruj <meta> značku." }),
        h("li", { text: "Vlož ji do souboru index.html (a ostatních stránek) místo řádku <!-- GOOGLE-VERIFICATION --> a nahraj web na GitHub. Alternativa: ověření přes DNS u Vedosu – bez úpravy kódu." }),
        h("li", { text: "V Search Console pak v části „Mapy webu“ přidej: " + sm }))));
    panel.appendChild(h("div", { class: "card" }, h("h3", { text: "Odhlásit" }), h("button", { class: "btn danger", onclick: logout, text: "Odhlásit se" })));
  }

  window.addEventListener("beforeunload", function (e) { if (dirty()) { e.preventDefault(); e.returnValue = ""; } });
  sb.auth.getSession().then(function (r) { if (r.data && r.data.session) boot(r.data.session); });
})();
