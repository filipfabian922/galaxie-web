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
   "default": "\"Jsme tu pro vás už 19 let.\"",
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
   "label": "Služby: Zlato a šperky",
   "type": "image",
   "default": "img/sluzby-zlato.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby2_img",
   "label": "Služby: Elektronika",
   "type": "image",
   "default": "img/sluzby-elektronika.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby3_img",
   "label": "Služby: Hudební nástroje",
   "type": "image",
   "default": "img/sluzby-nastroje.jpg",
   "tab": "fotky",
   "section": "Fotky"
  },
  {
   "key": "sluzby4_img",
   "label": "Služby: Nářadí",
   "type": "image",
   "default": "img/sluzby-naradi.jpg",
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
   "key": "zam_body",
   "label": "Obsah stránky",
   "type": "textarea",
   "default": "Obsah doplníme.",
   "tab": "zamestnanci",
   "section": "Stránka pro zaměstnance",
   "rows": 18,
   "help": "Odstavce odděl prázdným řádkem. Odrážky začni znakem „- “. **tučně**, [text odkazu](https://adresa)."
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
   "ucet",
   "Účet a nastavení"
  ]
 ]
};
