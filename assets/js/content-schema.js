/* Popis všech upravitelných polí – generováno ze schématu */
window.GALAXIE_SCHEMA = {
 "fields": [
  {
   "key": "banner_on",
   "label": "Zobrazit lištu s oznámením na webu",
   "type": "toggle",
   "default": false,
   "tab": "oznameni",
   "section": "Lišta nahoře na webu",
   "help": "Oznámení se zobrazí v černé horní liště (mezi ikonami sítí a kontakty). Zobrazí se jen když je zapnuté A má vyplněný text."
  },
  {
   "key": "banner_text",
   "label": "Text oznámení",
   "type": "text",
   "default": "",
   "tab": "oznameni",
   "section": "Lišta nahoře na webu",
   "ph": "např. Sleva 10 % na všechno zlato do konce měsíce!"
  },
  {
   "key": "banner_color",
   "label": "Barva lišty",
   "type": "color",
   "default": "#d4a73f",
   "tab": "oznameni",
   "section": "Lišta nahoře na webu",
   "help": "Když není oznámení zapnuté, lišta zůstane černá. Barva textu se přizpůsobí sama."
  },
  {
   "key": "status_mode",
   "label": "Co ukazovat",
   "type": "select",
   "default": "auto",
   "tab": "oznameni",
   "section": "Stav „otevřeno / zavřeno“ na úvodní stránce",
   "options": [
    [
     "auto",
     "Automaticky podle otevírací doby"
    ],
    [
     "open",
     "Ručně: otevřeno"
    ],
    [
     "closed",
     "Ručně: zavřeno"
    ],
    [
     "hide",
     "Nezobrazovat nic"
    ]
   ],
   "help": "Pro výjimky (zkrácená doba, dovolená, nemoc). Nastavení platí jen v zadaném rozsahu níže."
  },
  {
   "key": "status_text",
   "label": "Vlastní text (nepovinné)",
   "type": "text",
   "default": "",
   "tab": "oznameni",
   "section": "Stav „otevřeno / zavřeno“ na úvodní stránce",
   "ph": "např. Dnes otevřeno jen do 12:00",
   "help": "Když necháte prázdné, ukáže se jen „Právě otevřeno“ nebo „Zavřeno“."
  },
  {
   "key": "status_scope",
   "label": "Jak dlouho to platí",
   "type": "select",
   "default": "today",
   "tab": "oznameni",
   "section": "Stav „otevřeno / zavřeno“ na úvodní stránce",
   "options": [
    [
     "today",
     "Jen dnes (ve 24:00 se vrátí automatika)"
    ],
    [
     "forever",
     "Do odvolání"
    ]
   ],
   "help": "Doporučeno „Jen dnes“, ať na to nezapomenete."
  },
  {
   "key": "banner_link",
   "label": "Odkaz (nepovinné)",
   "type": "url",
   "default": "",
   "tab": "oznameni",
   "section": "Lišta nahoře na webu",
   "ph": "např. /kontakt/ nebo https://…"
  },
  {
   "key": "banner_link_label",
   "label": "Text odkazu (nepovinné)",
   "type": "text",
   "default": "Více informací",
   "tab": "oznameni",
   "section": "Lišta nahoře na webu"
  },
  {
   "key": "hero_title",
   "label": "Hlavní nadpis",
   "type": "text",
   "default": "Tradice, které můžete věřit...",
   "tab": "uvod",
   "section": "Úvodní obrázek (hero)"
  },
  {
   "key": "hero_quote",
   "label": "Podnadpis (citace)",
   "type": "text",
   "default": "„Jsme tu pro vás už 19 let.“",
   "tab": "uvod",
   "section": "Úvodní obrázek (hero)"
  },
  {
   "key": "hero_btn1",
   "label": "Tlačítko 1",
   "type": "text",
   "default": "Naše služby",
   "tab": "uvod",
   "section": "Úvodní obrázek (hero)"
  },
  {
   "key": "hero_btn2",
   "label": "Tlačítko 2 (zavolat)",
   "type": "text",
   "default": "Zavolat",
   "tab": "uvod",
   "section": "Úvodní obrázek (hero)"
  },
  {
   "key": "stat1_value",
   "label": "Číslo 1",
   "type": "text",
   "default": "19 let",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat1_label",
   "label": "Popisek 1",
   "type": "text",
   "default": "tradice od roku 2007",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat2_value",
   "label": "Číslo 2",
   "type": "text",
   "default": "od 2 %",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat2_label",
   "label": "Popisek 2",
   "type": "text",
   "default": "úrok na zástavu",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat3_value",
   "label": "Číslo 3",
   "type": "text",
   "default": "Zdarma",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat3_label",
   "label": "Popisek 3",
   "type": "text",
   "default": "nezávazné ocenění zlata",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat4_value",
   "label": "Číslo 4",
   "type": "text",
   "default": "Ihned",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "stat4_label",
   "label": "Popisek 4",
   "type": "text",
   "default": "peníze v hotovosti",
   "tab": "uvod",
   "section": "Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "cats_title",
   "label": "Nadpis sekce s kategoriemi",
   "type": "text",
   "default": "Co u nás najdete",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cats_btn",
   "label": "Tlačítko pod kategoriemi",
   "type": "text",
   "default": "Služby",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat1_title",
   "label": "Kategorie 1 – název",
   "type": "text",
   "default": "Zlato",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat1_text",
   "label": "Kategorie 1 – popis",
   "type": "textarea",
   "default": "Šperky, slitky i zlomky, zlato vykoupíme rychle a spolehlivě.",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat2_title",
   "label": "Kategorie 2 – název",
   "type": "text",
   "default": "Stříbro",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat2_text",
   "label": "Kategorie 2 – popis",
   "type": "textarea",
   "default": "Stříbrné šperky, slitky...",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat3_title",
   "label": "Kategorie 3 – název",
   "type": "text",
   "default": "Hudební nástroje",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat3_text",
   "label": "Kategorie 3 – popis",
   "type": "textarea",
   "default": "Kytary, klávesy, zvuková technika i další nástroje...",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat4_title",
   "label": "Kategorie 4 – název",
   "type": "text",
   "default": "Elektronika",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat4_text",
   "label": "Kategorie 4 – popis",
   "type": "textarea",
   "default": "Telefony, notebooky, PC, konzole, hodinky či reproduktory - široká nabídka elektroniky.",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat5_title",
   "label": "Kategorie 5 – název",
   "type": "text",
   "default": "Auta",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat5_text",
   "label": "Kategorie 5 – popis",
   "type": "textarea",
   "default": "Výkup a zástava automobilů za férových podmínek.",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat6_title",
   "label": "Kategorie 6 – název",
   "type": "text",
   "default": "Motocykly",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat6_text",
   "label": "Kategorie 6 – popis",
   "type": "textarea",
   "default": "Výkup i zástava motorek a skútrů.",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat7_title",
   "label": "Kategorie 7 – název",
   "type": "text",
   "default": "Sportovní vybavení",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat7_text",
   "label": "Kategorie 7 – popis",
   "type": "textarea",
   "default": "Kola, lyže, brusle či další sportovní vybavení.",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "cat8_title",
   "label": "Kategorie 8 – název",
   "type": "text",
   "default": "Nářadí",
   "tab": "uvod",
   "section": "Kategorie zboží"
  },
  {
   "key": "cat8_text",
   "label": "Kategorie 8 – popis",
   "type": "textarea",
   "default": "Elektrické i ruční nářadí.",
   "tab": "uvod",
   "section": "Kategorie zboží",
   "rows": 2
  },
  {
   "key": "gold_title",
   "label": "Nadpis",
   "type": "text",
   "default": "Kvalitní zlato za férové ceny",
   "tab": "uvod",
   "section": "Sekce zlato"
  },
  {
   "key": "gold_text",
   "label": "Text",
   "type": "textarea",
   "default": "Vykupujeme a zastavujeme zlato všech typů – šperky, investiční slitky, i zlomky. Pokud potřebujete rychlé a spolehlivé řešení, jsme tu pro vás – rychle, diskrétně a bez zbytečných formalit.",
   "tab": "uvod",
   "section": "Sekce zlato",
   "rows": 4
  },
  {
   "key": "gold_btn",
   "label": "Tlačítko",
   "type": "text",
   "default": "O nás",
   "tab": "uvod",
   "section": "Sekce zlato"
  },
  {
   "key": "feat1_title",
   "label": "Přednost 1 – nadpis",
   "type": "text",
   "default": "Profesionální a spolehlivé jednání.",
   "tab": "uvod",
   "section": "Tři přednosti"
  },
  {
   "key": "feat1_text",
   "label": "Přednost 1 – text",
   "type": "textarea",
   "default": "Profesionální a rychlý přístup je klíčovým faktorem pro spokojenost zákazníků.",
   "tab": "uvod",
   "section": "Tři přednosti",
   "rows": 3
  },
  {
   "key": "feat2_title",
   "label": "Přednost 2 – nadpis",
   "type": "text",
   "default": "Široký výběr kvalitního zboží.",
   "tab": "uvod",
   "section": "Tři přednosti"
  },
  {
   "key": "feat2_text",
   "label": "Přednost 2 – text",
   "type": "textarea",
   "default": "Široký výběr kvalitního a prověřeného zboží nabízí zákazníkům možnost výběru, zaručující vysokou kvalitu a spokojenost.",
   "tab": "uvod",
   "section": "Tři přednosti",
   "rows": 3
  },
  {
   "key": "feat3_title",
   "label": "Přednost 3 – nadpis",
   "type": "text",
   "default": "Ochota a přátelský přístup",
   "tab": "uvod",
   "section": "Tři přednosti"
  },
  {
   "key": "feat3_text",
   "label": "Přednost 3 – text",
   "type": "textarea",
   "default": "Ochota a přátelský přístup s maximální diskrétností k zákazníkům a okolí.",
   "tab": "uvod",
   "section": "Tři přednosti",
   "rows": 3
  },
  {
   "key": "visit_title",
   "label": "Nadpis – prodejna",
   "type": "text",
   "default": "Prodejna:",
   "tab": "uvod",
   "section": "Prodejna a otevírací doba"
  },
  {
   "key": "hours_title",
   "label": "Nadpis – otevírací doba",
   "type": "text",
   "default": "Otevírací doba:",
   "tab": "uvod",
   "section": "Prodejna a otevírací doba"
  },
  {
   "key": "cta_title",
   "label": "Výzva ke kontaktu – nadpis",
   "type": "text",
   "default": "Chcete nás kontaktovat?",
   "tab": "uvod",
   "section": "Výzva ke kontaktu (dolní pruh)"
  },
  {
   "key": "cta_btn",
   "label": "Výzva ke kontaktu – tlačítko",
   "type": "text",
   "default": "Ozvěte se nám",
   "tab": "uvod",
   "section": "Výzva ke kontaktu (dolní pruh)"
  },
  {
   "key": "about_title",
   "label": "Nadpis stránky",
   "type": "text",
   "default": "O nás",
   "tab": "onas",
   "section": "Úvod"
  },
  {
   "key": "about_intro",
   "label": "Úvodní text (odstavce odděl prázdným řádkem)",
   "type": "textarea",
   "default": "Jsme zastavárna a bazar s tradicí už od roku 2007. Nabízíme férové podmínky, úrok už od 2 % a peníze hned proti zástavě. Zabýváme se výkupem i zástavami zlata, stříbra, elektroniky (telefony, PC, hodinky, konzole a další), hudebních nástrojů, kol a nářadí.\n\nDáváme důraz na rychlost, spolehlivost a osobní přístup. Přijďte se přesvědčit sami.",
   "tab": "onas",
   "section": "Úvod",
   "rows": 7
  },
  {
   "key": "about_gold_title",
   "label": "Nadpis – zlato",
   "type": "text",
   "default": "Kvalitní zlato za férové ceny",
   "tab": "onas",
   "section": "Sekce zlato"
  },
  {
   "key": "about_gold_text",
   "label": "Text – zlato",
   "type": "textarea",
   "default": "Vykupujeme i zastavujeme zlaté šperky, investiční slitky i zlomky – vše vždy za férovou cenu.\n\nZlato oceňujeme zdarma a nezávazně, peníze vyplácíme okamžitě v hotovosti.\nÚrok na zástavu začíná už od 2 % a celý proces je rychlý a diskrétní.",
   "tab": "onas",
   "section": "Sekce zlato",
   "rows": 7
  },
  {
   "key": "about_closing",
   "label": "Závěr",
   "type": "textarea",
   "default": "Pokud hledáte spolehlivé a profesionální jednání, jste u nás na správném místě.\nZastavte se – rádi vám pomůžeme.",
   "tab": "onas",
   "section": "Závěr",
   "rows": 3
  },
  {
   "key": "serv_title",
   "label": "Nadpis stránky",
   "type": "text",
   "default": "Služby",
   "tab": "sluzby",
   "section": "Úvod"
  },
  {
   "key": "serv_lead",
   "label": "Úvodní otázka",
   "type": "textarea",
   "default": "Hledáte skvělé podmínky a rychlou hotovost, nebo chcete jen ušetřit při koupi bazarového zboží?",
   "tab": "sluzby",
   "section": "Úvod",
   "rows": 2
  },
  {
   "key": "serv_intro",
   "label": "Úvodní text",
   "type": "textarea",
   "default": "Už od roku 2007 nabízíme profesionální služby v oblasti výkupu a zástav. Specializujeme se na zlato, stříbro, elektroniku a další předměty, které u nás můžete jednoduše zastavit nebo výhodně prodat. Poskytujeme zástavy s úrokem již od 2 % – bez zbytečných otázek, rychle a spolehlivě.",
   "tab": "sluzby",
   "section": "Úvod",
   "rows": 5
  },
  {
   "key": "serv_list_title",
   "label": "Nadpis seznamu",
   "type": "text",
   "default": "Zastavujeme a vykupujeme:",
   "tab": "sluzby",
   "section": "Seznam zboží"
  },
  {
   "key": "serv_list",
   "label": "Seznam (jedna položka = jeden řádek)",
   "type": "textarea",
   "default": "Zlato a stříbro (šperky, slitky, zlomky)\nMobilní telefony\nNotebooky\nPočítače\nHerní konzole\nHudební nástroje\nKola\nAuta\nMotocykly\nNářadí\nJiné zboží dle domluvy",
   "tab": "sluzby",
   "section": "Seznam zboží",
   "rows": 12
  },
  {
   "key": "serv_closing",
   "label": "Závěr",
   "type": "textarea",
   "default": "Vše probíhá rychle, diskrétně a s maximálním důrazem na vaší spokojenost. Přijďte se přesvědčit, u nás dostanete vždy tu nejlepší možnou nabídku.",
   "tab": "sluzby",
   "section": "Závěr",
   "rows": 3
  },
  {
   "key": "phone",
   "label": "Telefon",
   "type": "text",
   "default": "+420 774 808 008",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "email",
   "label": "E-mail",
   "type": "text",
   "default": "peterfabian@email.cz",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "addr_building",
   "label": "Budova",
   "type": "text",
   "default": "Komerční dům Moskva",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "addr_street",
   "label": "Ulice",
   "type": "text",
   "default": "Spojenecká 123",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "addr_city",
   "label": "PSČ a město",
   "type": "text",
   "default": "541 01 Trutnov",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "facebook",
   "label": "Facebook (odkaz)",
   "type": "url",
   "default": "https://www.facebook.com/share/1AcT1ZZFrk/",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "instagram",
   "label": "Instagram (odkaz)",
   "type": "url",
   "default": "https://www.instagram.com/zastavarna_bazar_galaxie",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "map_query",
   "label": "Hledání na mapě Google",
   "type": "text",
   "default": "Spojenecká 123, 541 01 Trutnov",
   "tab": "kontakt",
   "section": "Kontaktní údaje",
   "help": "Podle tohoto textu se zobrazí mapa."
  },
  {
   "key": "kontakt_title",
   "label": "Nadpis stránky Kontakt",
   "type": "text",
   "default": "Kontakt",
   "tab": "kontakt",
   "section": "Kontaktní údaje"
  },
  {
   "key": "hours_po",
   "label": "Pondělí",
   "type": "text",
   "default": "10:00–12:30 14:00–17:00",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_ut",
   "label": "Úterý",
   "type": "text",
   "default": "9:00–12:30 14:00–17:00",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_st",
   "label": "Středa",
   "type": "text",
   "default": "9:00–12:30 14:00–17:00",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_ct",
   "label": "Čtvrtek",
   "type": "text",
   "default": "9:00–12:30 14:00–17:00",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_pa",
   "label": "Pátek",
   "type": "text",
   "default": "9:00–12:30 14:00–17:00",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_so",
   "label": "Sobota",
   "type": "text",
   "default": "",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_ne",
   "label": "Neděle",
   "type": "text",
   "default": "",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. 9:00–12:30 14:00–17:00 (prázdné = zavřeno / skryté)"
  },
  {
   "key": "hours_note",
   "label": "Poznámka k otevírací době",
   "type": "text",
   "default": "",
   "tab": "kontakt",
   "section": "Otevírací doba",
   "ph": "např. Ve čtvrtek 29. 10. máme zavřeno.",
   "help": "Zobrazí se pod otevírací dobou. Prázdné = nezobrazí se."
  },
  {
   "key": "gdpr_operator",
   "label": "Správce osobních údajů (jméno/firma, IČO)",
   "type": "textarea",
   "default": "provozovatel zastavárny a bazaru Galaxie, Komerční dům Moskva, Spojenecká 123, 541 01 Trutnov",
   "tab": "kontakt",
   "section": "Ochrana osobních údajů",
   "rows": 2,
   "help": "Doplň sem celý název firmy nebo jméno podnikatele a IČO."
  },
  {
   "key": "hero_img",
   "label": "Úvodní velká fotka (hero)",
   "type": "image",
   "default": "img/hero-galerie.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat1_img",
   "label": "Kategorie: Zlato",
   "type": "image",
   "default": "img/kat-zlato.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat2_img",
   "label": "Kategorie: Stříbro",
   "type": "image",
   "default": "img/kat-stribro.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat3_img",
   "label": "Kategorie: Hudební nástroje",
   "type": "image",
   "default": "img/kat-nastroje.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat4_img",
   "label": "Kategorie: Elektronika",
   "type": "image",
   "default": "img/kat-elektronika.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat5_img",
   "label": "Kategorie: Auta",
   "type": "image",
   "default": "img/kat-auta.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat6_img",
   "label": "Kategorie: Motocykly",
   "type": "image",
   "default": "img/kat-motocykly.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat7_img",
   "label": "Kategorie: Sportovní vybavení",
   "type": "image",
   "default": "img/kat-sport.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "cat8_img",
   "label": "Kategorie: Nářadí",
   "type": "image",
   "default": "img/kat-naradi.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby1_img",
   "label": "Služby: Hodinky",
   "type": "image",
   "default": "img/sluzby-hodinky.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby2_img",
   "label": "Služby: Šperky",
   "type": "image",
   "default": "img/sluzby-sperky.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby3_img",
   "label": "Služby: Elektronika",
   "type": "image",
   "default": "img/sluzby-klavesnice.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby4_img",
   "label": "Služby: Nářadí",
   "type": "image",
   "default": "img/sluzby-vrtacka.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "zam1_img",
   "label": "Zaměstnanec 1 – profilová fotka",
   "type": "image",
   "default": "img/avatar.svg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "zam2_img",
   "label": "Zaměstnanec 2 – profilová fotka",
   "type": "image",
   "default": "img/avatar.svg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "gold_img",
   "label": "Sekce zlato (úvod i O nás)",
   "type": "image",
   "default": "img/zlato-detail.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "gal1_img",
   "label": "Galerie prodejny 1",
   "type": "image",
   "default": "img/prodejna-1.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "gal2_img",
   "label": "Galerie prodejny 2",
   "type": "image",
   "default": "img/prodejna-2.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "gal3_img",
   "label": "Galerie prodejny 3",
   "type": "image",
   "default": "img/prodejna-3.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "gal4_img",
   "label": "Galerie prodejny 4",
   "type": "image",
   "default": "img/prodejna-4.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "zam_title",
   "label": "Nadpis stránky",
   "type": "text",
   "default": "Zaměstnanci",
   "tab": "zamestnanci",
   "section": "Stránka pro zaměstnance",
   "help": "Stránka je veřejná na adrese /zamestnanci/, ale není nikde na webu odkazovaná. Najde ji každý, kdo zná adresu (nebo ji najde Google). Nedávej sem hesla ani citlivé údaje."
  },
  {
   "key": "zam1_name",
   "label": "Zaměstnanec 1 – jméno",
   "type": "text",
   "default": "Peter Fabian",
   "tab": "zamestnanci",
   "section": "Zaměstnanec 1"
  },
  {
   "key": "zam1_city",
   "label": "Zaměstnanec 1 – město",
   "type": "text",
   "default": "Trutnov",
   "tab": "zamestnanci",
   "section": "Zaměstnanec 1"
  },
  {
   "key": "zam2_name",
   "label": "Zaměstnanec 2 – jméno",
   "type": "text",
   "default": "Mgr. Adriana Dolinská",
   "tab": "zamestnanci",
   "section": "Zaměstnanec 2"
  },
  {
   "key": "zam2_city",
   "label": "Zaměstnanec 2 – město",
   "type": "text",
   "default": "Prešov",
   "tab": "zamestnanci",
   "section": "Zaměstnanec 2"
  },
  {
   "key": "zam_body",
   "label": "Doplňující text pod kartami (nepovinné)",
   "type": "textarea",
   "default": "",
   "tab": "zamestnanci",
   "section": "Doplňující text",
   "rows": 8,
   "help": "Prázdné = nezobrazí se. Odstavce odděl prázdným řádkem. Fotky zaměstnanců se nahrávají v sekci Fotky."
  },
  {
   "key": "sk_banner_text",
   "label": "Text oznámení",
   "type": "text",
   "default": "",
   "tab": "sk",
   "section": "Oznámení – Lišta nahoře na webu",
   "ph": "např. Sleva 10 % na všechno zlato do konce měsíce!"
  },
  {
   "key": "sk_status_text",
   "label": "Vlastní text (nepovinné)",
   "type": "text",
   "default": "",
   "tab": "sk",
   "section": "Oznámení – Stav „otevřeno / zavřeno“ na úvodní stránce",
   "ph": "např. Dnes otevřeno jen do 12:00"
  },
  {
   "key": "sk_banner_link_label",
   "label": "Text odkazu (nepovinné)",
   "type": "text",
   "default": "Viac informácií",
   "tab": "sk",
   "section": "Oznámení – Lišta nahoře na webu"
  },
  {
   "key": "sk_hero_title",
   "label": "Hlavní nadpis",
   "type": "text",
   "default": "Tradícia, ktorej môžete dôverovať...",
   "tab": "sk",
   "section": "Úvod – Úvodní obrázek (hero)"
  },
  {
   "key": "sk_hero_quote",
   "label": "Podnadpis (citace)",
   "type": "text",
   "default": "„Sme tu pre vás už 19 rokov.“",
   "tab": "sk",
   "section": "Úvod – Úvodní obrázek (hero)"
  },
  {
   "key": "sk_hero_btn1",
   "label": "Tlačítko 1",
   "type": "text",
   "default": "Naše služby",
   "tab": "sk",
   "section": "Úvod – Úvodní obrázek (hero)"
  },
  {
   "key": "sk_hero_btn2",
   "label": "Tlačítko 2 (zavolat)",
   "type": "text",
   "default": "Zavolať",
   "tab": "sk",
   "section": "Úvod – Úvodní obrázek (hero)"
  },
  {
   "key": "sk_stat1_value",
   "label": "Číslo 1",
   "type": "text",
   "default": "19 rokov",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat1_label",
   "label": "Popisek 1",
   "type": "text",
   "default": "tradícia od roku 2007",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat2_value",
   "label": "Číslo 2",
   "type": "text",
   "default": "od 2 %",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat2_label",
   "label": "Popisek 2",
   "type": "text",
   "default": "úrok na zálohu",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat3_value",
   "label": "Číslo 3",
   "type": "text",
   "default": "Zadarmo",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat3_label",
   "label": "Popisek 3",
   "type": "text",
   "default": "nezáväzné ocenenie zlata",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat4_value",
   "label": "Číslo 4",
   "type": "text",
   "default": "Ihneď",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_stat4_label",
   "label": "Popisek 4",
   "type": "text",
   "default": "peniaze v hotovosti",
   "tab": "sk",
   "section": "Úvod – Pruh s čísly (animované počítadlo)"
  },
  {
   "key": "sk_cats_title",
   "label": "Nadpis sekce s kategoriemi",
   "type": "text",
   "default": "Čo u nás nájdete",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cats_btn",
   "label": "Tlačítko pod kategoriemi",
   "type": "text",
   "default": "Služby",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat1_title",
   "label": "Kategorie 1 – název",
   "type": "text",
   "default": "Zlato",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat1_text",
   "label": "Kategorie 1 – popis",
   "type": "textarea",
   "default": "Šperky, zlitky aj zlomky, zlato vykúpime rýchlo a spoľahlivo.",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat2_title",
   "label": "Kategorie 2 – název",
   "type": "text",
   "default": "Striebro",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat2_text",
   "label": "Kategorie 2 – popis",
   "type": "textarea",
   "default": "Strieborné šperky, zlitky...",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat3_title",
   "label": "Kategorie 3 – název",
   "type": "text",
   "default": "Hudobné nástroje",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat3_text",
   "label": "Kategorie 3 – popis",
   "type": "textarea",
   "default": "Gitary, klávesy, zvuková technika aj ďalšie nástroje...",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat4_title",
   "label": "Kategorie 4 – název",
   "type": "text",
   "default": "Elektronika",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat4_text",
   "label": "Kategorie 4 – popis",
   "type": "textarea",
   "default": "Telefóny, notebooky, PC, konzoly, hodinky či reproduktory – široká ponuka elektroniky.",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat5_title",
   "label": "Kategorie 5 – název",
   "type": "text",
   "default": "Autá",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat5_text",
   "label": "Kategorie 5 – popis",
   "type": "textarea",
   "default": "Výkup a záloha automobilov za férových podmienok.",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat6_title",
   "label": "Kategorie 6 – název",
   "type": "text",
   "default": "Motocykle",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat6_text",
   "label": "Kategorie 6 – popis",
   "type": "textarea",
   "default": "Výkup aj záloha motoriek a skútrov.",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat7_title",
   "label": "Kategorie 7 – název",
   "type": "text",
   "default": "Športové vybavenie",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat7_text",
   "label": "Kategorie 7 – popis",
   "type": "textarea",
   "default": "Bicykle, lyže, korčule či ďalšie športové vybavenie.",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_cat8_title",
   "label": "Kategorie 8 – název",
   "type": "text",
   "default": "Náradie",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží"
  },
  {
   "key": "sk_cat8_text",
   "label": "Kategorie 8 – popis",
   "type": "textarea",
   "default": "Elektrické aj ručné náradie.",
   "tab": "sk",
   "section": "Úvod – Kategorie zboží",
   "rows": 2
  },
  {
   "key": "sk_gold_title",
   "label": "Nadpis",
   "type": "text",
   "default": "Kvalitné zlato za férové ceny",
   "tab": "sk",
   "section": "Úvod – Sekce zlato"
  },
  {
   "key": "sk_gold_text",
   "label": "Text",
   "type": "textarea",
   "default": "Vykupujeme a prijímame do zálohy zlato všetkých druhov – šperky, investičné zlitky aj zlomky. Ak potrebujete rýchle a spoľahlivé riešenie, sme tu pre vás – rýchlo, diskrétne a bez zbytočných formalít.",
   "tab": "sk",
   "section": "Úvod – Sekce zlato",
   "rows": 4
  },
  {
   "key": "sk_gold_btn",
   "label": "Tlačítko",
   "type": "text",
   "default": "O nás",
   "tab": "sk",
   "section": "Úvod – Sekce zlato"
  },
  {
   "key": "sk_feat1_title",
   "label": "Přednost 1 – nadpis",
   "type": "text",
   "default": "Profesionálne a spoľahlivé jednanie.",
   "tab": "sk",
   "section": "Úvod – Tři přednosti"
  },
  {
   "key": "sk_feat1_text",
   "label": "Přednost 1 – text",
   "type": "textarea",
   "default": "Profesionálny a rýchly prístup je kľúčovým faktorom spokojnosti zákazníkov.",
   "tab": "sk",
   "section": "Úvod – Tři přednosti",
   "rows": 3
  },
  {
   "key": "sk_feat2_title",
   "label": "Přednost 2 – nadpis",
   "type": "text",
   "default": "Široký výber kvalitného tovaru.",
   "tab": "sk",
   "section": "Úvod – Tři přednosti"
  },
  {
   "key": "sk_feat2_text",
   "label": "Přednost 2 – text",
   "type": "textarea",
   "default": "Široký výber kvalitného a preverného tovaru dáva zákazníkom možnosť výberu a zaručuje vysokú kvalitu a spokojnosť.",
   "tab": "sk",
   "section": "Úvod – Tři přednosti",
   "rows": 3
  },
  {
   "key": "sk_feat3_title",
   "label": "Přednost 3 – nadpis",
   "type": "text",
   "default": "Ochota a priateľský prístup",
   "tab": "sk",
   "section": "Úvod – Tři přednosti"
  },
  {
   "key": "sk_feat3_text",
   "label": "Přednost 3 – text",
   "type": "textarea",
   "default": "Ochota a priateľský prístup s maximálnou diskrétnosťou voči zákazníkom aj okoliu.",
   "tab": "sk",
   "section": "Úvod – Tři přednosti",
   "rows": 3
  },
  {
   "key": "sk_visit_title",
   "label": "Nadpis – prodejna",
   "type": "text",
   "default": "Predajňa:",
   "tab": "sk",
   "section": "Úvod – Prodejna a otevírací doba"
  },
  {
   "key": "sk_hours_title",
   "label": "Nadpis – otevírací doba",
   "type": "text",
   "default": "Otváracia doba:",
   "tab": "sk",
   "section": "Úvod – Prodejna a otevírací doba"
  },
  {
   "key": "sk_cta_title",
   "label": "Výzva ke kontaktu – nadpis",
   "type": "text",
   "default": "Chcete nás kontaktovať?",
   "tab": "sk",
   "section": "Úvod – Výzva ke kontaktu (dolní pruh)"
  },
  {
   "key": "sk_cta_btn",
   "label": "Výzva ke kontaktu – tlačítko",
   "type": "text",
   "default": "Ozvite sa nám",
   "tab": "sk",
   "section": "Úvod – Výzva ke kontaktu (dolní pruh)"
  },
  {
   "key": "sk_about_title",
   "label": "Nadpis stránky",
   "type": "text",
   "default": "O nás",
   "tab": "sk",
   "section": "O nás – Úvod"
  },
  {
   "key": "sk_about_intro",
   "label": "Úvodní text (odstavce odděl prázdným řádkem)",
   "type": "textarea",
   "default": "Sme záložňa a bazár s tradíciou už od roku 2007. Ponúkame férové podmienky, úrok už od 2 % a peniaze hneď proti záloge. Zaoberáme sa výkupom aj zálohami zlata, striebra, elektroniky (telefóny, PC, hodinky, konzoly a ďalšie), hudobných nástrojov, bicyklov a náradia.\n\nKladieme dôraz na rýchlosť, spoľahlivosť a osobný prístup. Príďte sa presvedčiť sami.",
   "tab": "sk",
   "section": "O nás – Úvod",
   "rows": 7
  },
  {
   "key": "sk_about_gold_title",
   "label": "Nadpis – zlato",
   "type": "text",
   "default": "Kvalitné zlato za férové ceny",
   "tab": "sk",
   "section": "O nás – Sekce zlato"
  },
  {
   "key": "sk_about_gold_text",
   "label": "Text – zlato",
   "type": "textarea",
   "default": "Vykupujeme aj prijímame do zálohy zlaté šperky, investičné zlitky aj zlomky – vždy za férovú cenu.\n\nZlato oceňujeme zadarmo a nezáväzne, peniaze vyplácame okamžite v hotovosti.\nÚrok na zálohu začína už od 2 % a celý proces je rýchly a diskrétny.",
   "tab": "sk",
   "section": "O nás – Sekce zlato",
   "rows": 7
  },
  {
   "key": "sk_about_closing",
   "label": "Závěr",
   "type": "textarea",
   "default": "Ak hľadáte spoľahlivé a profesionálne jednanie, ste u nás na správnom mieste.\nZastavte sa – radi vám pomôžeme.",
   "tab": "sk",
   "section": "O nás – Závěr",
   "rows": 3
  },
  {
   "key": "sk_serv_title",
   "label": "Nadpis stránky",
   "type": "text",
   "default": "Služby",
   "tab": "sk",
   "section": "Služby – Úvod"
  },
  {
   "key": "sk_serv_lead",
   "label": "Úvodní otázka",
   "type": "textarea",
   "default": "Hľadáte skvelé podmienky a rýchlu hotovosť, alebo chcete len ušetriť pri kúpe bazárového tovaru?",
   "tab": "sk",
   "section": "Služby – Úvod",
   "rows": 2
  },
  {
   "key": "sk_serv_intro",
   "label": "Úvodní text",
   "type": "textarea",
   "default": "Už od roku 2007 ponúkame profesionálne služby v oblasti výkupu a záloh. Špecializujeme sa na zlato, striebro, elektroniku a ďalšie predmety, ktoré u nás môžete jednoducho založiť alebo výhodne predať. Poskytujeme zálohy s úrokom už od 2 % – bez zbytočných otázok, rýchlo a spoľahlivo.",
   "tab": "sk",
   "section": "Služby – Úvod",
   "rows": 5
  },
  {
   "key": "sk_serv_list_title",
   "label": "Nadpis seznamu",
   "type": "text",
   "default": "Prijímame do zálohy a vykupujeme:",
   "tab": "sk",
   "section": "Služby – Seznam zboží"
  },
  {
   "key": "sk_serv_list",
   "label": "Seznam (jedna položka = jeden řádek)",
   "type": "textarea",
   "default": "Zlato a striebro (šperky, zlitky, zlomky)\nMobilné telefóny\nNotebooky\nPočítače\nHerné konzoly\nHudobné nástroje\nBicykle\nAutá\nMotocykle\nNáradie\nIný tovar podľa dohody",
   "tab": "sk",
   "section": "Služby – Seznam zboží",
   "rows": 12
  },
  {
   "key": "sk_serv_closing",
   "label": "Závěr",
   "type": "textarea",
   "default": "Všetko prebieha rýchlo, diskrétne a s maximálnym dôrazom na vašu spokojnosť. Príďte sa presvedčiť, u nás dostanete vždy tú najlepšiu možnú ponuku.",
   "tab": "sk",
   "section": "Služby – Závěr",
   "rows": 3
  },
  {
   "key": "sk_kontakt_title",
   "label": "Nadpis stránky Kontakt",
   "type": "text",
   "default": "Kontakt",
   "tab": "sk",
   "section": "Kontakt – Kontaktní údaje"
  },
  {
   "key": "sk_hours_note",
   "label": "Poznámka k otevírací době",
   "type": "text",
   "default": "",
   "tab": "sk",
   "section": "Kontakt – Otevírací doba",
   "ph": "např. Ve čtvrtek 29. 10. máme zavřeno."
  },
  {
   "key": "sk_gdpr_operator",
   "label": "Správce osobních údajů (jméno/firma, IČO)",
   "type": "textarea",
   "default": "prevádzkovateľ záložne a bazára Galaxie, Komerční dům Moskva, Spojenecká 123, 541 01 Trutnov, Česká republika",
   "tab": "sk",
   "section": "Kontakt – Ochrana osobních údajů",
   "rows": 2,
   "help": "Doplň sem celý název firmy nebo jméno podnikatele a IČO."
  },
  {
   "key": "sk_zam_title",
   "label": "Nadpis stránky",
   "type": "text",
   "default": "Zamestnanci",
   "tab": "sk",
   "section": "zamestnanci – Stránka pro zaměstnance",
   "help": "Stránka je veřejná na adrese /zamestnanci/, ale není nikde na webu odkazovaná. Najde ji každý, kdo zná adresu (nebo ji najde Google). Nedávej sem hesla ani citlivé údaje."
  },
  {
   "key": "sk_zam_body",
   "label": "Doplňující text pod kartami (nepovinné)",
   "type": "textarea",
   "default": "",
   "tab": "sk",
   "section": "zamestnanci – Doplňující text",
   "rows": 8,
   "help": "Prázdné = nezobrazí se. Odstavce odděl prázdným řádkem. Fotky zaměstnanců se nahrávají v sekci Fotky."
  }
 ],
 "tabs": [
  [
   "prehled",
   "Přehled"
  ],
  [
   "oznameni",
   "Oznámení"
  ],
  [
   "uvod",
   "Úvodní stránka"
  ],
  [
   "onas",
   "O nás"
  ],
  [
   "sluzby",
   "Služby"
  ],
  [
   "kontakt",
   "Kontakt a hodiny"
  ],
  [
   "fotky",
   "Fotky"
  ],
  [
   "zamestnanci",
   "Zaměstnanci"
  ],
  [
   "sk",
   "Slovenčina (SK)"
  ],
  [
   "ucet",
   "Účet a nastavení"
  ]
 ]
};
