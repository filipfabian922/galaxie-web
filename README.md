# Zastavárna, bazar Galaxie – web

Statický web (HTML/CSS/JS bez build kroku) + administrace napojená na Supabase.
Hosting: GitHub Pages. Repozitář: `filipfabian922/galaxie-web`.

## Struktura
| Cesta | Co to je |
|---|---|
| `index.html`, `o-nas/`, `sluzby/`, `kontakt/`, `ochrana-osobnich-udaju/` | stránky webu |
| `404.html` | chybová stránka; zároveň obsluhuje **skrytou stránku zaměstnanců** (adresa je jen v databázi) |
| `admin/` | administrace (přihlášení e-mailem a heslem) |
| `assets/css/style.css`, `assets/js/site.js` | vzhled a chování webu |
| `assets/js/config.js` | adresa Supabase a veřejný klíč |
| `assets/js/content-schema.js` | seznam editovatelných polí (texty, fotky) a jejich výchozí hodnoty |
| `img/` | fotky (zmenšené z originálů) |
| `supabase/schema.sql` | databáze – spustit jednou v Supabase SQL Editoru (už spuštěno) |

## Jak to funguje
Texty, kontakty, otevírací doba, fotky i lišta s oznámením se při načtení stránky stáhnou z databáze a přepíšou výchozí obsah, který je zapsaný v HTML (to je text původního webu 1:1). Když databáze nedostupná, web ukáže výchozí obsah.
Administrace ukládá do tabulky `site_content`, fotky do úložiště `site-images`. Zapisovat smí jen přihlášený administrátor (e-mail v tabulce `admins`), čtení je veřejné.

## První spuštění administrace
1. Supabase → **Authentication → Users → Add user → Create new user** → e-mail `peterfabian@email.cz`, heslo, zaškrtnout **Auto Confirm User**.
2. Supabase → **Authentication → Sign In / Providers → Allow new users to sign up: vypnout** (nikdo další se nemůže registrovat).
3. Otevři `…/admin/` a přihlas se. Po prvním přihlášení si změň heslo (Účet a nastavení).

## Náhled u sebe
Dvojklik na `Spustit-nahled.bat` (potřebuje Python nebo Node.js) nebo prostě otevři `index.html` v prohlížeči.
Ve Visual Studiu: **Soubor → Otevřít → Složka** a vyber tuto složku.

## Nasazení na GitHub Pages (zdarma)
1. Dvojklik na `nahrat-na-github.bat` (při prvním použití se otevře přihlášení na GitHub).
2. GitHub → repozitář → **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`** → Save.
3. Web poběží na `https://filipfabian922.github.io/galaxie-web/`. Každé další spuštění `nahrat-na-github.bat` nasadí změny kódu.
Pozn.: texty a fotky se mění v administraci a **nevyžadují** nahrávání na GitHub.

## Vlastní doména (Vedos)
1. Kup doménu u Vedosu.
2. V adresáři projektu spusť v PowerShellu: `.\nastav-domenu.ps1 -Domena tvoje-domena.cz` a pak `nahrat-na-github.bat`.
3. Ve Vedosu → správa DNS (smaž výchozí A/AAAA/CNAME záznamy pro `@` a `www`) a přidej:
   - `@`  A     185.199.108.153
   - `@`  A     185.199.109.153
   - `@`  A     185.199.110.153
   - `@`  A     185.199.111.153
   - `@`  AAAA  2606:50c0:8000::153
   - `@`  AAAA  2606:50c0:8001::153
   - `@`  AAAA  2606:50c0:8002::153
   - `@`  AAAA  2606:50c0:8003::153
   - `www` CNAME `filipfabian922.github.io.`
4. GitHub → Settings → Pages → Custom domain: `tvoje-domena.cz` → Save → po ověření zaškrtnout **Enforce HTTPS** (do 24 h).

## Google Search Console
Přidej web (předpona adresy URL), ověř značkou HTML – vlož ji do HTML místo komentáře `<!-- GOOGLE-VERIFICATION -->` – nebo ověř přes DNS u Vedosu (bez zásahu do kódu). Pak přidej mapu webu `https://tvoje-domena.cz/sitemap.xml`.

## Bezpečnost
- Veřejný klíč Supabase (`sb_publishable_…`) v `config.js` je určený pro prohlížeč. Data chrání pravidla RLS v `supabase/schema.sql`.
- Do repozitáře nikdy nedávej klíč `service_role` ani heslo.
