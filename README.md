# ATLAS NEXT 3.8

Gebouwd op NEXT 3.7.

Kern van 3.8:
ATLAS is niet alleen een demo, maar krijgt een uitvoerbare verificatie- en pilotlaag.

Nieuw:
- Nieuwe route-stap: Verificatie
- ATLAS Verification Layer toegevoegd:
  1. Ontvangen
  2. Uitgelezen
  3. Consistent
  4. Bronbevestigd / handmatig gevalideerd
- Document Vault toont per document nu ook verificatiestatus en uitleg.
- Execution & Verification Blueprint toegevoegd:
  - Fase 1: werkende demo
  - Fase 2: hybride pilot
  - Fase 3: partnerkoppelingen
  - Fase 4: schaalbaar platform
- Route-afhankelijke controlelogica:
  - Starter: inkomen, eigen middelen, salarisbijschrijving
  - Doorstromer: inkomen + huidige woningpositie
  - ZZP: jaarstukken, IB-aangiftes, prognose, bankdata
  - ATLAS Private: vermogen, herkomst middelen, holding/dividend, discretie
- Makelaarview-principe aangescherpt: status en betrouwbaarheid, geen ruwe documenten.
- Claimgrens zichtbaar:
  - ATLAS geeft geen hypotheekadvies.
  - ATLAS vervangt geen bankcontrole.
  - ATLAS bouwt eerder bewijs op en maakt onderbouwing zichtbaar.
- Bedragen boven €1.000.000 worden nu getoond als mln:
  - Voorbeeld: € 2,2 mln
  - Geen “2239k” meer.
- Bewijs-vóór-score blijft actief.

Vercel:
Framework: Vite
Build command: npm run build
Output directory: dist
