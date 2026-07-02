
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home, Route, HousePlus, Search, Bot, Share2, Compass, CheckCircle2,
  Circle, AlertTriangle, TrendingUp, FileText, Wallet, MapPin, Clock3,
  ShieldCheck, Building2, Car, GraduationCap, Leaf, Send, Sparkles,
  Eye, LockKeyhole, Database
} from 'lucide-react';
import './styles.css';

const buyer = {
  name: 'Erik',
  fullName: 'Erik van Slooten',
  initials: 'EV',
  income: 72800,
  partnerIncome: 57600,
  cash: 85000,
  leaseMonthly: 550,
  loans: 25000,
  docs: 82,
  confidence: 84,
  homeValue: 642000,
  mortgageLeft: 418000,
  sellingCosts: 21000,
  saleStatus: 'Nog niet verkocht',
  address: 'Laarderweg 23, Eemnes',
  commuteTarget: 'Amsterdam Zuid',
  family: 'Gezin met 2 kinderen'
};

const homes = [
  {
    id: 'baarn',
    title: 'Nieuwbouw Baarn',
    city: 'Baarn',
    price: 515000,
    monthly: 2260,
    match: 94,
    confidence: 91,
    finance: 93,
    acceptance: 64,
    commute: '31 min',
    school: '900 m',
    growth: '+4.1%',
    label: 'A++',
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'eemnes',
    title: 'Gezinswoning Eemnes',
    city: 'Eemnes',
    price: 675000,
    monthly: 2920,
    match: 87,
    confidence: 83,
    finance: 88,
    acceptance: 51,
    commute: '42 min',
    school: '650 m',
    growth: '+3.2%',
    label: 'A',
    img: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'bussum',
    title: 'Hoekwoning Bussum',
    city: 'Bussum',
    price: 725000,
    monthly: 3180,
    match: 76,
    confidence: 74,
    finance: 81,
    acceptance: 39,
    commute: '28 min',
    school: '1.2 km',
    growth: '+3.8%',
    label: 'B',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'laren',
    title: 'Vrijstaand Laren',
    city: 'Laren',
    price: 925000,
    monthly: 4050,
    match: 48,
    confidence: 41,
    finance: 55,
    acceptance: 21,
    commute: '39 min',
    school: '1.8 km',
    growth: '+2.9%',
    label: 'A',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
  }
];

function euro(n){ return '€ ' + Math.round(n).toLocaleString('nl-NL'); }
function short(n){ return '€ ' + Math.round(n/1000) + 'k'; }
function equity(){ return Math.max(0, buyer.homeValue - buyer.mortgageLeft - buyer.sellingCosts); }
function usableEquity(){ return Math.round(equity() * .82); }
function buyingPower(){ return Math.round((buyer.income + buyer.partnerIncome) * 4.45 + buyer.cash * .82 + usableEquity() - buyer.leaseMonthly * 180 - buyer.loans * 1.15 - 35000); }
function level(v){ return v >= 82 ? 'green' : v >= 62 ? 'yellow' : 'red'; }

const journey = [
  ['Persoonlijk', 100],
  ['Inkomen', 96],
  ['Eigen woning', 75],
  ['Documenten', 82],
  ['Koopruimte', 88],
  ['Woningen', 91],
  ['Paspoort', 68],
  ['Final check', 35]
];

function Badge({value, children}){ return <span className={'badge ' + level(value)}>{children}</span>; }
function Bar({value}){ return <div className="bar"><span className={level(value)} style={{width: value + '%'}} /></div>; }

function App(){
  const [page, setPage] = useState('cockpit');
  const [homeId, setHomeId] = useState('baarn');
  const selectedHome = homes.find(h => h.id === homeId);
  const koopklaar = 84;

  return <div className="app">
    <aside>
      <div className="brand"><div className="mark">A</div><div><b>ATLAS</b><span>NEXT 2.0</span></div></div>
      <div className="journey">
        {journey.map(([name, score], i) => (
          <button key={name} className={page === 'route' ? 'routebtn active' : 'routebtn'} onClick={() => setPage('route')}>
            <span className={score >= 80 ? 'done' : score >= 60 ? 'busy' : 'todo'}>{score >= 80 ? '✓' : i+1}</span>
            <div><b>{name}</b><small>{score}%</small></div>
          </button>
        ))}
      </div>
      <nav>
        <button onClick={() => setPage('cockpit')} className={page === 'cockpit' ? 'on' : ''}><Compass/> Cockpit</button>
        <button onClick={() => setPage('home')} className={page === 'home' ? 'on' : ''}><HousePlus/> Mijn woning</button>
        <button onClick={() => setPage('matches')} className={page === 'matches' ? 'on' : ''}><Home/> Matches</button>
        <button onClick={() => setPage('coach')} className={page === 'coach' ? 'on' : ''}><Bot/> Koopcoach</button>
        <button onClick={() => setPage('share')} className={page === 'share' ? 'on' : ''}><Share2/> Deel ATLAS</button>
      </nav>
    </aside>

    <main>
      {page === 'cockpit' && <Cockpit koopklaar={koopklaar} setPage={setPage} selectedHome={selectedHome}/>}
      {page === 'route' && <RoutePage/>}
      {page === 'home' && <MyHome/>}
      {page === 'matches' && <Matches homeId={homeId} setHomeId={setHomeId} selectedHome={selectedHome}/>}
      {page === 'coach' && <Coach selectedHome={selectedHome}/>}
      {page === 'share' && <Share selectedHome={selectedHome}/>}
    </main>
  </div>
}

function Cockpit({koopklaar, setPage, selectedHome}){
  return <section>
    <div className="hero">
      <div>
        <span className="kicker">ATLAS Confidence Engine</span>
        <h1>Goedemorgen {buyer.name}.</h1>
        <p className="lead">Je bent vandaag <b>{koopklaar}% koopklaar</b>. Nog 2 acties en je kunt je ATLAS Paspoort sterker delen met makelaars.</p>
        <div className="actions">
          <button onClick={() => setPage('route')}>Bekijk mijn route</button>
          <button className="secondary" onClick={() => setPage('matches')}>Bekijk woningmatches</button>
        </div>
      </div>
      <div className="scoreOrb">
        <span>Koopklaar</span>
        <strong>{koopklaar}</strong>
        <Bar value={koopklaar}/>
        <small>Confidence: 91%</small>
      </div>
    </div>

    <div className="today">
      <ActionCard title="Verkoopwaarde woning bevestigen" points="+9 punten" text="Bevestig je woningwaarde scan om je overwaardestatus te versterken." icon={<HousePlus/>}/>
      <ActionCard title="Laatste salarisstrook uploaden" points="+4 punten" text="Hierdoor stijgt je documentstatus en makelaarsvertrouwen." icon={<FileText/>}/>
      <ActionCard title="Beste match vandaag" points={`${selectedHome.match}% match`} text={`${selectedHome.title} in ${selectedHome.city}`} icon={<Home/>}/>
    </div>

    <div className="wideInsight">
      <Bot/>
      <div>
        <b>Koopcoach Insight</b>
        <p>Je overwaarde is belangrijker dan je salaris in deze zoektocht. Als je huidige woning eerst verkoopt, stijgt je koopruimte naar ongeveer {short(buyingPower()+45000)}.</p>
      </div>
      <button onClick={() => setPage('coach')}>Bekijk advies</button>
    </div>
  </section>
}

function ActionCard({title, points, text, icon}){
  return <article className="actionCard">{icon}<Badge value={80}>{points}</Badge><h3>{title}</h3><p>{text}</p></article>
}

function RoutePage(){
  return <section>
    <Header kicker="Koopklaar Journey" title="Niet zoeken in menu’s. Volg je route naar een nieuw huis." text="ATLAS toont stap voor stap wat klaar is, wat ontbreekt en wat de volgende beste actie is."/>
    <div className="routeTimeline">
      {journey.map(([name, score], i) => (
        <div className="routeStep" key={name}>
          <div className={'routeIcon ' + level(score)}>{score >= 80 ? <CheckCircle2/> : score >= 60 ? <AlertTriangle/> : <Circle/>}</div>
          <div>
            <h3>{name}</h3>
            <p>{score >= 80 ? 'Gereed' : score >= 60 ? 'Aandacht nodig' : 'Nog starten'}</p>
            <Bar value={score}/>
          </div>
          <strong>{score}%</strong>
        </div>
      ))}
    </div>
  </section>
}

function MyHome(){
  return <section>
    <Header kicker="Mijn Woning Engine" title="Overwaarde is pas waardevol als je weet wat inzetbaar is." text="ATLAS combineert adresdata, marktwaarde, hypotheekrestschuld en timingrisico tot vrije overwaarde."/>
    <div className="homeEngine">
      <div className="mapCard">
        <Search/>
        <h3>{buyer.address}</h3>
        <p>Google Maps autocomplete · BAG · WOZ · Kadaster · CBS · Energielabel</p>
      </div>
      <div className="valuation">
        <span>Geschatte verkoopprijs</span>
        <strong>{euro(buyer.homeValue)}</strong>
        <small>Bandbreedte {euro(buyer.homeValue-19000)} – {euro(buyer.homeValue+22000)}</small>
      </div>
      <Metric label="Hypotheekrestant" value={euro(buyer.mortgageLeft)}/>
      <Metric label="Vrije overwaarde" value={euro(equity())}/>
      <Metric label="Verwacht inzetbaar" value={euro(usableEquity())}/>
      <Metric label="Scenario verkoop eerst" value={short(buyingPower()+45000)}/>
    </div>
  </section>
}

function Matches({homeId, setHomeId, selectedHome}){
  return <section>
    <Header kicker="Woning Match" title="Funda toont huizen. ATLAS toont welke huizen slim zijn." text="Elke woning krijgt een Match, Koopkans, financieringskans en context."/>
    <div className="matchGrid">
      <div className="cards">
        {homes.map(h => <button key={h.id} className={homeId === h.id ? 'matchCard active' : 'matchCard'} onClick={() => setHomeId(h.id)}>
          <img src={h.img}/>
          <div>
            <Badge value={h.match}>{h.match}% match</Badge>
            <h3>{h.title}</h3>
            <p>{h.city} · {euro(h.price)}</p>
          </div>
        </button>)}
      </div>
      <PropertyDetail home={selectedHome}/>
    </div>
  </section>
}

function PropertyDetail({home}){
  return <div className="propertyDetail">
    <img src={home.img}/>
    <div className="propertyBody">
      <Badge value={home.match}>{home.match}% ATLAS Match</Badge>
      <h2>{home.title}</h2>
      <p><MapPin/> {home.city} · {home.rooms} kamers · energielabel {home.label}</p>
      <div className="meters">
        <Metric label="Koopkans" value={`${home.confidence}%`}/>
        <Metric label="Financieringskans" value={`${home.finance}%`}/>
        <Metric label="Acceptatiekans bod" value={`${home.acceptance}%`}/>
        <Metric label="Maandlast" value={euro(home.monthly)}/>
      </div>
      <div className="why">
        <h3>Waarom past deze woning?</h3>
        <p>✓ Overwaarde voldoende · ✓ maandlast gezond · ✓ reistijd {home.commute} · ✓ school {home.school} · ✓ waardegroei {home.growth}</p>
      </div>
    </div>
  </div>
}

function Coach({selectedHome}){
  return <section>
    <Header kicker="ATLAS Koopcoach" title="Geen chatbot. Een coach die vooruit denkt." text="ATLAS vertaalt je profiel naar concrete keuzes."/>
    <div className="coachGrid">
      <CoachCard q="Wat moet ik nu doen?" a="Bevestig eerst de verkoopwaarde van je huidige woning. Dat verhoogt je koopklaarheid met ongeveer 9 punten."/>
      <CoachCard q="Kan ik deze woning betalen?" a={`${selectedHome.title} is financieel mogelijk onder voorwaarden. Je overwaarde maakt het verschil, maar timing verkoop blijft belangrijk.`}/>
      <CoachCard q="Is dit slim?" a="Baarn is slimmer dan Laren binnen jouw profiel: lagere maandlast, hogere financieringskans en minder overbruggingsdruk."/>
    </div>
  </section>
}

function CoachCard({q,a}){return <article className="coachCard"><Bot/><h3>{q}</h3><p>{a}</p></article>}

function Share({selectedHome}){
  return <section>
    <Header kicker="Deel mijn ATLAS" title="Een live paspoort voor de makelaar." text="Geen BSN. Geen loonstroken. Wel vertrouwen."/>
    <div className="shareGrid">
      <div className="livePassport">
        <LockKeyhole/>
        <h2>ATLAS Passport</h2>
        <p>{buyer.fullName}</p>
        <strong>91</strong>
        <Badge value={91}>Sterke koper</Badge>
      </div>
      <div className="shareFacts">
        <Fact icon={<ShieldCheck/>} label="Identiteit" value="Geverifieerd"/>
        <Fact icon={<FileText/>} label="Documenten" value="82% compleet"/>
        <Fact icon={<HousePlus/>} label="Overwaarde" value={euro(equity())}/>
        <Fact icon={<Home/>} label="Woning" value={selectedHome.title}/>
        <Fact icon={<Send/>} label="Advies" value="Plan bezichtiging"/>
      </div>
    </div>
  </section>
}

function Metric({label, value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function Fact({icon,label,value}){return <div className="fact">{icon}<span>{label}</span><b>{value}</b></div>}
function Header({kicker,title,text}){return <div className="header"><span>{kicker}</span><h2>{title}</h2><p>{text}</p></div>}

createRoot(document.getElementById('root')).render(<App/>);
