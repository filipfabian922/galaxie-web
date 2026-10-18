/* Stránka 404. Zároveň slouží jako skrytá stránka zaměstnanců:
   adresa (tajný odkaz) se nikde na webu ani v repozitáři neukládá – ověřuje ji databáze. */
(function () {
  var CFG = window.GALAXIE_CONFIG || {}, $ = function (s) { return document.querySelector(s); };
  var segs = location.pathname.split("/").filter(Boolean), slug = segs[segs.length - 1] || "";
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(slug) || !CFG.SUPABASE_URL) return;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|tel:[^)\s]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
  }
  function render(text) {
    var out = "", list = false;
    String(text).split(/\n/).forEach(function (line) {
      var m = line.match(/^\s*[-•]\s+(.*)$/);
      if (m) { if (!list) { out += "<ul>"; list = true; } out += "<li>" + inline(m[1]) + "</li>"; return; }
      if (list) { out += "</ul>"; list = false; }
      if (line.trim()) out += "<p>" + inline(line) + "</p>";
    });
    return out + (list ? "</ul>" : "");
  }
  fetch(CFG.SUPABASE_URL + "/rest/v1/rpc/staff_get", { method: "POST", headers: { apikey: CFG.SUPABASE_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ p_slug: slug }) })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || !d.title) return;
      document.title = d.title;
      $("#nf-title").textContent = d.title;
      var b = $("#nf-body"); b.innerHTML = render(d.body);
      b.parentNode.parentNode.parentNode.classList.add("staff-body");
      var h = document.querySelector(".page-hero .wrap"); h.insertAdjacentHTML("afterbegin", '<span class="staff-note">Interní stránka</span><br>');
    }).catch(function () {});
})();
