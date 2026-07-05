# ATLAS NEXT 3.7

Gebouwd op NEXT 3.6.

Kern:
Route-intelligentie, dataconsistentie en ATLAS Private.

Nieuw:
- ATLAS Private toegevoegd als aparte routekaart links.
- ATLAS Private is gepositioneerd als discrete route voor hogere segmenten, complexe vermogensposities en zorgvuldige begeleiding.
- Private route bevat:
  - hogere-segment woonpositie
  - vermogen / portefeuille
  - holding-, dividend- of management fee bewijs
  - herkomst eigen middelen
  - discretie- en deelinstellingen
- Starterroute verder opgeschoond:
  - geen overwaarde-kaart bij starters
  - geen eigen-woning-data in starter route
  - makelaarview toont bij starters financiële basis / eigen middelen in plaats van overwaarde
- Makelaarview is nu route-afhankelijk:
  - Starter: inkomen, eigen middelen, documentstatus, woningmatch
  - Doorstromer: overwaarde, huidige woning, woningwaarde, documentstatus
  - Ondernemer/ZZP: bewijs inkomen en documenten
  - Private: vermogenspositie, discretie en private documenten
- Documenten blijven vóór score/resultaat in de route.
- Bewijs-vóór-score blijft de harde productregel.
- Live effect gebruikt voorlopige status zolang documenten niet voldoende zijn.
- ATLAS-bandbreedte blijft in de strakkere 3.6-vorm.

Vercel:
Framework: Vite
Build command: npm run build
Output directory: dist
