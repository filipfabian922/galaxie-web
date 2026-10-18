/* Správa webu – přihlášení, úpravy obsahu, fotky, statistiky */
(function () {
  "use strict";
  var CFG = window.GALAXIE_CONFIG, SCH = window.GALAXIE_SCHEMA, FIELDS = SCH.fields, TABS = SCH.tabs;
  var sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $("#app"), loginBox = $("#login");
  var values = {}, pending = {}, tab = "prehled", user = null, statDays = 30, chart = null;
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
      side.appendChild(h("button", { class: tab === t[0] ? "on" : "", onclick: function () { tab = t[0]; render(); window.scrollTo(0, 0); } }, t[1], n ? h("span", { class: "dot", title: "Neuložené změny" }) : null));
    });
    var panel = h("div", { class: "panel" });
    app.appendChild(h("div", { class: "top" }, h("img", { src: "../img/logo.png", alt: "" }), h("b", { text: "Správa webu" }), h("span", { class: "sp" }),
      h("span", { class: "who", text: user.email }), h("a", { class: "btn small", href: "../", target: "_blank", rel: "noopener", text: "Zobrazit web ↗" }), h("button", { class: "btn small", onclick: logout, text: "Odhlásit" })));
    app.appendChild(h("div", { class: "shell" }, side, panel));
    app.appendChild(h("div", { class: "savebar" + (dirty() ? " show" : ""), id: "savebar" }, h("span", { id: "savecount", text: dirty() + " neuložených změn" }),
      h("button", { class: "btn", onclick: discard, text: "Zahodit" }), h("button", { class: "btn primary", id: "savebtn", onclick: save, text: "Uložit a zveřejnit" })));
    if (tab === "prehled") statsPanel(panel); else if (tab === "zamestnanci") staffPanel(panel); else if (tab === "ucet") accountPanel(panel); else if (tab === "fotky") photosPanel(panel); else formPanel(panel);
  }
  function updateBar() {
    var b = $("#savebar"); if (!b) return; b.classList.toggle("show", dirty() > 0); $("#savecount").textContent = dirty() + " neuložených změn";
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
    sb.from("site_content").delete().eq("key", f.key).then(function (r) { if (r.error) { toast(r.error.message, true); return; } delete values[f.key]; toast("Vráceno na původní text."); render(); });
  }

  /* ---------- formuláře ---------- */
  function control(f) {
    var v = cur(f), el;
    function set(val) { if (JSON.stringify(val) === JSON.stringify(has(f.key) ? values[f.key] : f.default)) delete pending[f.key]; else pending[f.key] = val; updateBar(); if (f.key.indexOf("banner_") === 0) bannerPreview(); }
    if (f.type === "toggle") {
      el = h("label", { class: "switch" }, h("input", { type: "checkbox", checked: v === true || v === "true", onchange: function (e) { set(e.target.checked); } }), h("span", { class: "tr" }), h("span", { text: f.label }));
      return h("div", { class: "field" }, el, f.help ? h("small", { text: f.help }) : null);
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
    var lede = { oznameni: "Lišta s oznámením se zobrazí nahoře na každé stránce – třeba sleva, výprodej nebo změna otevírací doby. Když ji vypneš, z webu zmizí.", uvod: "Texty na úvodní stránce. Fotky se mění v sekci Fotky.", onas: "Texty podstránky O nás.", sluzby: "Texty podstránky Služby.", kontakt: "Telefon, e-mail, adresa, odkazy na sítě a otevírací doba – změna se projeví na celém webu najednou (i v patičce)." }[tab];
    if (lede) panel.appendChild(h("p", { class: "lede", text: lede }));
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
  function bannerPreview() {
    var box = $("#bar-prev"); if (!box) return; box.innerHTML = "";
    var on = cur(byKey.banner_on), text = String(cur(byKey.banner_text) || "").trim(), style = cur(byKey.banner_style), link = String(cur(byKey.banner_link) || "").trim(), label = cur(byKey.banner_link_label) || "Více informací";
    if (!on || !text) { box.appendChild(h("div", { class: "prev-off", text: !on ? "Lišta je vypnutá – na webu není vidět." : "Lišta je zapnutá, ale chybí text – na webu se nezobrazí." })); return; }
    box.appendChild(h("div", { class: "prev-bar " + style }, h("span", { text: text }), link ? h("a", { href: "#", onclick: function (e) { e.preventDefault(); }, text: label }) : null));
  }

  /* ---------- fotky ---------- */
  function photosPanel(panel) {
    panel.appendChild(h("h2", { text: "Fotky" }));
    panel.appendChild(h("p", { class: "lede", text: "Klikni na „Nahrát novou“, vyber fotku z počítače nebo telefonu – sama se zmenší a hned se zveřejní. Původní fotku lze kdykoli vrátit." }));
    var grid = h("div", { class: "photos" });
    FIELDS.filter(function (f) { return f.type === "image"; }).forEach(function (f) {
      var v = cur(f), custom = has(f.key), input = h("input", { type: "file", accept: "image/*", hidden: true });
      var card = h("div", { class: "photo" }, h("div", { class: "im", style: "background-image:url('" + imgSrc(v) + "')" }, custom ? h("span", { text: "Vlastní" }) : null),
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


  /* ---------- skrytá stránka zaměstnanců ---------- */
  function staffUrl(slug) { return new URL("../" + slug + "/", location.href).href; }
  function staffPanel(panel) {
    panel.appendChild(h("h2", { text: "Zaměstnanci" }));
    panel.appendChild(h("p", { class: "lede", text: "Skrytá stránka bez odkazu z webu a bez zápisu ve vyhledávačích. Otevře se jen na tajné adrese – ta i obsah jsou uložené v databázi, ne v kódu webu." }));
    var box = h("div", { class: "empty", text: "Načítám…" }); panel.appendChild(box);
    sb.from("staff_page").select("slug,title,body").eq("id", 1).maybeSingle().then(function (r) {
      box.className = ""; box.textContent = "";
      if (r.error || !r.data) { box.appendChild(h("div", { class: "card" }, h("b", { text: "Stránku se nepodařilo načíst." }), h("p", { text: r.error ? r.error.message : "Spusť aktuální supabase/schema.sql." }))); return; }
      var d = r.data, urlIn = h("input", { readonly: true, value: staffUrl(d.slug) });
      var title = h("input", { type: "text" }), body = h("textarea", { rows: 18 }); title.value = d.title; body.value = d.body;
      box.appendChild(h("div", { class: "card" }, h("h3", { text: "Tajná adresa" }),
        h("div", { class: "copyrow" }, urlIn, h("button", { class: "btn small", onclick: function () { urlIn.select(); (navigator.clipboard ? navigator.clipboard.writeText(urlIn.value) : Promise.reject()).then(function () { toast("Zkopírováno"); }, function () { document.execCommand("copy"); toast("Zkopírováno"); }); }, text: "Kopírovat" }),
          h("button", { class: "btn small", onclick: function () { if (!confirm("Vygenerovat novou adresu? Stará přestane fungovat.")) return; var n = Array.prototype.map.call(crypto.getRandomValues(new Uint8Array(10)), function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); sb.from("staff_page").update({ slug: n, updated_at: new Date().toISOString() }).eq("id", 1).then(function (x) { if (x.error) return toast(x.error.message, true); toast("Nová adresa vytvořena."); render(); }); }, text: "Nová adresa" })),
        h("p", { class: "lede", style: "margin:10px 0 0", text: "Kdo odkaz zná, stránku uvidí. Nedávej na ni hesla ani citlivé osobní údaje." })));
      box.appendChild(h("div", { class: "card" }, h("h3", { text: "Obsah" }),
        h("div", { class: "field" }, h("label", { text: "Nadpis stránky" }), title),
        h("div", { class: "field" }, h("label", { text: "Text" }), body, h("small", { text: "Odstavce odděl prázdným řádkem. Odrážky začni znakem „- “. **tučně**, [text odkazu](https://adresa)." })),
        h("button", { class: "btn primary", onclick: function () { sb.from("staff_page").update({ title: title.value, body: body.value, updated_at: new Date().toISOString() }).eq("id", 1).then(function (x) { if (x.error) return toast(x.error.message, true); toast("Uloženo."); }); }, text: "Uložit stránku" })));
    });
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
