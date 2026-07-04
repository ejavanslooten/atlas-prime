# ATLAS NEXT 3.2

Gebouwd op NEXT 3.1.

Nieuw:
- Linksboven is nu een warme concierge-start in plaats van een koud menu.
- Welkomstkaart: “Hallo Erik, fijn dat je er bent.”
- Routekeuzes zijn premium service-kaarten met icoon, subtitel en pijl.
- “Woonlasten onder druk” is vervangen door “Financiële ruimte verkennen”.
- Deze route voelt discreter: “Discreet overzicht, meer rust.”
- Marktinzicht maakt nu duidelijk onderscheid tussen:
  - Marktdruk: concurrentie in de gemeente
  - ATLAS Kans: past dit bij jouw persoonlijke kooppositie?
- Gemeenten zonder persoonlijke kans tonen geen normale “Bekijk woningen”-actie bij de discrete financiële route.
- Bij Laren/Zeer hoog wordt geen buiten-bereik woning meer automatisch als match geopend.
- Woningmatches tonen bij geen kans liever een rustige uitleg dan een schijnmatch.
- Extra polish voor het 3-Michelin-servicegevoel: persoonlijker, rustiger, meer begeleid.

Vercel:
Framework: Vite
Build command: npm run build
Output directory: dist

Aanvullende patch:
- Marktinzicht gebruikt geen labels Gemiddeld / Hoog / Zeer hoog meer.
- Gemeentes tonen nu een percentage ATLAS Match: 100% is perfecte match.

Runtime fix:
- Blanco scherm opgelost: PieChart icoon werd gebruikt maar niet geïmporteerd.
