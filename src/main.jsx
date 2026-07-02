
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home, UserRound, Building2, WalletCards, Bot, CheckCircle2, AlertTriangle,
  ArrowRight, FileText, MapPin, TrendingUp, ShieldCheck, HousePlus, Send,
  SlidersHorizontal, Database, LockKeyhole, Radar
} from 'lucide-react';
import './styles.css';

const profiles = [
  {
    id:'erik', name:'Erik van Slooten', short:'EV', type:'Doorstromer',
    income:72800, partnerIncome:57600, cash:85000, loans:25000, leaseMonthly:550,
    docs:82, advisor:65, funds:82, response:78,
    currentHomeValue:535000, remainingMortgage:355000, sellingCosts:11000,
    saleStatus:'Nog niet verkocht', bridgeRisk:72
  },
  {
    id:'starter', name:'Sanne de Vries', short:'SV', type:'Starter',
    income:52000, partnerIncome:0, cash:18000, loans:0, leaseMonthly:0,
    docs:58, advisor:20, funds:45, response:62,
    currentHomeValue:0, remainingMortgage:0, sellingCosts:0,
    saleStatus:'Geen woning', bridgeRisk:0
  },
  {
    id:'lotte', name:'Lotte Vermeer', short:'LV', type:'Doorstromer',
    income:115000, partnerIncome:82000, cash:180000, loans:0, leaseMonthly:0,
    docs:94, advisor:88, funds:96, response:91,
    currentHomeValue:725000, remainingMortgage:390000, sellingCosts:14500,
    saleStatus:'Verkoop gestart', bridgeRisk:38
  }
];

const homes = [
  {id:'baarn', title:'Nieuwbouw Baarn', city:'Baarn', price:515000, rooms:5, energy:'A++', agent:'Buitenplaats Makelaars', img:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80'},
  {id:'eemnes', title:'Gezinswoning Eemnes', city:'Eemnes', price:675000, rooms:5, energy:'A', agent:'Eemnes & Co', img:'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=80'},
  {id:'bussum', title:'Hoekwoning Bussum', city:'Bussum', price:725000, rooms:6, energy:'B', agent:'Gooi Wonen Makelaars', img:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'},
  {id:'laren', title:'Vrijstaand Laren', city:'Laren', price:925000, rooms:7, energy:'A', agent:'Laren Luxury Living', img:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'}
];

function euro(n){ return n <= 0 ? 'Review' : '€ ' + Math.round(n).toLocaleString('nl-NL'); }
function short(n){ return n <= 0 ? 'Review' : '€ ' + Math.round(n / 1000) + 'k'; }
function clamp(n){ return Math.max(0, Math.min(100, n)); }
function equity(p){ return Math.max(0, p.currentHomeValue - p.remainingMortgage - p.sellingCosts); }

function calc(p){
  const income = p.income + p.partnerIncome;
  const overwaarde = equity(p);
  const usableEquity = p.type === 'Doorstromer' ? overwaarde * 0.72 : 0;
  const budget = Math.max(0,
    income * 4.45 +
    Math.min(p.cash, 250000) * 0.82 +
    usableEquity -
    p.loans * 1.15 -
    p.leaseMonthly * 180 -
    (p.docs < 70 ? 25000 : 0) -
    (p.type === 'Doorstromer' && p.saleStatus === 'Nog niet verkocht' ? 35000 : 0)
  );
  let financial = 52 +
    (income > 140000 ? 22 : income > 90000 ? 16 : income > 55000 ? 8 : -8) +
    (p.cash > 100000 ? 12 : p.cash > 50000 ? 8 : p.cash > 15000 ? 4 : -5) +
    (overwaarde > 150000 ? 13 : overwaarde > 50000 ? 6 : 0) -
    (p.leaseMonthly > 0 ? 8 : 0) -
    (p.loans > 10000 ? 6 : 0);
  financial = clamp(Math.round(financial));
  const confidence = Math.round(p.docs*.34 + p.funds*.25 + p.advisor*.22 + p.response*.10 + (p.type === 'Doorstromer' ? (100-p.bridgeRisk)*.09 : 9));
  const atlas = Math.round(financial*.40 + p.docs*.18 + p.funds*.16 + p.advisor*.12 + confidence*.14);
  const level = atlas >= 82 ? 'green' : atlas >= 62 ? 'yellow' : 'red';
  return {income, budget, overwaarde, usableEquity, financial, confidence, atlas, level, status: level === 'green' ? 'Koopklaar' : level === 'yellow' ? 'Bijna koopklaar' : 'Review nodig'};
}

function match(profile, home){
  const c = calc(profile);
  const gap = Math.max(0, home.price - c.budget);
  let score = c.budget <= 0 ? 8 : Math.round(100 - Math.max(0, gap/home.price)*130);
  if(gap <= 0) score = Math.min(98, 88 + Math.round(Math.abs(home.price-c.budget)/home.price*10));
  score = clamp(score);
  const buyChance = clamp(Math.round(score*.48 + c.atlas*.34 + c.confidence*.18 - (profile.type === 'Doorstromer' ? profile.bridgeRisk*.06 : 0)));
  const level = score >= 82 ? 'green' : score >= 62 ? 'yellow' : 'red';
  return {score, buyChance, gap, level, label: level === 'green' ? 'Past bij profiel' : level === 'yellow' ? 'Onder voorwaarden' : 'Niet realistisch'};
}

function Badge({level, children}){ return <span className={'badge ' + level}>{children}</span> }
function Meter({value, level}){ return <div className="meter"><span className={level} style={{width: `${clamp(value)}%`}} /></div> }

function App(){
  const [page, setPage] = useState('dashboard');
  const [profileId, setProfileId] = useState('erik');
  const [homeId, setHomeId] = useState('eemnes');
  const [lead, setLead] = useState(null);
  const profile = profiles.find(p => p.id === profileId);
  const home = homes.find(h => h.id === homeId);
  const result = useMemo(() => calc(profile), [profile]);
  const homeMatch = useMemo(() => match(profile, home), [profile, home]);

  function shareLead(){
    setLead({profile, home, result, homeMatch});
    setPage('share');
  }

  return <div className="app">
    <Sidebar page={page} setPage={setPage}/>
    <main>
      <Topbar profiles={profiles} profileId={profileId} setProfileId={setProfileId}/>
      {page === 'dashboard' && <Dashboard setPage={setPage} profile={profile} result={result} home={home} homeMatch={homeMatch}/>}
      {page === 'atlas' && <Atlas profile={profile} result={result}/>}
      {page === 'homes' && <Homes profile={profile} result={result} homes={homes} homeId={homeId} setHomeId={setHomeId} shareLead={shareLead}/>}
      {page === 'share' && <Share lead={lead} setPage={setPage}/>}
      {page === 'copilot' && <Copilot profile={profile} result={result} home={home} homeMatch={homeMatch}/>}
    </main>
  </div>
}

function Sidebar({page,setPage}){
  const items = [
    ['dashboard', Home, 'Dashboard'],
    ['atlas', UserRound, 'Mijn ATLAS'],
    ['homes', Building2, 'Woningen'],
    ['share', WalletCards, 'Delen'],
    ['copilot', Bot, 'Copilot']
  ];
  return <aside>
    <div className="brand">
      <div className="mark">A</div>
      <div><b>ATLAS</b><span>NEXT 1.0.1</span></div>
    </div>
    <nav>
      {items.map(([id, Icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}><Icon size={19}/>{label}</button>)}
    </nav>
    <div className="quick">
      <b>Vandaag</b>
      <p>Nog 2 acties om je biedklaarheid te verhogen.</p>
    </div>
  </aside>
}

function Topbar({profiles, profileId, setProfileId}){
  return <div className="topbar">
    {profiles.map(p => {
      const c = calc(p);
      return <button key={p.id} className={profileId === p.id ? 'profile active' : 'profile'} onClick={() => setProfileId(p.id)}>
        <span className="avatar">{p.short}</span>
        <span><b>{p.name}</b><small>{p.type}</small></span>
        <Badge level={c.level}>{c.atlas}</Badge>
      </button>
    })}
  </div>
}

function Dashboard({setPage, profile, result, home, homeMatch}){
  return <section className="dashboard">
    <div className="welcome">
      <div>
        <Badge level={result.level}>{result.status}</Badge>
        <h1>Welkom {profile.name.split(' ')[0]}.</h1>
        <p>Je ATLAS-profiel toont dat je vandaag koopklaar bent tot ongeveer <b>{short(result.budget)}</b>. De beste volgende stap staat hieronder.</p>
      </div>
      <div className="score-card">
        <span>ATLAS Score</span>
        <strong>{result.atlas}</strong>
        <Meter value={result.atlas} level={result.level}/>
        <small>Confidence {result.confidence}%</small>
      </div>
    </div>

    <div className="hero-grid">
      <article className="property-large">
        <img src={home.img} />
        <div>
          <Badge level={homeMatch.level}>{homeMatch.score}% match</Badge>
          <h2>{home.title}</h2>
          <p><MapPin size={15}/> {home.city} · {euro(home.price)} · {home.rooms} kamers · label {home.energy}</p>
          <div className="actions">
            <button onClick={() => setPage('homes')}>Bekijk woning</button>
            <button className="secondary" onClick={() => setPage('share')}>Maak paspoort</button>
          </div>
        </div>
      </article>

      <div className="today-stack">
        <Mini icon={<TrendingUp/>} title={short(result.overwaarde)} text="indicatieve overwaarde"/>
        <Mini icon={<FileText/>} title="1 document" text="vraagt aandacht"/>
        <Mini icon={<ShieldCheck/>} title={`${homeMatch.buyChance}%`} text="koopkans geselecteerde woning"/>
      </div>
    </div>

    <div className="insight">
      <Bot/>
      <div>
        <b>ATLAS Copilot</b>
        <p>Je koopruimte wordt vooral beïnvloed door je overwaarde, je private lease en de verkoopstatus van je huidige woning.</p>
      </div>
      <button onClick={() => setPage('copilot')}>Open</button>
    </div>
  </section>
}

function Mini({icon,title,text}){
  return <div className="mini">{icon}<b>{title}</b><span>{text}</span></div>
}

function Atlas({profile, result}){
  const rows = [
    ['Financial Score', result.financial, result.level, WalletCards],
    ['Document Vault', profile.docs, profile.docs > 80 ? 'green' : 'yellow', FileText],
    ['Overwaarde', result.overwaarde > 150000 ? 92 : 60, result.overwaarde > 150000 ? 'green' : 'yellow', HousePlus],
    ['Confidence', result.confidence, result.confidence > 80 ? 'green' : 'yellow', ShieldCheck],
    ['Data Engine', 76, 'yellow', Database]
  ];
  return <section>
    <Header kicker="Mijn ATLAS" title="Je financiële identiteit in één overzicht." text="Niet alleen hypotheekruimte, maar koopklaarheid: inkomen, vermogen, documenten, overwaarde en zekerheid."/>
    <div className="atlas-layout">
      <div className="passport">
        <span className="avatar big">{profile.short}</span>
        <h2>{profile.name}</h2>
        <p>{profile.type}</p>
        <strong>{result.atlas}</strong>
        <Badge level={result.level}>{result.status}</Badge>
        <Meter value={result.atlas} level={result.level}/>
      </div>
      <div className="panel rows">
        {rows.map(([label, value, level, Icon]) => <div className="row" key={label}>
          <Icon size={20}/>
          <span>{label}</span>
          <b>{value}%</b>
          <Meter value={value} level={level}/>
        </div>)}
      </div>
    </div>
  </section>
}

function Homes({profile, result, homes, homeId, setHomeId, shareLead}){
  const selected = homes.find(h => h.id === homeId);
  const selectedMatch = match(profile, selected);
  return <section>
    <Header kicker="Woningen" title="Zoek niet op prijs. Zoek op haalbaarheid." text="Elke woning krijgt een ATLAS Match, koopkans en concrete vervolgstap."/>
    <div className="homes-layout">
      <div className="home-list">
        {homes.map(h => {
          const m = match(profile, h);
          return <button key={h.id} className={homeId === h.id ? 'home-row active' : 'home-row'} onClick={() => setHomeId(h.id)}>
            <img src={h.img}/>
            <div><b>{h.title}</b><span>{h.city} · {euro(h.price)}</span></div>
            <Badge level={m.level}>{m.score}%</Badge>
          </button>
        })}
      </div>
      <div className="home-detail">
        <img src={selected.img}/>
        <div className="home-detail-body">
          <Badge level={selectedMatch.level}>{selectedMatch.label}</Badge>
          <h2>{selected.title}</h2>
          <p>{selected.city} · {selected.rooms} kamers · energielabel {selected.energy}</p>
          <div className="metrics">
            <Metric label="Prijs" value={euro(selected.price)}/>
            <Metric label="Jouw bandbreedte" value={short(result.budget)}/>
            <Metric label="Koopkans" value={`${selectedMatch.buyChance}%`}/>
          </div>
          <div className="actions">
            <button onClick={shareLead}><Send size={17}/> Deel paspoort</button>
            <button className="secondary">Final check</button>
          </div>
        </div>
      </div>
    </div>
  </section>
}

function Share({lead, setPage}){
  if(!lead) return <section><Header kicker="Delen" title="Nog geen paspoort gedeeld." text="Kies eerst een woning en deel daarna je ATLAS Paspoort."/><button onClick={() => setPage('homes')}>Naar woningen</button></section>
  return <section>
    <Header kicker="Biedklaar Paspoort" title="Klaar om met de makelaar te delen." text="Niet je volledige dossier, wel genoeg om serieus genomen te worden."/>
    <div className="share-card">
      <div className="passport dark">
        <span className="avatar big">{lead.profile.short}</span>
        <h2>{lead.profile.name}</h2>
        <p>{lead.home.title}</p>
        <strong>{lead.result.atlas}</strong>
        <Badge level={lead.result.level}>{lead.result.status}</Badge>
      </div>
      <div className="panel">
        <Metric label="Indicatieve bandbreedte" value={short(lead.result.budget)}/>
        <Metric label="Koopkans" value={`${lead.homeMatch.buyChance}%`}/>
        <Metric label="Confidence" value={`${lead.result.confidence}%`}/>
        <Metric label="Advies makelaar" value={lead.homeMatch.level === 'green' ? 'Plan bezichtiging' : 'Check voorwaarden'}/>
      </div>
    </div>
  </section>
}

function Copilot({profile, result, home, homeMatch}){
  return <section>
    <Header kicker="ATLAS Copilot" title="Je persoonlijke koopcoach." text="Geen algemene chatbot, maar advies op basis van jouw profiel, woning en doorstromerstatus."/>
    <div className="copilot-grid">
      <div className="panel prompts">
        <button>Waarom past deze woning wel/niet?</button>
        <button>Wat moet ik eerst regelen?</button>
        <button>Hoeveel overwaarde kan ik gebruiken?</button>
      </div>
      <div className="panel answer">
        <Bot/>
        <h3>Analyse voor {home.title}</h3>
        <p>Je huidige ATLAS-bandbreedte is {short(result.budget)}. Deze woning heeft een koopkans van {homeMatch.buyChance}%. De grootste aandachtspunten zijn je verkoopstatus, private lease en documentstatus.</p>
        <div className="callout"><AlertTriangle/> Volgende stap: maak je Document Vault compleet en check je overbruggingsscenario.</div>
      </div>
    </div>
  </section>
}

function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function Header({kicker,title,text}){return <div className="header"><span>{kicker}</span><h2>{title}</h2><p>{text}</p></div>}

createRoot(document.getElementById('root')).render(<App/>);
